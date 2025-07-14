import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import { accountApi } from 'resources/account';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell bg="gray.0" h="100%">
      <AppShell.Main display="flex" pos="relative" h="100%" w="100%" inset={0}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
