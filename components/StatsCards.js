import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

const StatsCards = ({ background, cardBorder, data }) => {
  // const border = useColorModeValue('gray.300', 'gray.700');

  function getStatusCount(status) {
    const count = { pending: 0, developing: 0, scanning: 0, complete: 0 };
    if (data) {
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
  }

  return (
    <SimpleGrid columns={1} spacing="1rem" px={0} width="100%">
      <Flex
        align="center"
        direction="column"
        justifyContent="center"
        width="100%"
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
    </SimpleGrid>
  );
};

export default StatsCards;
