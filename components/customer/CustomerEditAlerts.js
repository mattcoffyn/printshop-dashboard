import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { cleanAndCapitalise } from '../../lib/formatStrings';

export const CustomerUndoAlert = ({
  isUndoAlertOpen,
  onClose,
  revertChanges,
  edits,
  data,
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isUndoAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="xl"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Undo Changes
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to lose all your changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No, take me back
            </Button>
            <Button
              colorScheme="red"
              color="white"
              bg="red.600"
              onClick={revertChanges}
              ml={3}
            >
              Yes, undo changes
            </Button>
          </AlertDialogFooter>
          <Table
            variant="simple"
            width="90%"
            mx="auto"
            mb={5}
            p={3}
            direction="column"
            bg="blackAlpha.300"
            overflowX="auto"
          >
            <TableCaption placement="top">Review your changes</TableCaption>
            <Thead>
              <Tr>
                <Th />
                <Th>Original value</Th>
                <Th>Updated Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(edits).map(([k, v]) => (
                <Tr key={k}>
                  <Td>{cleanAndCapitalise(k)}</Td>
                  <Td color="red.500">{data.user[k]}</Td>
                  <Td color="green.500">{v}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const CustomerSaveAlert = ({
  isSaveAlertOpen,
  onClose,
  saveChanges,
  edits,
  data,
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isSaveAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="xl"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Save Changes
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you happy to submit all changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No, take me back
            </Button>
            <Button
              colorScheme="green"
              color="white"
              bg="green.500"
              onClick={saveChanges}
              ml={3}
            >
              Yes, submit changes
            </Button>
          </AlertDialogFooter>
          <Table
            variant="simple"
            width="90%"
            mx="auto"
            mb={5}
            p={3}
            direction="column"
            bg="blackAlpha.300"
            overflowX="auto"
          >
            <TableCaption placement="top">Review your changes</TableCaption>
            <Thead>
              <Tr>
                <Th />
                <Th>Original value</Th>
                <Th>Updated Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(edits).map(([k, v]) => (
                <Tr key={k}>
                  <Td>{cleanAndCapitalise(k)}</Td>
                  <Td color="red.500">{data.user[k]}</Td>
                  <Td color="green.500">{v}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
