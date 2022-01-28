import { CloseIcon, QuestionOutlineIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Grid,
  Text,
  Tooltip,
  Alert,
  ButtonGroup,
  AlertIcon,
} from '@chakra-ui/react';
import { formatUserNumber, formatMoneyfromPence } from '../lib/formatNumbers';
import CustomerDetailsGrid from './CustomerDetailsGrid';

const EditedContentConfirmation = ({
  hasChanged,
  setIsUndoAlertOpen,
  setIsSaveAlertOpen,
}) => {
  if (!hasChanged) return null;
  return (
    <>
      <Alert
        position="absolute"
        top="0.5rem"
        right="8rem"
        status="warning"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="5rem"
        maxWidth="16rem"
        borderWidth={1}
        borderColor="yellow.400"
        borderRadius="md"
        bg="gray.800"
        color="white"
      >
        <Flex width="100%" justifyContent="flex-start">
          <AlertIcon color="yellow.400" />
          <p>You have unsaved edits.</p>
        </Flex>
        <ButtonGroup mt={2} width="100%" justifyContent="flex-end">
          <Button
            size="xs"
            variant="solid"
            color="gray.900"
            bg="yellow.400"
            leftIcon={<ViewIcon />}
            onClick={() => setIsSaveAlertOpen(true)}
          >
            Review & Save
          </Button>
          <Button
            size="xs"
            variant="solid"
            // colorScheme="blackAlpha"
            leftIcon={<CloseIcon />}
            onClick={() => setIsUndoAlertOpen(true)}
          >
            Undo
          </Button>
        </ButtonGroup>
      </Alert>
    </>
  );
};

const CustomerStatCard = ({ title, unit, background, cardBorder, label }) => (
  <Flex
    position="relative"
    direction="column"
    alignItems="center"
    justifyContent="center"
    bg={background}
    borderColor={cardBorder}
    borderWidth="1px"
    h="100%"
    style={{ aspectRatio: '1/1' }}
    borderRadius="lg"
  >
    <Tooltip
      label={label}
      aria-label="A tooltip"
      placement="top"
      openDelay={500}
      hasArrow
    >
      <QuestionOutlineIcon
        color="green.500"
        position="absolute"
        top="-2"
        right="-2"
      />
    </Tooltip>
    <Text position="absolute" top="2">
      {title}
    </Text>
    <Text fontSize="2xl">{unit}</Text>
  </Flex>
);

function getOpenOrdersCount(orders) {
  let count = 0;
  orders.forEach((order) => {
    if (order.status !== 'SHIPPED') {
      count += 1;
    }
  });
  return count;
}

function getLifetimeSpend(orders) {
  let total = 0;
  orders.forEach((o) => {
    total += o.order.total;
  });
  return total;
}

const CustomerHead = ({
  subtext,
  background,
  cardBorder,
  data,
  edits,
  setEdits,
  hasChanged,
  setIsUndoAlertOpen,
  setIsSaveAlertOpen,
}) => (
  <Grid gridColumn="1/19" align="start" gridTemplateColumns="2fr 1fr" pl={2}>
    <Flex
      position="relative"
      gridColumn="1/2"
      align="start"
      direction="column"
      marginTop={2}
    >
      <Text as="h1" fontSize="4xl" ml={2}>
        <Text as="span" color={subtext}>
          Customer:{' '}
        </Text>
        {data.user.name}
      </Text>
      <Text as="h2" fontSize="2xl" ml={2}>
        <Text as="span" color={subtext}>
          #
        </Text>
        {formatUserNumber(data.user.id)}
      </Text>
      <EditedContentConfirmation
        hasChanged={hasChanged}
        setIsUndoAlertOpen={setIsUndoAlertOpen}
        setIsSaveAlertOpen={setIsSaveAlertOpen}
      />
      <Flex
        width="100%"
        height="10rem"
        mt={4}
        pt={6}
        // borderTopColor={border}
        // borderTopWidth={1}
        alignItems="center"
        justifyContent="space-around"
      >
        <CustomerStatCard
          title="Active Orders"
          unit={getOpenOrdersCount(data.user.processProducts)}
          background={background}
          cardBorder={cardBorder}
          label="No. of orders awaiting completion."
        />
        <CustomerStatCard
          title="Lifetime Orders"
          unit={data.user.processProducts.length}
          background={background}
          cardBorder={cardBorder}
          label="Total no. of orders."
        />
        <CustomerStatCard
          title="Lifetime Spend"
          unit={formatMoneyfromPence(
            getLifetimeSpend(data.user.processProducts)
          )}
          background={background}
          cardBorder={cardBorder}
          label="Total customer spend incl. shipping & charges."
        />
      </Flex>
    </Flex>
    <CustomerDetailsGrid
      data={data}
      edits={edits}
      setEdits={setEdits}
      background={background}
      cardBorder={cardBorder}
      subtext={subtext}
    />
  </Grid>
);

export default CustomerHead;