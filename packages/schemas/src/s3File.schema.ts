import z from 'zod';

import { PHOTO } from 'app-constants';

import { fileSchema } from './common.schema';
import dbSchema from './db.schema';

// S3 File Reference Schema
export const s3FileSchema = dbSchema.extend({
  userId: z.string(),
  key: z.string(), // S3 object key
  bucket: z.string(), // S3 bucket name
  region: z.string(), // AWS region
  url: z.string().url(), // Public URL or presigned URL
  mimeType: z.string(), // File type
  size: z.number(), // File size in bytes
});

export const uploadImageSchema = z.object({
  image: z.union([fileSchema(PHOTO.MAX_FILE_SIZE, PHOTO.ACCEPTED_FILE_TYPES), s3FileSchema]).nullable(),
});
