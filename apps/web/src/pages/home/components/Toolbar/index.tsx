import { useState } from 'react';
import { ActionIcon, Group, Paper, Popover, Stack, Tooltip } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { FormProvider, useForm } from 'react-hook-form';

import { Carousel, Upload } from './components';

const Toolbar = () => {
  const [opened, setOpened] = useState(false);

  const getFormDefaultValues = () => ({
    image: undefined,
  });

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: getFormDefaultValues(),
  });

  return (
    <Paper shadow="sm" radius="md" withBorder>
      <Group align="center" justify="center">
        <Popover
          opened={opened}
          onChange={setOpened}
          radius="md"
          width={260}
          position="right-start"
          withArrow
          trapFocus
          withinPortal
        >
          <Popover.Target>
            <Tooltip label="Prompt Tool" position="top">
              <ActionIcon variant="subtle" color="blue" size="lg" onClick={() => setOpened((o) => !o)}>
                <IconPencil size="18" />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown pos="absolute" left="1rem" top="5rem" style={{ zIndex: 4 }}>
            <FormProvider {...methods}>
              <Stack gap="md" h="100%" w="100%" component="form">
                <Upload />
                <Carousel />
              </Stack>
            </FormProvider>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Paper>
  );
};

export default Toolbar;
