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
  const { data: userData, loading } = useQuery(CURRENT_USER_QUERY);
  const [user, setUser] = useState(userData?.authenticatedItem);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (userData) {
      setUser(userData.authenticatedItem);
      setIsLoading(false);
    }
  }, [userData, loading]);

  const exposed = { user, isLoading };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
