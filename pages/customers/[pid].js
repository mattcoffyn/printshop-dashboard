import { gql, useMutation, useQuery } from '@apollo/client';
import {
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CustomerSaveAlert,
  CustomerUndoAlert,
} from '../../components/CustomerEditAlerts';
import CustomerHead from '../../components/CustomerHead';
import CustomerTable from '../../components/CustomerTable';
import { cleanAndCapitalise } from '../../lib/formatStrings';
import { useWarningOnExit } from '../../lib/useWarningOnExit';

const CUSTOMER_QUERY = gql`
  query CUSTOMER_QUERY($id: UserWhereUniqueInput!) {
    user(where: $id) {
      id
      name
      email
      role {
        id
        name
      }
      cart {
        quantity
        id
        product {
          name
          id
        }
      }
      processProducts {
        id
        noDevelop
        noScans
        isSingle
        isSlide
        filmType {
          id
          name
        }
        filmColour {
          id
          name
        }
        scanResolution {
          id
          name
        }
        singleQuantity
        status
        order {
          id
          total
          processProductsCount
        }
        price
        createdOn
        updatedOn
      }
    }
  }
`;

const CUSTOMER_MUTATION = gql`
  mutation CUSTOMER_MUTATION(
    $updateUserWhere: UserWhereUniqueInput!
    $data: UserUpdateInput!
  ) {
    updateUser(where: $updateUserWhere, data: $data) {
      id
      name
      email
    }
  }
`;

const Customer = () => {
  const router = useRouter();
  const { pid } = router.query;
  const cardBorder = useColorModeValue('gray.200', 'gray.800');
  const background = useColorModeValue('gray.100', 'gray.800');
  const subtext = useColorModeValue('gray.800', 'gray.400');
  const [edits, setEdits] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
  const [isUndoAlertOpen, setIsUndoAlertOpen] = useState(false);
  const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
  const onUndoClose = () => setIsUndoAlertOpen(false);
  const onSaveClose = () => setIsSaveAlertOpen(false);
  const toast = useToast();

  const { data, loading } = useQuery(CUSTOMER_QUERY, {
    variables: {
      id: {
        id: pid,
      },
    },
  });

  const [updateUser] = useMutation(CUSTOMER_MUTATION, {
    variables: {
      updateUserWhere: {
        id: pid,
      },
      data: edits,
    },
    refetchQueries: [{ query: CUSTOMER_QUERY }],
  });

  useWarningOnExit(
    Object.keys(edits).length > 0,
    `You have ${
      Object.keys(edits).length
    } edits pending. Are you sure you want to leave?`
  );

  useEffect(() => {
    if (Object.keys(edits).length !== 0) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [edits]);

  function revertChanges() {
    setEdits({});
    setIsUndoAlertOpen(false);
    toast({
      title: 'Changes cancelled.',
      description: 'All changes have been cancelled',
      status: 'success',
      variant: 'solid',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  }

  async function saveChanges() {
    const res = await updateUser();
    console.log(res);
    setEdits({});
    setIsSaveAlertOpen(false);
    toast({
      title: 'Changes Saved!.',
      description: 'All changes have been saved',
      status: 'success',
      variant: 'solid',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CustomerUndoAlert
        isUndoAlertOpen={isUndoAlertOpen}
        onClose={onUndoClose}
        revertChanges={() => revertChanges()}
        edits={edits}
        data={data}
      />
      <CustomerSaveAlert
        isSaveAlertOpen={isSaveAlertOpen}
        onClose={onSaveClose}
        saveChanges={() => saveChanges()}
        edits={edits}
        data={data}
      />
      <CustomerHead
        data={data}
        edits={edits}
        setEdits={setEdits}
        hasChanged={hasChanged}
        background={background}
        subtext={subtext}
        cardBorder={cardBorder}
        setIsUndoAlertOpen={setIsUndoAlertOpen}
        setIsSaveAlertOpen={setIsSaveAlertOpen}
      />

      <GridItem gridColumn="1/19">
        <Tabs colorScheme="green" mt={8}>
          <TabList pl={3}>
            <Tab>Orders</Tab>
            <Tab>Stats</Tab>
            <Tab>Info</Tab>
            <Tab>Options</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CustomerTable
                cardBorder={cardBorder}
                data={data.user.processProducts.map((process) => ({
                  orderId: process.order.id,
                  processId: process.id,
                  total: process.total,
                  filmType: process.filmType.name,
                  filmColour: process.filmColour.name,
                  dev: process.noDevelop ? 'No' : 'Yes',
                  scan: process.noScans ? 'No' : 'Yes',
                  scanResolution: process.scanResolution?.name,
                  status: cleanAndCapitalise(process.status),
                  notes: process.notes,
                  cost: process.price,
                  createdOn: process.createdOn,
                  updatedOn: process.updatedOn,
                }))}
              />
            </TabPanel>
            <TabPanel />
            <TabPanel />
            <TabPanel />
          </TabPanels>
        </Tabs>
      </GridItem>
    </>
  );
};

export default Customer;
