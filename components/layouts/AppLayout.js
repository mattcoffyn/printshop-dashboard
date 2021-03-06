import { Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { Header } from '../Header';
import { SideNav } from '../SideNav';
import { useUser } from '../../context/user';
import SignInPageComponent from '../SignInPageComponent';

export default function AppLayout({ children }) {
  const background = useColorModeValue('#F7FAFC', '#171923');
  // const { user, previousData } = useUser();
  const { user } = useUser();
  const isLoggedIn = !!user;

  return (
    <>
      <Grid h="100vh" mw="100vw" templateColumns="3rem auto">
        <GridItem column="1/2">
          <SideNav />
        </GridItem>
        <GridItem
          as={Flex}
          flexDirection="column"
          column="2/3"
          overflow="hidden"
        >
          <Header />
          <Grid
            column="2/3"
            templateColumns="repeat(18, 1fr)"
            alignItems="start"
            gap={2}
            overflowY="scroll"
            sx={{
              scrollbarWidth: 'thin',
              scrollbarColor: `#2D3748 ${background}`,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: `${background}`,
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#2D3748',
                borderRadius: '24px',
                border: `1px solid ${background}`,
              },
            }}
          >
            {isLoggedIn ? children : <SignInPageComponent />}
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
