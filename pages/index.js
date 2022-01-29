import {
  Box,
  CircularProgress,
  Flex,
  GridItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import StatsCards from '../components/StatsCards';
import { useUser } from '../components/User';
import { GET_ALL_PROCESS_PRODUCTS } from '../components/queries/getAllProcessProducts';
import DataTable from '../components/Table';
import { cleanAndCapitalise } from '../lib/formatStrings';

const Home = () => {
  const user = useUser();
  const border = useColorModeValue('gray.300', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.800');
  const background = useColorModeValue('gray.100', 'gray.800');
  // const data = useMemo(() => makeData(100), []);
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_PRODUCTS);

  if (loading) return <CircularProgress isIndeterminate color="green.300" />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <GridItem gridColumn="1/17">
        <Flex align="center" mb="3.5rem" height="6rem">
          <Text as="h1" fontSize="4xl" p={0} ml={8}>
            {`Welcome ${user?.name}`}
          </Text>
        </Flex>
        <Box
          p={2}
          ml={2}
          borderWidth={1}
          borderColor={cardBorder}
          borderRadius="lg"
          background={background}
        >
          <DataTable
            data={data.processProducts.map((order) => ({
              name: order.user.name,
              customerId: order.user.id,
              id: order.id,
              filmType: order.filmType.name,
              filmColour: order.filmColour.name,
              dev: order.noDevelop ? 'No' : 'Yes',
              scan: order.noScans ? 'No' : 'Yes',
              scanResolution: order.scanResolution?.name,
              status: cleanAndCapitalise(order.status),
              notes: order.notes,
            }))}
          />
        </Box>
      </GridItem>
      <Box
        gridColumn="17/19"
        p={3}
        mt={2}
        borderWidth={1}
        borderColor={border}
        borderRadius="lg"
        // bg={background}
      >
        <StatsCards
          data={data}
          background={background}
          cardBorder={cardBorder}
        />
      </Box>
    </>
  );
};

export default Home;
