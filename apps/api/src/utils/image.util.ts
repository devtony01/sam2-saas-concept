import { cloudStorageService } from 'services';

import { BackendFile, S3File } from 'types';

export const uploadImage = async (
  _id: string,
  file: BackendFile,
  customFileName?: string,
): Promise<Partial<S3File>> => {
  if (!file) {
    throw new Error('File is required for upload');
  }

  if (!file.size) {
    throw new Error('File size is required');
  }

  if (!file.mimetype) {
    throw new Error('File mimetype is required');
  }

  if (!file.originalFilename) {
    throw new Error('File originalFilename is required');
  }

  const fileName = customFileName || `${_id}-${Date.now()}-${file.originalFilename}`;

  const uploadResult = await cloudStorageService.uploadPublic(`avatars/${fileName}`, file);

  if (!uploadResult) {
    throw new Error("An error occurred while uploading the user's avatar");
  }

  const newImage = {
    key: uploadResult.key!,
    bucket: uploadResult.bucket!,
    region: 'us-east-1',
    url: uploadResult.location!,
    mimeType: file.mimetype!,
    size: file.size!,
  };

  return newImage;
};

export const removeImage = async (imageUrl: string) => {
  if (imageUrl) {
    const fileKey = cloudStorageService.getFileKey(imageUrl);

    await cloudStorageService.deleteObject(fileKey);
  }
};

export const removeImages = async (keys: string[]) => {
  if (!keys.length) return;

  await cloudStorageService.deleteObjects(keys);
};
