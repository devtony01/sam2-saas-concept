import { imageService } from 'resources/image';

import { AppKoaContext, AppRouter } from 'types';

type ValidatedData = never;

type Request = {
  params: {
    imageId: string;
  };
};

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { imageId } = ctx.request.params;

  await imageService.deleteSoft({ _id: imageId });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/:imageId', handler);
};
