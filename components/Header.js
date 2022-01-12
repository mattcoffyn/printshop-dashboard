import { useState } from 'react';
import styled from 'styled-components';
import { FiSliders, FiUser } from 'react-icons/fi';
import UserDropdown from './UserDropdown';
import SettingsDropdown from './SettingsDropdown';
import { DropdownSettingsButton, DropdownUserButton } from './Buttons';
import { useUser } from '../lib/useUser';

const HeaderStyles = styled.nav`
  position: fixed;
  display: flex;
  left: var(--sideNaveWidth);
  height: var(--headerHeight);
  width: calc(100% - var(--sideNavWidth));
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  margin-bottom: 3rem;
  margin-left: var(--sideNavWidth);
  justify-content: space-between;
  background: ${({ theme }) => theme.body};
  z-index: 100;
`;

const HeaderLeft = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 0 1rem;
  span {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
    font-size: 1.75rem;
    strong {
      color: ${({ theme }) => theme.textTertiary};
      font-size: 1.25rem;
    }
  }
`;

const HeaderRight = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  z-index: 100;
  padding-right: 0.5rem;
  li {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .header-icon {
    height: 2.5rem;
    width: 2.5rem;
    stroke-width: 1;
    margin-right: 1rem;
    cursor: pointer;
    &:hover {
      stroke: ${({ theme }) => theme.textSecondary};
    }
  }
  .dm-toggle {
    margin-right: 1rem;
  }
`;

export const Header = ({ theme, themeToggler }) => {
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const user = useUser();
  const isLoggedIn = !!user;

  function handleSettingsOpen(e) {
    const { id } = e.currentTarget;
    if (id === 'settings') {
      setSettingsDropdown(!settingsDropdown);
    }
    if (id === 'user') {
      setUserDropdown(!userDropdown);
    }
  }

  return (
    <HeaderStyles>
      <HeaderLeft>
        <span>
          Print Shop <strong>v0.2.1</strong>
        </span>
      </HeaderLeft>
      <HeaderRight>
        <li>
          <DropdownSettingsButton
            id="settings"
            onClick={(e) => handleSettingsOpen(e)}
          >
            <FiSliders />
          </DropdownSettingsButton>
        </li>
        <li>
          <DropdownUserButton
            // disabled={dropdowns.user}
            isLoggedIn={isLoggedIn}
            id="user"
            onClick={(e) => handleSettingsOpen(e)}
          >
            <FiUser />
            <span>{isLoggedIn ? user.name : `Log In`}</span>
          </DropdownUserButton>
        </li>
      </HeaderRight>
      <SettingsDropdown
        isOpen={settingsDropdown}
        setIsOpen={setSettingsDropdown}
        themeToggler={themeToggler}
        theme={theme}
      />
      <UserDropdown
        isOpen={userDropdown}
        setIsOpen={setUserDropdown}
        themeToggler={themeToggler}
        theme={theme}
      />
    </HeaderStyles>
  );
};
