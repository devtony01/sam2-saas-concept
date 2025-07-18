import { useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Image, Layer, Stage, Transformer } from 'react-konva';
import { useImage as useImageStore, useKonva } from 'stores';
import useImage from 'use-image';
import { useStore } from 'zustand';

const ZOOM_SPEED = 0.1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageProps, setImageProps] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  });

  const {
    dimension,
    setStage,
    zoom,
    scrollX,
    scrollY,
    setScroll,
    isDragging,
    setIsDragging,
    setViewportOffset,
    zoomToPoint,
  } = useStore(useKonva);

  const imageUrl = useStore(useImageStore).image?.url || '';
  const [image] = useImage(imageUrl); // Load image using URL

  // Set stage reference when component mounts
  useEffect(() => {
    if (stageRef.current) {
      setStage(stageRef.current);
      // Set initial viewport offset
      const containerBounds = stageRef.current.container().getBoundingClientRect();
      setViewportOffset({ x: containerBounds.left, y: containerBounds.top });
    }
    return () => setStage(null);
  }, [setStage, setViewportOffset]);

  // Update viewport offset on resize
  useEffect(() => {
    const updateViewportOffset = () => {
      if (stageRef.current) {
        const containerBounds = stageRef.current.container().getBoundingClientRect();
        setViewportOffset({ x: containerBounds.left, y: containerBounds.top });
      }
    };

    window.addEventListener('resize', updateViewportOffset);
    window.addEventListener('scroll', updateViewportOffset);
    return () => {
      window.removeEventListener('resize', updateViewportOffset);
      window.removeEventListener('scroll', updateViewportOffset);
    };
  }, [setViewportOffset]);

  // Handle wheel zoom
  const handleWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = stageRef.current;
      if (!stage) return;

      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const delta = e.evt.deltaY;
      const sign = delta > 0 ? -1 : 1;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + sign * ZOOM_SPEED));

      zoomToPoint(pointer, newZoom);
    },
    [zoom, zoomToPoint],
  );

  // Handle mouse/touch pan start
  const handleMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      // Only handle panning if not clicking on an image or transformer
      if (e.target === stageRef.current || e.target?.getType() === 'Stage') {
        setSelectedImage(null); // Deselect image when clicking on stage
        isDraggingRef.current = true;
        setIsDragging(true);

        const stage = stageRef.current;
        if (!stage) return;

        const pointer = stage.getPointerPosition();
        if (pointer) {
          lastPointerRef.current = pointer;
        }
      }
    },
    [setIsDragging],
  );

  // Handle mouse/touch pan
  const handleMouseMove = useCallback(() => {
    if (!isDraggingRef.current || !lastPointerRef.current) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const deltaX = (pointer.x - lastPointerRef.current.x) / zoom;
    const deltaY = (pointer.y - lastPointerRef.current.y) / zoom;

    setScroll(scrollX - deltaX, scrollY - deltaY);
    lastPointerRef.current = pointer;
  }, [scrollX, scrollY, zoom, setScroll]);

  // Handle mouse/touch pan end
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    lastPointerRef.current = null;
  }, [setIsDragging]);

  // Handle touch events
  const handleTouchStart = useCallback(
    (e: Konva.KonvaEventObject<TouchEvent>) => {
      if (e.target === stageRef.current || e.target?.getType() === 'Stage') {
        isDraggingRef.current = true;
        setIsDragging(true);

        const stage = stageRef.current;
        if (!stage) return;

        const pointer = stage.getPointerPosition();
        if (pointer) {
          lastPointerRef.current = pointer;
        }
      }
    },
    [setIsDragging],
  );

  const handleTouchMove = useCallback(() => {
    if (!isDraggingRef.current || !lastPointerRef.current) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const deltaX = (pointer.x - lastPointerRef.current.x) / zoom;
    const deltaY = (pointer.y - lastPointerRef.current.y) / zoom;

    setScroll(scrollX - deltaX, scrollY - deltaY);
    lastPointerRef.current = pointer;
  }, [scrollX, scrollY, zoom, setScroll]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    lastPointerRef.current = null;
  }, [setIsDragging]);

  // Initialize image position when image loads
  useEffect(() => {
    if (image && dimension.width && dimension.height) {
      const imageWidth = image.width;
      const imageHeight = image.height;

      if (imageWidth && imageHeight) {
        // Calculate scale to fit image in viewport while maintaining aspect ratio
        const scaleX = dimension.width / imageWidth;
        const scaleY = dimension.height / imageHeight;
        const scale = Math.min(scaleX, scaleY, 0.8); // Scale down to 80% of viewport

        // Center the image
        const x = (dimension.width - imageWidth * scale) / 2;
        const y = (dimension.height - imageHeight * scale) / 2;

        setImageProps({
          x: x / zoom + scrollX,
          y: y / zoom + scrollY,
          scaleX: scale,
          scaleY: scale,
          rotation: 0,
        });
      }
    }
  }, [image, dimension.width, dimension.height, zoom, scrollX, scrollY]);

  // Handle transformer selection
  useEffect(() => {
    if (selectedImage && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedImage]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Handle image click
  const handleImageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    setSelectedImage('image');
  }, []);

  // Handle stage click (deselect)
  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === stageRef.current) {
      setSelectedImage(null);
    }
  }, []);

  // Handle image drag
  const handleImageDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    setImageProps((prev) => ({
      ...prev,
      x: e.target.x(),
      y: e.target.y(),
    }));
  }, []);

  // Handle image transform
  const handleImageTransformEnd = useCallback(() => {
    if (imageRef.current) {
      const node = imageRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // Reset scale to 1 and adjust width/height instead
      node.scaleX(1);
      node.scaleY(1);

      setImageProps((prev) => ({
        ...prev,
        x: node.x(),
        y: node.y(),
        scaleX: prev.scaleX * scaleX,
        scaleY: prev.scaleY * scaleY,
        rotation: node.rotation(),
      }));
    }
  }, []);

  return (
    <Stage
      ref={stageRef}
      width={dimension.width}
      height={dimension.height}
      style={{
        backgroundColor: '#f8f9fa',
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
      }}
      scaleX={zoom}
      scaleY={zoom}
      x={-scrollX * zoom}
      y={-scrollY * zoom}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleStageClick}
    >
      <Layer name="image" style={{ zIndex: 1001 }}>
        {image && (
          <>
            <Image
              ref={imageRef}
              image={image}
              {...imageProps}
              draggable
              onClick={handleImageClick}
              onDragEnd={handleImageDragEnd}
              onTransformEnd={handleImageTransformEnd}
            />
            {selectedImage && (
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Limit resize to reasonable bounds
                  if (newBox.width < 50 || newBox.height < 50) {
                    return oldBox;
                  }
                  return newBox;
                }}
                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                rotateEnabled
                borderStroke="#4263eb"
                borderStrokeWidth={2}
                anchorStroke="#4263eb"
                anchorFill="white"
                anchorSize={8}
              />
            )}
          </>
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
