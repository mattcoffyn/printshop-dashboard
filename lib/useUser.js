import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export function useUser() {
  const { data, previousData } = useQuery(CURRENT_USER_QUERY);
  return { user: data?.authenticatedItem, previousData };
}
