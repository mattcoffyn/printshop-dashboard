/* eslint-disable no-nested-ternary */
import { Fragment, useMemo } from 'react';
import {
  FiChevronRight,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronsLeft,
} from 'react-icons/fi';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
} from '@chakra-ui/react';
import {
  TriangleDownIcon,
  TriangleUpIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import { useTable, useSortBy, usePagination } from 'react-table';
import Link from 'next/link';
import { formatMoneyfromPence, formatSO, formatWO } from '../lib/formatNumbers';
import { dateToLocaleString } from '../lib/formatDates';

const createCell = ({ row }) => (
  <Menu placement="bottom-end">
    <MenuButton
      as={IconButton}
      icon={<HamburgerIcon />}
      size="xs"
      colorScheme="green"
      bg="green.500"
    >
      Actions
    </MenuButton>
    <MenuList>
      <MenuItem>
        <Link href="/">View Order</Link>
      </MenuItem>
      <MenuItem>
        <Link href={`/customers/${row.original.customerId}`}>
          View Customer
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">Mark as Complete</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/" passHref>
          <Text color="red.500">Delete Order</Text>
        </Link>
      </MenuItem>
    </MenuList>
  </Menu>
);

function CustomerTable({ data, cardBorder }) {
  const optionsCell = {
    // Header: () => null,
    Header: () => null,
    id: 'options', // It needs an ID
    Cell: createCell,
  };

  // const renderRowSubComponent = useCallback(
  //   ({ row }) => (
  //     <Flex>
  //       <Text as="h2">{row.values.name}</Text>
  //       <Text>{row.values.email}</Text>
  //     </Flex>
  //   ),
  //   []
  // );

  const columns = useMemo(
    () => [
      // {
      //   Header: 'Orders',
      // columns: [
      {
        Header: 'Process Job',
        accessor: (row) => formatWO(row.processId),
        id: 'processId',
      },
      {
        Header: 'Order',
        accessor: (row) => formatSO(row.orderId),
        id: 'orderId',
      },
      {
        Header: 'Develop',
        accessor: 'dev',
      },
      {
        Header: 'Scan',
        accessor: 'scan',
      },
      {
        Header: 'Film Type',
        accessor: 'filmType',
      },
      {
        Header: 'Film Colour',
        accessor: 'filmColour',
      },
      {
        Header: 'Cost',
        accessor: (row) => formatMoneyfromPence(row.cost),
        id: 'cost',
      },
      {
        Header: 'Created on',
        accessor: (row) => dateToLocaleString(row.createdOn),
        id: 'createdOn',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      optionsCell,
      // {
      //   Header: 'Profile Progress',
      //   Footer: 'Profile Progress',
      //   accessor: 'progress',
      // },
      // ],
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: [{ orderId: 1, desc: true }] },
    },
    useSortBy,
    // useExpanded,
    usePagination
  );

  return (
    <Box>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column) => (
                <Th
                  key={column.key}
                  borderColor={cardBorder}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();

            return (
              <Fragment key={rowProps.key}>
                <Tr {...rowProps}>
                  {row.cells.map((cell) => (
                    <Td
                      key={cell.key}
                      borderColor={cardBorder}
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              </Fragment>
            );
          })}
        </Tbody>
      </Table>
      <Flex align="center" justify="space-between" pt={4} pb={2} gap={5}>
        <Flex ml={4} gap={0} align="center" justify="space-between">
          <IconButton
            aria-label="First table page"
            variant="ghost"
            icon={
              <FiChevronsLeft
                style={{
                  fontSize: '2rem',
                }}
              />
            }
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />

          <IconButton
            aria-label="Previous table page"
            variant="ghost"
            icon={
              <FiChevronLeft
                style={{
                  fontSize: '1.7rem',
                }}
              />
            }
            type="button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />

          <IconButton
            aria-label="Next table page"
            variant="ghost"
            icon={
              <FiChevronRight
                style={{
                  fontSize: '1.7rem',
                }}
              />
            }
            type="button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          />

          <IconButton
            aria-label="Last table page"
            variant="ghost"
            icon={
              <FiChevronsRight
                style={{
                  fontSize: '2rem',
                }}
              />
            }
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </Flex>
        <Flex maxW="100%">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </Flex>
        <Flex flex="row" align="center" justify="flex-end" gap={8} mr={7}>
          <span
            style={{
              inlineSize: '110px',
              marginRight: '-20px',
            }}
          >
            Go to page:{' '}
          </span>
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const p = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(p);
            }}
            borderColor={cardBorder}
            style={{ width: '100px' }}
          />
          <Select
            maxW={150}
            d="inline-block"
            value={pageSize}
            borderColor={cardBorder}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pSize) => (
              <option key={pSize} value={pSize}>
                Show {pSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CustomerTable;
