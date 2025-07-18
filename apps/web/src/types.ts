import { S3File } from 'app-types';
import Konva from 'konva';

export * from 'app-types';
export type { ApiError } from 'services/api.service';

export type QueryParam = string | string[] | undefined;

export type ListResult<T> = {
  results: T[];
  pagesCount: number;
  count: number;
};

export type SortOrder = 'asc' | 'desc';

export type SortParams<F> = {
  [P in keyof F]?: SortOrder;
};

export type ListParams<T, F> = {
  page?: number;
  perPage?: number;
  searchValue?: string;
  filter?: T;
  sort?: SortParams<F>;
};

export type ImageState = {
  image: S3File | null;
};

export type ImageActions = {
  setImage: (image: S3File | null) => void;
};

export type ImageStore = ImageState & ImageActions;

export type Dimension = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type KonvaState = {
  stage: Konva.Stage | null;
  dimension: Dimension;
  zoom: number;
  scrollX: number;
  scrollY: number;
  isDragging: boolean;
  viewportOffset: Point;
};

export type KonvaActions = {
  setStage: (stage: Konva.Stage | null) => void;
  setDimension: (dimension: Dimension) => void;
  setZoom: (zoom: number) => void;
  setScroll: (scrollX: number, scrollY: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setViewportOffset: (viewportOffset: Point) => void;

  // Utility functions
  getStagePointerPosition: () => Point;
  screenToScene: (screenX: number, screenY: number) => Point;
  sceneToScreen: (sceneX: number, sceneY: number) => Point;
  zoomToPoint: (point: Point, newZoom: number) => void;
};

export type KonvaStore = KonvaState & KonvaActions;
