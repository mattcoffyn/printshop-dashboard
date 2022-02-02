import { createContext, useContext, useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

const Context = createContext();

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const [user, setUser] = useState(data?.authenticatedItem);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (data) {
      setUser(data.authenticatedItem);
      setIsLoading(false);
    }
  }, [data, loading]);

  const exposed = { user, isLoading };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
