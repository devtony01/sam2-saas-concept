import { ActionIcon, Center, Image, Loader, Paper, Text } from '@mantine/core';
import { Carousel as MantineCarousel } from '@mantine/carousel';
import { IconTrash } from '@tabler/icons-react';

import { imageApi } from 'resources/image';

import classes from './index.module.css';

const Carousel = () => {
  const { data: images, isLoading: isImagesLoading, isError } = imageApi.useList();
  const { mutate: removePhoto, isPending: isRemoving } = imageApi.useRemove();

  if (isImagesLoading) {
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );
  }

  if (isError || (!images?.count && images?.count === 0)) {
    return (
      <Center h={200}>
        <Text c="dimmed">No images found</Text>
      </Center>
    );
  }

  return (
    <MantineCarousel withIndicators h={200} w={200} slideSize="100%">
      {images?.results.map((img) => (
        <MantineCarousel.Slide key={img._id} className={classes.slide}>
          <Paper p="xs" shadow="sm" radius="md" withBorder pos="relative">
            <Image src={img.url} className={classes.image} fit="fill" loading="lazy" />
            <ActionIcon
              color="red"
              variant="filled"
              size="sm"
              pos="absolute"
              top={5}
              right={5}
              onClick={() => removePhoto(img._id)}
              loading={isRemoving}
              title="Delete Image"
            >
              <IconTrash size={14} />
            </ActionIcon>
          </Paper>
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  );
};

export default Carousel;
