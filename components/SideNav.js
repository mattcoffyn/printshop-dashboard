import { FiCoffee } from 'react-icons/fi';
import { IoShirtSharp } from 'react-icons/io5';
import { MdOutlineDashboard } from 'react-icons/md';
import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export const SideNav = () => {
  const border = useColorModeValue('gray.400', 'gray.600');

  return (
    <Flex
      as="nav"
      direction="column"
      align="center"
      justify="start"
      gap={8}
      pt={3}
      h="100vh"
      w="3rem"
      borderRightWidth="1px"
      borderRightColor={border}
    >
      <Link href="/">
        <Icon
          as={IoShirtSharp}
          h={7}
          w={7}
          color="green.400"
          variant="ghost"
          cursor="pointer"
        />
      </Link>

      <Link href="/about">
        <Icon as={MdOutlineDashboard} w={6} h={6} cursor="pointer" />
      </Link>

      <FiCoffee />

      <FiCoffee />
    </Flex>
  );
};
