import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import DataTable from '../components/Table';
import makeData from '../lib/makeTableData';
import StatsCards from '../components/StatsCards';
import { useUser } from '../lib/useUser';

const expandedCell = {
  // Make an expander cell
  Header: () => null, // No header
  id: 'expander', // It needs an ID
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
    </span>
  ),
};

const Home = () => {
  const { user } = useUser();
  const border = useColorModeValue('gray.300', 'gray.700');
  const columns = useMemo(
    () => [
      {
        Header: 'Recent Orders',
        columns: [
          expandedCell,
          {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Age',
            Footer: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            Footer: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            Footer: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            Footer: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => makeData(100), []);

  // Create a function that will render our row sub components
  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  );

  return (
    <>
      <Flex
        pb={3}
        gridColumn="1/13"
        gridRow="1/2"
        maxW="100%"
        align="center"
        borderBottomWidth={1}
        borderBottomColor={border}
        mb={2}
      >
        <Text as="h1" fontSize="4xl" p={0} ml={8}>
          {`Welcome ${user.name}`}
        </Text>
      </Flex>

      <Box
        gridColumn="1/10"
        p={0}
        borderWidth={1}
        borderColor={border}
        borderRadius={5}
      >
        <DataTable
          columns={columns}
          data={data}
          // We added this as a prop for our table component
          // Remember, this is not part of the React Table API,
          // it's merely a rendering option we created for
          // ourselves
          renderRowSubComponent={renderRowSubComponent}
        />
      </Box>
      <Box gridColumn="10/13" p={0}>
        <StatsCards />
      </Box>
    </>
  );
};

export default Home;
