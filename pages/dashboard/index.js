import {
  Box,
  Flex,
  GridItem,
  Text,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import StatsCards from '../../components/StatsCards';
import { useUser } from '../../context/user';
import { GET_ALL_PROCESS_PRODUCTS } from '../../components/queries/getAllProcessProducts';
import DataTable from '../../components/Table';
import { cleanAndCapitalise } from '../../lib/formatStrings';

const Home = () => {
  const { user } = useUser();
  const border = useColorModeValue('gray.300', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.800');
  const background = useColorModeValue('gray.100', 'gray.800');
  // const data = useMemo(() => makeData(100), []);
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_PRODUCTS);

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <GridItem gridColumn="1/17">
        <Skeleton isLoaded={!loading}>
          <Flex align="center" mb="3.5rem" height="6rem">
            <Text as="h1" fontSize="4xl" p={0} ml={8}>
              {`Welcome ${user?.firstName} ${user?.secondName}`}
            </Text>
          </Flex>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Box
            p={2}
            ml={2}
            borderWidth={1}
            borderColor={cardBorder}
            borderRadius="lg"
            background={background}
          >
            {!loading && (
              <DataTable
                data={data.processProducts.map((job) => ({
                  firstName: job.order.user.firstName,
                  secondName: job.order.user.secondName,
                  customerId: job.order.user.customerNumber,
                  id: job.id,
                  filmType: job.filmType.name,
                  filmColour: job.filmColour.name,
                  dev: job.noDevelop ? 'No' : 'Yes',
                  scan: job.noScans ? 'No' : 'Yes',
                  scanResolution: job.scanResolution?.name,
                  status: cleanAndCapitalise(job.status),
                  notes: job.notes,
                }))}
              />
            )}
          </Box>
        </Skeleton>
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
        <Skeleton isLoaded={!loading}>
          <StatsCards
            data={data}
            background={background}
            cardBorder={cardBorder}
          />
        </Skeleton>
      </Box>
    </>
  );
};

export default Home;
