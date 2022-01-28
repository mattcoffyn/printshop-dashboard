import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { GoDashboard } from 'react-icons/go';
import { RiHomeFill, RiInboxArchiveLine, RiTodoLine } from 'react-icons/ri';
import { AiOutlineScan, AiOutlineQuestionCircle } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';
import { IoShirtOutline } from 'react-icons/io5';
import {
  MdOutlineSpaceDashboard,
  MdOutlineLocalShipping,
} from 'react-icons/md';
import {
  Divider,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const NavLink = ({ icon, label, url }) => (
  <NextLink href={url} passHref>
    <Flex
      pl={3}
      py={4}
      align="center"
      cursor="pointer"
      minWidth="13rem"
      width="100%"
      overflow="hidden"
      _hover={{ color: 'green.300', background: 'gray.700' }}
    >
      <Icon
        as={icon}
        w={6}
        h={6}
        cursor="pointer"
        _hover={{ color: 'green.300' }}
      />
      <Text ml={6} display="inline">
        {label}
      </Text>
    </Flex>
  </NextLink>
);

export const SideNav = () => {
  const border = useColorModeValue('gray.400', 'gray.700');
  const background = useColorModeValue('gray.50', 'gray.900');
  const cardBackground = useColorModeValue('gray.100', 'gray.800');
  const [isShown, setIsShown] = useState(false);

  return (
    <Flex
      h="100vh"
      w="3rem"
      color="gray.400"
      borderRightWidth="1px"
      borderRightColor={border}
      bg={isShown ? cardBackground : background}
      p={0}
      alignItems="start"
      direction="column"
      position="relative"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <NextLink href="/">
        <Center
          width="100%"
          color="green.500"
          variant="ghost"
          // borderBottomWidth="1px"
          // borderBottomColor={border}
          cursor="pointer"
          py={2}
        >
          <RiHomeFill size={32} />
        </Center>
      </NextLink>
      <Flex
        as="nav"
        direction="column"
        align="start"
        pt={2}
        bg={isShown ? cardBackground : background}
        borderRightWidth="1px"
        borderRightColor={border}
        mt="1px"
        width={isShown ? '13rem' : '3rem'}
        overflow="hidden"
        height="100%"
        zIndex="2000"
        boxShadow={isShown ? '2xl' : ''}
        // sx={isShown ? { boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)' } : {}}
        transition="all 0.3s ease-in-out"
      >
        <NavLink icon={MdOutlineSpaceDashboard} label="Dashboard" url="/" />
        <NavLink icon={RiInboxArchiveLine} label="Goods In" url="/about" />
        <NavLink icon={VscColorMode} label="Developing" url="/" />
        <NavLink icon={AiOutlineScan} label="Scanning" url="/" />
        <NavLink icon={MdOutlineLocalShipping} label="Shipping" url="/" />

        <Divider my={2} />

        <NavLink icon={FiUsers} label="Customers" url="/" />
        <NavLink icon={RiTodoLine} label="Orders" url="/" />
        <NavLink icon={IoShirtOutline} label="Merch" url="/" />

        <Divider my={2} />

        <NavLink icon={GoDashboard} label="Analytics" url="/" />
        <NavLink icon={AiOutlineQuestionCircle} label="Help" url="/" />
      </Flex>
    </Flex>
  );
};
