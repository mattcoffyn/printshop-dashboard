import { gql } from '@apollo/client';

export const GET_ALL_PROCESS_PRODUCTS = gql`
  query GET_ALL_PROCESS_PRODUCTS {
    processProducts {
      id
      notes
      noDevelop
      noScans
      isSingle
      isSlide
      price
      createdOn
      updatedOn
      singleQuantity
      status
      filmType {
        id
        name
        description
      }
      filmColour {
        id
        name
        description
      }
      scanResolution {
        id
        name
        description
      }
      order {
        id
        charge
        user {
          id
          customerNumber
          firstName
          secondName
          email
        }
      }
    }
  }
`;
