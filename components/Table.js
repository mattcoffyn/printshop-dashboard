import React from 'react';
import DataTable from 'react-data-table-component';
import { useTheme } from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Card } from './reusable/Card';

const GET_ALL_PROCESS_PRODUCTS = gql`
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
      }
      user {
        id
        name
        email
        role {
          id
          name
        }
      }
    }
  }
`;

// A super simple expandable component.
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export function DataTableBase(props) {
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_PRODUCTS);
  const theme = useTheme();

  if (loading) return <p>Loading..</p>;

  if (error) return <p>{error.message}</p>;

  const customStyles = {
    table: {},
    header: {
      style: {
        backgroundColor: theme.card,
        color: theme.textPrimary,
      },
    },
    head: {
      style: {
        color: theme.textPrimary,
      },
    },
    headRow: {
      style: {
        backgroundColor: theme.card,
        borderBottomWidth: '2px',
        borderBottomColor: theme.cardBorder,
        borderBottomStyle: 'solid',
      },
    },
    rows: {
      style: {
        backgroundColor: theme.card,
        color: theme.textSecondary,
        '&:not(:last-of-type)': {
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: theme.cardBorder,
        },
      },
      highlightOnHoverStyle: {
        color: theme.textPrimary,
        backgroundColor: theme.body,
        transitionDuration: '0.15s',
        transitionProperty: 'background-color',
        borderBottomColor: theme.cardBorderHover,
        outlineStyle: 'solid',
        outlineWidth: '1px',
        outlineColor: theme.cardBorderHover,
      },
    },
    contextMenu: {
      style: {
        backgroundColor: 'var(--info--darkest)',
        fontSize: '18px',
        fontWeight: 400,
        // color: /,
        paddingLeft: '16px',
        paddingRight: '8px',
        transform: 'translate3d(0, -100%, 0)',
        transitionDuration: '125ms',
        transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        willChange: 'transform',
      },
      activeStyle: {
        transform: 'translate3d(0, 0, 0)',
      },
    },

    expanderButton: {
      style: {
        color: theme.textSecondary,
        fill: theme.textSecondary,
        backgroundColor: 'transparent',
        borderRadius: '2px',
        transition: '0.25s',
        height: '100%',
        width: '100%',
        '&:hover:enabled': {
          cursor: 'pointer',
        },
        '&:disabled': {
          color: theme.textTertiary,
        },
        '&:hover:not(:disabled)': {
          cursor: 'pointer',
          backgroundColor: 'transparent',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: 'transparent',
        },
        svg: {
          margin: 'auto',
        },
      },
    },
    pagination: {
      style: {
        color: theme.textSecondary,
        backgroundColor: theme.card,
        borderTopColor: theme.cardBorder,
      },
      pageButtonsStyle: {
        color: theme.textSecondary,
        fill: theme.textSecondary,
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'unset',
          color: theme.textTertiary,
          fill: theme.textTertiary,
        },
        '&:hover:not(:disabled)': {
          backgroundColor: theme.cardBorderHover,
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: theme.cardBorderHover,
        },
      },
    },
  };

  return (
    <Card>
      <DataTable
        pagination
        expandableRowsComponent={ExpandedComponent}
        highlightOnHover
        customStyles={customStyles}
        {...props}
      />
    </Card>
  );
}
