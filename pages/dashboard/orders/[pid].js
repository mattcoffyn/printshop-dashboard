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
import OrderHead from '../../../components/order/OrderHead';
// import {
// CustomerSaveAlert,
// CustomerUndoAlert,
// } from '../../components/customer/CustomerEditAlerts';
// import CustomerHead from '../../components/customer/CustomerHead';
// import CustomerHistoryTable from '../../components/customer/CustomerHistoryTable';
// import CustomerTable from '../../components/customer/CustomerOrdersTable';
import { useUser } from '../../../components/User';
// import {
//   dateToLocaleDateString,
//   dateToLocaleTimeString,
// } from '../../lib/formatDates';
import { cleanAndCapitalise } from '../../../lib/formatStrings';
import { useWarningOnExit } from '../../../lib/useWarningOnExit';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: OrderWhereUniqueInput!) {
    order(where: $id) {
      id
      total
      processProducts {
        id
        notes
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
          description
        }
        scanResolution {
          id
          name
          description
        }
        singleQuantity
        status
      }
      user {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;

// const CUSTOMER_MUTATION = gql`
//   mutation CUSTOMER_MUTATION(
//     $updateUserWhere: UserWhereUniqueInput!
//     $data: UserUpdateInput!
//   ) {
//     updateUser(where: $updateUserWhere, data: $data) {
//       id
//       name
//       email
//       updatedOn
//       history
//     }
//   }
// `;

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
  const user = useUser();

  const { data, loading } = useQuery(ORDER_QUERY, {
    variables: {
      id: {
        id: pid,
      },
    },
  });

  // const [updateUser] = useMutation(CUSTOMER_MUTATION, {
  //   refetchQueries: [{ query: CUSTOMER_QUERY }],
  // });

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

  // async function saveChanges() {
  //   const res = await updateUser({
  //     variables: {
  //       updateUserWhere: {
  //         id: data.user.id,
  //       },
  //       data: {
  //         ...edits,
  //         updatedOn: new Date().toISOString(),
  //         history: mergeHistory(),
  //       },
  //     },
  //   });

  //   setEdits({});
  //   setIsSaveAlertOpen(false);
  //   toast({
  //     title: 'Changes Saved!.',
  //     description: 'All changes have been saved',
  //     status: 'success',
  //     variant: 'solid',
  //     position: 'top',
  //     duration: 5000,
  //     isClosable: true,
  //   });
  // }

  // function mergeHistory() {
  //   let currentEdits = [];
  //   Object.entries(edits).map(([k, v]) => {
  //     currentEdits = [
  //       ...currentEdits,
  //       {
  //         field: k,
  //         new: v,
  //         prev: data.user[k],
  //         user: user.name,
  //         date: new Date().toISOString(),
  //       },
  //     ];
  //   });
  //   return { logs: [...data.user.history.logs, ...currentEdits] };
  // }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* <CustomerUndoAlert
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
      /> */}
      <OrderHead
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
            <Tab fontStyle="italic">Orders</Tab>
            <Tab fontStyle="italic">Stats</Tab>
            <Tab fontStyle="italic">Info</Tab>
            <Tab fontStyle="italic">Options</Tab>
            <Tab fontStyle="italic">History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <CustomerTable
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
              /> */}
            </TabPanel>
            <TabPanel />
            <TabPanel />
            <TabPanel />
            <TabPanel>
              {/* <CustomerHistoryTable
                cardBorder={cardBorder}
                data={data.user.history.logs.map((log) => ({
                  dateTime: log.date,
                  field: cleanAndCapitalise(log.field),
                  prev: log.prev,
                  new: log.new,
                  user: log.user,
                }))}
              /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </>
  );
};

export default Customer;
