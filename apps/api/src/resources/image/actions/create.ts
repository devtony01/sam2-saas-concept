import { imageService } from 'resources/image';

import { validateMiddleware } from 'middlewares';
import { uploadImage } from 'utils/image.util';

import { uploadImageSchema } from 'schemas';
import { AppKoaContext, AppRouter, BackendFile } from 'types';

type ValidatedData = {
  image: BackendFile;
};

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;

  const { image } = ctx.validatedData;

  const s3File = await uploadImage(user._id, image);
  ctx.body = await imageService.insertOne({ userId: user._id, ...s3File });
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(uploadImageSchema), handler);
};
