import { DateValue } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, ListParams, ListResult, S3File, UploadImageParamsFrontend } from 'types';

export type ImageListFilterParams = {
  createdOn?: {
    startDate: DateValue;
    endDate: DateValue;
  };
  mimeType?: string;
};

export type ImageListSortFields = 'createdOn' | 'mimeType' | 'size';

export type ImageListParams = ListParams<ImageListFilterParams, Pick<S3File, ImageListSortFields>>;
export type ImageListResult = ListResult<S3File>;

// create
const useCreate = <T = UploadImageParamsFrontend>() =>
  useMutation<S3File, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/images', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['s3Files'] });
    },
  });

// list
const useList = <T extends ImageListParams>(params?: T) =>
  useQuery<ImageListResult>({
    queryKey: ['s3Files', params],
    queryFn: () => apiService.get('/images', params),
  });

// remove
const useRemove = () =>
  useMutation<void, ApiError, string>({
    mutationFn: (imageId: string) => apiService.delete(`/images/${imageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['s3Files'] });
    },
  });

export { useCreate, useList, useRemove };
