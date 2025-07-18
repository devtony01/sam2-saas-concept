import { useEffect } from 'react';
import NextImage from 'next/image';
import { Box, Button, Center, Group, Image, Stack, Text, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import cx from 'clsx';
import { serialize } from 'object-to-formdata';
import { Controller, useFormContext } from 'react-hook-form';
import { useImage } from 'stores';
import { useStore } from 'zustand';

import { imageApi } from 'resources/image';

import { handleApiError, handleDropzoneError } from 'utils';

import { USER_AVATAR } from 'app-constants';
import { FrontendFile, S3File } from 'types';

import classes from './index.module.css';

export type UploadImageParamsFrontend = {
  image?: FrontendFile | '';
};

const Upload = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<UploadImageParamsFrontend>();

  const { image, setImage } = useStore(useImage);

  const { mutate: uploadPhoto, isPending: isUploading } = imageApi.useCreate<FormData>();

  const imageValue = watch('image');
  const imageError = errors.image?.message;

  useEffect(() => {
    if (typeof imageValue === 'string') {
      // Only clear the image if it's explicitly set to empty string
      if (imageValue === '') {
        setImage(null);
      }
      return;
    }

    if (!imageValue) return;

    const data = {
      image: imageValue,
    };

    uploadPhoto(serialize(data), {
      // Send FormData with File
      onSuccess: (response: S3File) => {
        setImage(response);
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  }, [imageValue, setImage, uploadPhoto]);

  return (
    <Stack p="lg">
      <Group align="flex-start" gap={12} justify="space-between">
        <Stack align="center" gap={12}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Dropzone
                accept={USER_AVATAR.ACCEPTED_FILE_TYPES}
                maxSize={USER_AVATAR.MAX_FILE_SIZE * 4} // Allow larger files for processing
                onDrop={([imageFile]) => field.onChange(imageFile)}
                onReject={handleDropzoneError}
                multiple={false}
                loading={isUploading}
                classNames={classes}
              >
                <Center
                  className={cx(classes.browseButton, {
                    [classes.imageExists]: !!image,
                  })}
                >
                  {image ? (
                    <Box pos="relative" w="100%" h="100%">
                      <Image
                        component={NextImage}
                        src={imageValue ? URL.createObjectURL(imageValue) : image?.url || ''}
                        alt=""
                        pos="absolute"
                        sizes="200px"
                        priority
                        fill
                        style={{ objectFit: 'cover' }}
                      />

                      <Center w="100%" h="100%" pos="absolute" className={classes.editOverlay}>
                        <IconPencil size={32} stroke={1} className={classes.pencilIcon} />
                      </Center>
                    </Box>
                  ) : (
                    <IconPlus size={32} stroke={1} className={classes.addIcon} />
                  )}
                </Center>
              </Dropzone>
            )}
          />

          {image && (
            <Button
              variant="subtle"
              size="sm"
              color="red"
              leftSection={<IconX size={16} />}
              onClick={() => setValue('image', '', { shouldDirty: true })}
            >
              Remove
            </Button>
          )}
        </Stack>
        <Stack gap={4}>
          <Title size="m" order={4} />

          <Stack gap={0} c="gray.6">
            <Text size="sm" />
            <Text size="sm">JPG, JPEG or PNG</Text>
            <Text size="sm">Max size = 20 MB</Text>
          </Stack>
        </Stack>
      </Group>

      {imageError && <Text c="red.6">{imageError}</Text>}
    </Stack>
  );
};

export default Upload;
