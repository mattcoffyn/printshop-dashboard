// import { useLazyQuery, gql } from '@apollo/client';
// import { resetIdCounter, useCombobox } from 'downshift';
// import debounce from 'lodash.debounce';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { DropDown, DropDownItem, SearchStyles } from '../styles/SearchStyles';

// const SEARCH_PRODUCTS_QUERY = gql`
//   query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
//     searchTerms: users(
//       where: {
//         OR: [
//           { name: { startsWith: $searchTerm, mode: insensitive } }
//           # { email: { startsWith: $searchTerm } }
//         ]
//       }
//     ) {
//       id
//       name
//       email
//     }
//   }
// `;

// export default function Search() {
//   const router = useRouter();
//   const [findItems, { loading, data, error }] = useLazyQuery(
//     SEARCH_PRODUCTS_QUERY,
//     {
//       fetchPolicy: 'no-cache',
//     }
//   );

//   const items = data?.searchTerms || [];
//   const findItemsButChill = debounce(findItems, 350);
//   resetIdCounter();
//   const {
//     isOpen,
//     inputValue,
//     getMenuProps,
//     getInputProps,
//     getComboboxProps,
//     getItemProps,
//     highlightedIndex,
//   } = useCombobox({
//     items,
//     onInputValueChange() {
//       findItemsButChill({
//         variables: {
//           searchTerm: inputValue,
//         },
//       });
//     },
//     onSelectedItemChange({ selectedItem }) {
//       router.push({
//         pathname: `/customers/${selectedItem.id}`,
//       });
//     },
//     itemToString: (item) => item?.name || '',
//   });

//   return (
//     <SearchStyles>
//       <div {...getComboboxProps()}>
//         <input
//           {...getInputProps({
//             type: 'search',
//             placeholder: 'Search...',
//             id: 'search',
//             className: loading ? 'loading' : null,
//           })}
//         />
//       </div>
//       <DropDown {...getMenuProps()}>
//         {isOpen &&
//           items.map((item, index) => (
//             <DropDownItem
//               {...getItemProps({ item, index })}
//               key={item.id}
//               highlighted={index === highlightedIndex}
//             >
//               {item.name}
//             </DropDownItem>
//           ))}
//         {isOpen && !items.length && !loading && (
//           <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
//         )}
//       </DropDown>
//     </SearchStyles>
//   );
// }
