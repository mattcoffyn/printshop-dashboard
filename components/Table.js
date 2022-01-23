/* eslint-disable no-nested-ternary */
import { Fragment } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Input,
  Select,
  Flex,
} from '@chakra-ui/react';
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons';
import { useTable, useExpanded, useSortBy, usePagination } from 'react-table';

function DataTable({ columns: userColumns, data, renderRowSubComponent }) {
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
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    useExpanded, // We can useExpanded to track the expanded state
    // for sub components too!
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment {...row.getRowProps()}>
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <Tr>
                    <Td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </Td>
                  </Tr>
                ) : null}
              </Fragment>
            );
          })}
        </Tbody>
      </Table>
      <Flex align="center" justify="space-between" py={2} gap={5}>
        <Flex ml={9} gap={2} align="center" justify="space-between">
          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRightIcon />
          </button>
          <button
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ArrowRightIcon />
          </button>
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
            style={{ width: '100px' }}
          />
          <Select
            maxW={150}
            d="inline-block"
            value={pageSize}
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
    </>
  );
}

export default DataTable;
