import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { s3FileSchema } from 'schemas';
import { S3File } from 'types';

const service = db.createService<S3File>(DATABASE_DOCUMENTS.S3_FILES, {
  schemaValidator: (obj: unknown) => s3FileSchema.parseAsync(obj),
});

const updateLastRequest = (_id: string) =>
  service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );

export default Object.assign(service, {
  updateLastRequest,
});
