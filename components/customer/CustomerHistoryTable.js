import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  dateToLocaleDateString,
  dateToLocaleTimeString,
} from '../../lib/formatDates';
import { cleanAndCapitalise } from '../../lib/formatStrings';

const CustomerHistoryTable = ({ history }) => {
  return (
    <Table variant="simple">
      <TableCaption placement="top">Logs</TableCaption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Time</Th>
          <Th>Field</Th>
          <Th>Prev. value</Th>
          <Th>New value</Th>
          <Th>Edited by</Th>
        </Tr>
      </Thead>
      <Tbody>
        {history.logs.map((log, i) => (
          <Tr key={i}>
            <Td>{dateToLocaleDateString(log.date)}</Td>
            <Td>{dateToLocaleTimeString(log.date)}</Td>
            <Td> {cleanAndCapitalise(log.field)}</Td>
            <Td>{log.prev}</Td>
            <Td>{log.new}</Td>
            <Td>{log.user}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomerHistoryTable;
