import { useCombobox } from 'downshift';
import { menuStyles, comboboxStyles } from './utils';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

const GET_ALL_USERS = gql`
  query GET_ALL_USERS {
    users {
      id
      firstName
      secondName
      email
    }
  }
`;

export default function CustomerSearch() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [allItems, setAllItems] = useState([]);
  const [inputItems, setInputItems] = useState([]);

  useEffect(() => {
    if (data) {
      const { users } = data;
      setAllItems(users);
      setInputItems(users);
    }
  }, [data]);

  const itemToString = (item) =>
    item ? `${item.firstName} ${item.secondName}` : '';

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        allItems.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <label {...getLabelProps()}>Customer:</label>
      <div {...getComboboxProps()}>
        <Input {...getInputProps()} />
      </div>
      <UnorderedList {...getMenuProps()} listStyleType="none">
        {isOpen && loading ? (
          <ListItem>...Loading</ListItem>
        ) : (
          isOpen &&
          inputItems.map((item, index) => (
            <ListItem
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {itemToString(item)}
            </ListItem>
          ))
        )}
      </UnorderedList>
    </div>
  );
}
