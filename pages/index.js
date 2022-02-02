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
import { useUser } from '../context/user';
import { GET_ALL_PROCESS_PRODUCTS } from '../components/queries/getAllProcessProducts';
import DataTable from '../components/Table';
import { cleanAndCapitalise } from '../lib/formatStrings';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  return <></>;
};

export default Home;
