import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import withData from '../lib/withData';
import AppLayout from '../components/layouts/AppLayout';
import theme from '../styles/theme';

import '@fontsource/jost';
// import '@fontsource/league-spartan';

import '../styles/openprops.css';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </ChakraProvider>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };

export default withData(MyApp);
