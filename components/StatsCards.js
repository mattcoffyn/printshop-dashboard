import { useQuery } from '@apollo/client';
import {
  Flex,
  SimpleGrid,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { GET_ALL_PROCESS_PRODUCTS } from './queries/getAllProcessProducts';

const StatsCards = ({ background, cardBorder }) => {
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_PRODUCTS);
  // const border = useColorModeValue('gray.300', 'gray.700');

  if (error) return <p>{error.message}</p>;

  function getStatusCount(status) {
    const count = { pending: 0, developing: 0, scanning: 0, complete: 0 };
    data?.processProducts.map((order) => {
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
    <SimpleGrid columns={1} spacing="1rem" px={0}>
      <Skeleton isLoaded={!loading}>
        <Flex
          align="center"
          direction="column"
          justifyContent="center"
          borderColor={cardBorder}
          borderWidth="1px"
          borderRadius="lg"
          p={2}
          bg={background}
          style={{ aspectRatio: '1/1' }}
        >
          <h3>Awaiting Film</h3>
          <Text fontSize="2xl" margin="auto" pb={3}>
            {getStatusCount('pending')}
          </Text>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex
          align="center"
          direction="column"
          borderColor={cardBorder}
          borderWidth="1px"
          borderRadius="lg"
          p={2}
          bg={background}
          style={{ aspectRatio: '1/1' }}
        >
          <h3>Developing</h3>
          <Text fontSize="2xl" margin="auto" pb={3}>
            {getStatusCount('developing')}
          </Text>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex
          align="center"
          direction="column"
          borderColor={cardBorder}
          borderWidth="1px"
          borderRadius="md"
          p={2}
          bg={background}
          style={{ aspectRatio: '1/1' }}
        >
          <h3>Scanning</h3>
          <Text fontSize="2xl" margin="auto" pb={3}>
            {getStatusCount('scanning')}
          </Text>
        </Flex>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex
          align="center"
          direction="column"
          borderColor={cardBorder}
          borderWidth="1px"
          borderRadius="md"
          p={2}
          bg={background}
          style={{ aspectRatio: '1/1' }}
        >
          <h3>Ready to Ship</h3>
          <Text fontSize="2xl" margin="auto" pb={3}>
            {getStatusCount('complete')}
          </Text>
        </Flex>
      </Skeleton>
    </SimpleGrid>
  );
};

export default StatsCards;
