import { useQuery } from '@apollo/client';
import {
  Center,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { GET_ALL_PROCESS_PRODUCTS } from './queries/getAllProcessProducts';

const StatsCards = () => {
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_PRODUCTS);
  const border = useColorModeValue('gray.300', 'gray.700');

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error.message}</p>;

  function getStatusCount(status) {
    const count = { pending: 0, developing: 0, scanning: 0, complete: 0 };
    data.processProducts.map((order) => {
      if (order.status === 'AWAITING_FILM') {
        count.pending += 1;
      }
      if (order.status === 'FILM_RECEIVED' && !order.status.noDevelop) {
        count.developing += 1;
      }
      if (order.status === 'FILM_RECEIVED' && order.status.noDevelop) {
        count.scanning += 1;
      }
      if (order.status === 'DEVELOPED' && !order.status.noScans) {
        count.scanning += 1;
      }
      if (order.status === 'DEVELOPED' && order.status.noScans) {
        count.complete += 1;
      }
      if (order.status === 'SCANNED') {
        count.complete += 1;
      }
      if (order.status === 'COMPLETE') {
        count.complete += 1;
      }
      return null;
    });
    return count[status];
  }

  return (
    <SimpleGrid columns={2} spacing="1rem" px={2}>
      <Flex
        align="center"
        direction="column"
        borderColor={border}
        borderWidth="1px"
        borderRadius="md"
        style={{ aspectRatio: '1/1' }}
      >
        <h3>Pending</h3>
        <Center h="100%">
          <Text fontSize="2xl">{getStatusCount('pending')}</Text>
        </Center>
      </Flex>
      <Flex
        align="center"
        direction="column"
        borderColor={border}
        borderWidth="1px"
        borderRadius="md"
        style={{ aspectRatio: '1/1' }}
      >
        <h3>Developing</h3>
        <Center h="100%">
          <Text fontSize="2xl">{getStatusCount('developing')}</Text>
        </Center>
      </Flex>
      <Flex
        align="center"
        direction="column"
        borderColor={border}
        borderWidth="1px"
        borderRadius="md"
        style={{ aspectRatio: '1/1' }}
      >
        <h3>Scanning</h3>
        <Center h="100%">
          <Text fontSize="2xl">{getStatusCount('scanning')}</Text>
        </Center>
      </Flex>
      <Flex
        align="center"
        direction="column"
        borderColor={border}
        borderWidth="1px"
        borderRadius="md"
        style={{ aspectRatio: '1/1' }}
      >
        <h3>Shipping</h3>
        <Center h="100%">
          <Text fontSize="2xl">{getStatusCount('complete')}</Text>
        </Center>
      </Flex>
    </SimpleGrid>
  );
};

export default StatsCards;
