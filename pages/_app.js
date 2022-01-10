import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Layout from '../components/Layout';
import '../components/styles/open-styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
