import styled from 'styled-components';
import { FiCoffee } from 'react-icons/fi';
import { IoShirtSharp } from 'react-icons/io5';

const SideNavStyles = styled.nav`
  position: fixed;
  left: 0;
  width: var(--sideNavWidth);
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.body};
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    padding-top: 1.2rem;
    li {
      svg {
        height: 2.5rem;
        width: 2.5rem;
        stroke-width: 1;
      }
    }
  }
`;

const Logo = styled(IoShirtSharp)`
  fill: var(--success--base);
  height: 3rem !important;
  width: 3rem !important;
`;

export const SideNav = () => (
  <SideNavStyles>
    <ul>
      <li>
        <Logo />
      </li>
      <li>
        <FiCoffee />
      </li>
      <li>
        <FiCoffee />
      </li>
      <li>
        <FiCoffee />
      </li>
    </ul>
  </SideNavStyles>
);
