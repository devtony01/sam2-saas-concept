import { NextPage } from 'next';
import { Box, Flex, Grid, Group, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Canvas } from './components/Canvas';

const Home: NextPage = () => {
  const laptop = useMediaQuery('(max-width: 62em)');

  return (
    <>
      <Box pos="absolute" w="100%" h="100%">
        <Box
          pos="absolute"
          p="0rem"
          inset="1rem"
          style={{ display: laptop ? 'flex' : 'block', flexDirection: 'column' }}
        >
          <Grid gutter="0rem" justify="space-between" align="flex-start">
            <Grid.Col span={{ base: 0, md: 3 }} hidden={laptop}>
              Sidebar
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>Toolbar</Grid.Col>
            <Grid.Col span={{ base: 0, md: 3 }} hidden={laptop}>
              Sidebar
            </Grid.Col>
          </Grid>
          <Stack pos="absolute" top="4rem" right="-1rem" style={{ display: laptop ? 'flex' : 'none' }}>
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
          style={{ boxSizing: 'border-box', display: laptop ? 'none' : 'flex' }}
        >
          Footer
        </Group>

        <Flex mb="xs" mx="xs" pos="absolute" inset={0} align="flex-end" style={{ display: laptop ? 'flex' : 'none' }}>
          Mobile Footer
        </Flex>
      </Box>
      <Canvas />
    </>
  );
};

export default Home;
