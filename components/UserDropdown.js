import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMoon } from 'react-icons/fi';
import { ToggleSwitch } from './reusable/Toggle';
import DropdownStyles from './styles/DropdownStyles';

const UserDropdownStyles = styled(DropdownStyles)`
  right: 0rem;
`;

const UserDropdown = ({ isOpen, setIsOpen, themeToggler, theme }) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.closest('button')?.name === 'user-button'
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, setIsOpen]);

  return (
    <UserDropdownStyles isOpen={isOpen} ref={ref}>
      <span className="settings-dropdown-header">Settings</span>
      <ul>
        <li className="dm-toggle">
          <span>Theme</span>
          <ToggleSwitch toggleSomething={themeToggler} state={theme}>
            <FiMoon />
          </ToggleSwitch>
        </li>
      </ul>
    </UserDropdownStyles>
  );
};

UserDropdown.displayName = 'UserDropdown';

export default UserDropdown;
