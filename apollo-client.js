import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: `http://localhost:3000/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    'Fe26.2**207f50df33c26a9a371f089a871c37ca59d2a6c44c8e4dcaee22df1af5457525*YBcTRFq-J0qaA87ZZHZQAw*rV6KUu1uGDrM3-hlKllYT6zUj8fkEjGuezUQfB7X9OE*1672848777280*91f89ea48792181bdadbf30fad987d5160946f7c39601cc5276a3e8da415edc2*yQkpTbehmsqbk5u8n3ALWlvKJfA7tw0g8ZLWFxyAR_4';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
});

export default client;
