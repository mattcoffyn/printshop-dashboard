import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';

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
    <Text color={subtext} fontStyle="italic">
      {label}
    </Text>
    {isEditing ? (
      <Input
        id={inputId}
        variant="outline"
        defaultValue={editedValue || userValue}
        size="sm"
        onChange={(e) => stageEdits(e)}
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
  const ref = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [stagedEdits, setStagedEdits] = useState({});
  const editedColorBorder =
    Object.entries(edits).length > 0 ? 'yellow.400' : cardBorder;

  function stageEdits(e) {
    setStagedEdits({
      ...stagedEdits,
      [e.target.id]: e.target.value,
    });
  }

  function stopEditing() {
    let temp = {};
    Object.entries(stagedEdits).map(([k, v]) => {
      if (data.user[k] === v) {
        setEdits((prevEdits) => {
          const newEdits = { ...prevEdits };
          delete newEdits[k];
          return newEdits;
        });
      } else {
        temp = {
          ...temp,
          [k]: v,
        };
      }
    });
    setEdits({
      ...edits,
      ...temp,
    });
    setStagedEdits({});
    setIsEditing(false);
  }

  function stopEditingAndUndo() {
    setStagedEdits({});
    setIsEditing(false);
  }

  useOutsideClick({
    ref: ref,
    handler: () => stopEditing(),
  });

  return (
    <Grid
      ref={ref}
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
        <Text color={subtext} fontStyle="italic">
          Business Name
        </Text>
        <Text>-</Text>
      </Flex>
      <Flex gridColumn="2/3" direction="column" paddingRight={10}>
        <CustomerEditableInput
          isEditing={isEditing}
          userValue={data.user.email}
          editedValue={edits?.email}
          label="Email Address"
          subtext={subtext}
          inputId="email"
          stageEdits={(e) => stageEdits(e)}
        />
        <Text color={subtext} fontStyle="italic">
          Contact Number
        </Text>
        <Text>01234 567 890</Text>
      </Flex>
      <Flex gridColumn="1/2" direction="column">
        <Text color={subtext} fontStyle="italic">
          Billing Address
        </Text>
        <Text>1 Example Street</Text>
        <Text>Radsborough</Text>
        <Text>Coolshire</Text>
        <Text>RD14 1XX</Text>
      </Flex>
      <Flex gridColumn="2/3" direction="column">
        <Text color={subtext} fontStyle="italic">
          Delivery Address:
        </Text>
        <Text>1 Example Street</Text>
        <Text>Radsborough</Text>
        <Text>Coolshire</Text>
        <Text>RD14 1XX</Text>
      </Flex>
    </Grid>
  );
};

export default CustomerDetailsGrid;
