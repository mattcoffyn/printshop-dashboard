// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import styled from 'styled-components';

// const StyledNav = styled.nav`
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   div {
//     background: ${(props) => (props.isSelected === true ? 'red' : 'none')};
//     a {
//       text-decoration: none;
//       margin: 0 3rem -2px;
//       font-size: 1.5rem;
//     }
//   }
// `;

// const Tab = ({ href, isSelected, title }) => (
//   <div isSelected={isSelected}>
//     <Link replace href={href}>
//       {title}
//     </Link>
//   </div>
// );

// export default function AdminNav() {
//   const { query } = useRouter();

//   const isTabOneSelected = !!query.tabOne;
//   const isTabTwoSelected = !!query.tabTwo;
//   const isTabThreeSelected = !!query.tabThree;

//   return (
//     <StyledNav>
//       <Tab
//         href="/admin/?tabOne=true"
//         title="Tab One"
//         isSelected={isTabOneSelected}
//       />
//       <Tab
//         href="/admin/?tabTwo=true"
//         title="Tab Two"
//         isSelected={isTabTwoSelected}
//       />
//       <Tab
//         href="/admin/?tabThree=true"
//         title="Tab Three"
//         isSelected={isTabThreeSelected}
//       />
//     </StyledNav>
//   );
// }
