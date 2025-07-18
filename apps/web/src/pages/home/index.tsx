import { useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Grid, Group, Stack } from '@mantine/core';
import { useMediaQuery, useResizeObserver } from '@mantine/hooks';
import { useKonva } from 'stores';
import { useStore } from 'zustand';

import { Canvas, Toolbar, ZoomControls } from './components';

const Home: NextPage = () => {
  const laptop = useMediaQuery('(max-width: 62em)');
  const [ref, rect] = useResizeObserver();

  const { setDimension } = useStore(useKonva);

  useEffect(() => {
    if (!rect) return;

    setDimension({ width: rect.width, height: rect.height });
  }, [rect, setDimension]);

  return (
    <Box ref={ref} pos="absolute" w="100%" h="100%">
      <Canvas />

      <Box
        pos="absolute"
        p="0rem"
        inset="1rem"
        style={{
          display: laptop ? 'flex' : 'block',
          flexDirection: 'column',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Grid gutter="0rem" justify="space-between" align="flex-start" style={{ pointerEvents: 'auto' }}>
          <Grid.Col span={{ base: 0, md: 3 }} hidden={laptop}>
            Sidebar
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Toolbar />
          </Grid.Col>
          <Grid.Col span={{ base: 0, md: 3 }} hidden={laptop}>
            Sidebar
          </Grid.Col>
        </Grid>
        <Stack
          pos="absolute"
          top="4rem"
          right="-1rem"
          style={{
            display: laptop ? 'flex' : 'none',
            pointerEvents: 'auto',
          }}
        >
          <Box>Mobile Toolbar</Box>
          <Box>Mobile Sidebar</Box>
        </Stack>
      </Box>

      <Group
        pos="absolute"
        bottom="1rem"
        justify="space-between"
        align="flex-start"
        w="100%"
        px="1rem"
        style={{
          boxSizing: 'border-box',
          display: laptop ? 'none' : 'flex',
          zIndex: 2,
        }}
      >
        <ZoomControls isMobile={false} />
      </Group>

      <Group
        mb="xs"
        mx="xs"
        pos="absolute"
        inset={0}
        align="flex-end"
        style={{
          display: laptop ? 'flex' : 'none',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <ZoomControls isMobile />
      </Group>
    </Box>
  );
};

export default Home;
