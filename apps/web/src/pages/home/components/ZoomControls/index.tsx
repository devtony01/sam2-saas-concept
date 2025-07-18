import { useCallback } from 'react';
import { ActionIcon, Box, Group, Paper, Text } from '@mantine/core';
import { IconFocusCentered, IconMaximize, IconMinus, IconPlus } from '@tabler/icons-react';
import { useImage as useImageStore, useKonva } from 'stores';
import useImage from 'use-image';
import { useStore } from 'zustand';

interface ZoomControlsProps {
  isMobile?: boolean;
}

const ZoomControls = ({ isMobile = false }: ZoomControlsProps) => {
  const { zoom, setZoom, setScroll, dimension, zoomToPoint } = useStore(useKonva);

  const imageFile = useStore(useImageStore).image;
  const imageUrl = imageFile?.url || '';
  const [image] = useImage(imageUrl);

  const handleZoomIn = useCallback(() => {
    const centerX = dimension.width / 2;
    const centerY = dimension.height / 2;
    const newZoom = Math.min(5, zoom + 0.2);
    zoomToPoint({ x: centerX, y: centerY }, newZoom);
  }, [zoom, dimension, zoomToPoint]);

  const handleZoomOut = useCallback(() => {
    const centerX = dimension.width / 2;
    const centerY = dimension.height / 2;
    const newZoom = Math.max(0.1, zoom - 0.2);
    zoomToPoint({ x: centerX, y: centerY }, newZoom);
  }, [zoom, dimension, zoomToPoint]);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setScroll(0, 0);
  }, [setZoom, setScroll]);

  const handleFitToScreen = useCallback(() => {
    if (!image) return;

    const imageWidth = image.width;
    const imageHeight = image.height;

    if (!imageWidth || !imageHeight) return;

    // Calculate scale to fit image in viewport
    const scaleX = dimension.width / imageWidth;
    const scaleY = dimension.height / imageHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    // Center the image
    const x = (dimension.width - imageWidth * scale) / 2;
    const y = (dimension.height - imageHeight * scale) / 2;

    setZoom(scale);
    setScroll(-x / scale, -y / scale);
  }, [image, dimension, setZoom, setScroll]);

  const zoomPercentage = Math.round(zoom * 100);

  if (isMobile) {
    return (
      <Paper
        shadow="sm"
        p="xs"
        radius="md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #e9ecef',
          position: 'relative',
          pointerEvents: 'auto',
        }}
      >
        <Group gap="xs" align="center">
          <ActionIcon
            variant="light"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.1}
            style={{ minWidth: '32px' }}
          >
            <IconMinus size={14} />
          </ActionIcon>

          <Text
            size="xs"
            fw={500}
            style={{
              minWidth: '40px',
              textAlign: 'center',
              color: '#495057',
            }}
          >
            {zoomPercentage}%
          </Text>

          <ActionIcon
            variant="light"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 5}
            style={{ minWidth: '32px' }}
          >
            <IconPlus size={14} />
          </ActionIcon>

          <ActionIcon
            variant="light"
            size="sm"
            onClick={handleResetZoom}
            title="Reset zoom (100%)"
            style={{ minWidth: '32px' }}
          >
            <IconFocusCentered size={14} />
          </ActionIcon>

          {image && (
            <ActionIcon
              variant="light"
              size="sm"
              onClick={handleFitToScreen}
              title="Fit to screen"
              style={{ minWidth: '32px' }}
            >
              <IconMaximize size={14} />
            </ActionIcon>
          )}
        </Group>
      </Paper>
    );
  }

  return (
    <Paper
      shadow="sm"
      p="sm"
      radius="md"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #e9ecef',
        position: 'relative',
        pointerEvents: 'auto',
      }}
    >
      <Group gap="sm" align="center">
        <ActionIcon
          variant="light"
          size="md"
          onClick={handleZoomOut}
          disabled={zoom <= 0.1}
          style={{
            transition: 'all 0.2s ease',
          }}
        >
          <IconMinus size={16} />
        </ActionIcon>

        <Box
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            padding: '4px 12px',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            minWidth: '60px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {zoomPercentage}%
        </Box>

        <ActionIcon
          variant="light"
          size="md"
          onClick={handleZoomIn}
          disabled={zoom >= 5}
          style={{
            transition: 'all 0.2s ease',
          }}
        >
          <IconPlus size={16} />
        </ActionIcon>

        <Box
          style={{
            width: '1px',
            height: '24px',
            backgroundColor: '#e9ecef',
            margin: '0 4px',
          }}
        />

        <ActionIcon
          variant="light"
          size="md"
          onClick={handleResetZoom}
          title="Reset zoom (100%)"
          style={{
            transition: 'all 0.2s ease',
          }}
        >
          <IconFocusCentered size={16} />
        </ActionIcon>

        {image && (
          <ActionIcon
            variant="light"
            size="md"
            onClick={handleFitToScreen}
            title="Fit to screen"
            style={{
              transition: 'all 0.2s ease',
            }}
          >
            <IconMaximize size={16} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
};

export default ZoomControls;
