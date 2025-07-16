import { z } from 'zod';

import { imageService } from 'resources/image';

import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter, NestedKeys, S3File } from 'types';

const schema = paginationSchema.extend({
  filter: z
    .object({
      createdOn: z
        .object({
          startDate: z.coerce.date().optional(),
          endDate: z.coerce.date().optional(),
        })
        .optional(),
    })
    .optional(),
  sort: z
    .object({
      size: z.enum(['asc', 'desc']).optional(),
      mimeType: z.enum(['asc', 'desc']).optional(),
      createdOn: z.enum(['asc', 'desc']).default('asc'),
    })
    .default({}),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { user } = ctx.state;

  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;

  const filterOptions = [];

  if (searchValue) {
    const searchPattern = stringUtil.escapeRegExpString(searchValue);

    const searchFields: NestedKeys<S3File>[] = ['mimeType'];

    filterOptions.push({
      $or: searchFields.map((field) => ({ [field]: { $regex: searchPattern } })),
    });
  }

  if (filter) {
    const { createdOn, ...otherFilters } = filter;

    if (createdOn) {
      const { startDate, endDate } = createdOn;

      filterOptions.push({
        createdOn: {
          ...(startDate && { $gte: startDate }),
          ...(endDate && { $lt: endDate }),
        },
      });
    }

    Object.entries(otherFilters).forEach(([key, value]) => {
      filterOptions.push({ [key]: value });
    });
  }

  const options = {
    page,
    perPage,
    sort,
    filter: filterOptions.length ? { $and: filterOptions } : undefined,
  };

  const images = await imageService.find({ userId: user._id }, options);
  ctx.body = images;
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
