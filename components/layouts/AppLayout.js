import { useEffect } from 'react';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { Header } from '../Header';
import { SideNav } from '../SideNav';
import { useUser } from '../../lib/useUser';
import SignInPageComponent from '../SignInPageComponent';

export default function AppLayout({ children }) {
  // const [theme, themeToggler] = useDarkMode();
  // const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const { user, previousData } = useUser();
  const isLoggedIn = !!user;
  const toast = useToast();

  useEffect(() => {
    if (!user && !!previousData) {
      toast({
        title: 'Logged Out',
        description: `See you soon 👋`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
    if (!!user && !!previousData) {
      toast({
        title: 'Logged In',
        description: `Welcome ${user.name} 🥳`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [user, previousData, toast]);

  return (
    <Grid
      h="100vh"
      mw="100vw"
      templateColumns="3rem auto"
      templateRows="3rem auto"
      rowGap={1}
    >
      <GridItem colSpan={1}>
        <SideNav />
      </GridItem>
      <GridItem>
        <Header />
      </GridItem>
      <Grid
        column="2/3"
        templateColumns="repeat(12, 1fr)"
        templateRows="6rem auto"
        gap={2}
        px={2}
        overflowY="auto"
      >
        {isLoggedIn ? children : <SignInPageComponent />}
      </Grid>
    </Grid>
  );
}
