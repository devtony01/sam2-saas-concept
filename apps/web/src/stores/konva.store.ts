import { create } from 'zustand';

import { KonvaStore } from 'types';

export const useKonva = create<KonvaStore>((set, get) => ({
  stage: null,
  setStage: (stage) => set({ stage }),
  dimension: {
    width: 0,
    height: 0,
  },
  setDimension: (dimension) => set({ dimension }),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
  scrollX: 0,
  scrollY: 0,
  setScroll: (scrollX, scrollY) => set({ scrollX, scrollY }),
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
  viewportOffset: { x: 0, y: 0 },
  setViewportOffset: (viewportOffset) => set({ viewportOffset }),

  // Utility functions
  getStagePointerPosition: () => {
    const { stage } = get();
    if (!stage) return { x: 0, y: 0 };
    const pos = stage.getPointerPosition();
    return pos || { x: 0, y: 0 };
  },

  screenToScene: (screenX: number, screenY: number) => {
    const { zoom, scrollX, scrollY, viewportOffset } = get();
    return {
      x: (screenX - viewportOffset.x) / zoom + scrollX,
      y: (screenY - viewportOffset.y) / zoom + scrollY,
    };
  },

  sceneToScreen: (sceneX: number, sceneY: number) => {
    const { zoom, scrollX, scrollY, viewportOffset } = get();
    return {
      x: (sceneX - scrollX) * zoom + viewportOffset.x,
      y: (sceneY - scrollY) * zoom + viewportOffset.y,
    };
  },

  zoomToPoint: (point: { x: number; y: number }, newZoom: number) => {
    const store = get();
    const scenePoint = store.screenToScene(point.x, point.y);

    const newScrollX = scenePoint.x - (point.x - store.viewportOffset.x) / newZoom;
    const newScrollY = scenePoint.y - (point.y - store.viewportOffset.y) / newZoom;

    set({
      zoom: Math.max(0.1, Math.min(5, newZoom)),
      scrollX: newScrollX,
      scrollY: newScrollY,
    });
  },
}));
