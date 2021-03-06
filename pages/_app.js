import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import UserProvider from '../context/user';
import withData from '../lib/withData';
import AppLayout from '../components/layouts/AppLayout';
import theme from '../styles/theme';
import '@fontsource/ibm-plex-sans';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default withData(MyApp);
