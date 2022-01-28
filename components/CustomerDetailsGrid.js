import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const CustomerEditableInput = ({
  userValue,
  editedValue,
  isEditing,
  subtext,
  label,
  inputId,
  stageEdits,
}) => (
  <Box>
    <Text color={subtext}>{label}</Text>
    {isEditing ? (
      <Input
        id={inputId}
        variant="outline"
        defaultValue={editedValue || userValue}
        size="sm"
        onChange={stageEdits}
      />
    ) : (
      <Text mb={2} color={editedValue && 'yellow.400'}>
        {editedValue || userValue}
      </Text>
    )}
  </Box>
);

const CustomerDetailsGrid = ({
  background,
  cardBorder,
  subtext,
  data,
  edits,
  setEdits,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stagingEdits, setStagingEdits] = useState({});
  const editedColorBorder = !edits.length ? cardBorder : 'yellow.400';

  function stageEdits(e) {
    setStagingEdits({
      ...stagingEdits,
      [e.target.id]: e.target.value,
    });
  }

  function stopEditing() {
    Object.entries(stagingEdits).forEach(([k, v]) => {
      if (data.user[k] === v) {
        return null;
      }
      setEdits({
        ...edits,
        [k]: v,
      });
    });
    setIsEditing(false);
  }

  function stopEditingAndUndo() {
    setStagingEdits({});
    setIsEditing(false);
  }

  return (
    <Grid
      gridColumn="2/3"
      gridTemplateColumns="1fr 1fr"
      gap={6}
      py={3}
      pl={6}
      mt={2}
      alignItems="start"
      bg={background}
      borderColor={isEditing ? 'green.200' : editedColorBorder}
      borderWidth="1px"
      borderRadius="md"
      position="relative"
    >
      {isEditing ? (
        <ButtonGroup
          display="grid"
          gridTemplateColumns="1fr"
          position="absolute"
          justifyItems="end"
          top="1"
          right="1"
        >
          <IconButton
            icon={<CheckIcon />}
            width="2rem"
            variant="ghost"
            colorScheme="green"
            size="sm"
            mb={2}
            onClick={() => stopEditing()}
          />
          <IconButton
            icon={<CloseIcon />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => stopEditingAndUndo()}
          />
        </ButtonGroup>
      ) : (
        <IconButton
          icon={<EditIcon />}
          variant="ghost"
          colorScheme="green"
          size="sm"
          position="absolute"
          top="1"
          right="1"
          onClick={() => setIsEditing(true)}
        />
      )}
      <Flex gridColumn="1/2" direction="column">
        <CustomerEditableInput
          isEditing={isEditing}
          userValue={data.user.name}
          editedValue={edits?.name}
          label="Customer Name"
          subtext={subtext}
          inputId="name"
          stageEdits={(e) => stageEdits(e)}
        />
        <Text color={subtext}>Business Name</Text>
        <Text>-</Text>
      </Flex>
      <Flex gridColumn="2/3" direction="column">
        <Text color={subtext}>Email Address</Text>
        <Text mb={2}>{data.user.email}</Text>
        <Text color={subtext}>Contact Number</Text>
        <Text>01234 567 890</Text>
      </Flex>
      <Flex gridColumn="1/2" direction="column">
        <Text color={subtext}>Billing Address</Text>
        <Text>1 Example Street</Text>
        <Text>Radsborough</Text>
        <Text>Coolshire</Text>
        <Text>RD14 1XX</Text>
      </Flex>
      <Flex gridColumn="2/3" direction="column">
        <Text color={subtext}>Delivery Address:</Text>
        <Text>1 Example Street</Text>
        <Text>Radsborough</Text>
        <Text>Coolshire</Text>
        <Text>RD14 1XX</Text>
      </Flex>
    </Grid>
  );
};

export default CustomerDetailsGrid;
