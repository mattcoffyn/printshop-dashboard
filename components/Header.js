import { useMutation } from '@apollo/client';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  IconButton,
  Switch,
  useColorMode,
  MenuGroup,
  MenuDivider,
  Button,
  Text,
} from '@chakra-ui/react';
import { FiSliders, FiUser } from 'react-icons/fi';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION, useUser } from '../lib/useUser';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const border = useColorModeValue('gray.400', 'gray.600');
  const version = useColorModeValue('gray.500', 'gray.500');
  const { user } = useUser();
  const isLoggedIn = !!user;
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleSignout() {
    signout();
  }

  return (
    <Flex
      className="header"
      d="fixed"
      pl={5}
      pr={1}
      py={1}
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderBottomColor={border}
    >
      <Flex align="center" mr={5} justify="start">
        <Text as="span">
          Print Shop{' '}
          <Text as="strong" color={version}>
            v0.2.4
          </Text>
        </Text>
      </Flex>
      <Flex align="center" mr={5} justify="end" p={0} m={0}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="App Settings"
            icon={<FiSliders />}
            bg="none"
            _hover={{ bg: 'none', color: 'gray.400' }}
            _expanded={{ bg: 'none', color: 'gray.400' }}
          />
          <MenuList>
            <MenuGroup title="Settings">
              <MenuItem
                closeOnSelect={false}
                d="flex"
                justifyContent="space-between"
              >
                <span>Dark Mode</span>
                <Switch
                  colorScheme="green"
                  size="lg"
                  onChange={toggleColorMode}
                  isChecked={colorMode === 'dark'}
                />
              </MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <Menu closeOnBlur closeOnSelect>
          <MenuButton
            as={IconButton}
            aria-label="Account Options"
            icon={<FiUser />}
            bg="none"
            color={isLoggedIn ? 'green.400' : 'white'}
            _hover={{ bg: 'none', color: 'gray.400' }}
            _expanded={{ bg: 'none', color: 'gray.400' }}
          />
          <MenuList>
            <MenuGroup title="Account">
              <MenuItem>
                {isLoggedIn ? (
                  <Button
                    colorScheme="green"
                    variant="link"
                    onClick={() => handleSignout()}
                  >
                    Sign out
                  </Button>
                ) : (
                  <Button colorScheme="green" variant="link" onClick={signout}>
                    I'm logged out
                  </Button>
                )}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
