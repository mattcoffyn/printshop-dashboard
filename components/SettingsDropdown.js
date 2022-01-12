import { useRef, useEffect } from 'react';
import { FiMoon } from 'react-icons/fi';
import styled from 'styled-components';
import { ToggleSwitch } from './reusable/Toggle';
import DropdownStyles from './styles/DropdownStyles';

const SettingsDropdownStyles = styled(DropdownStyles)`
  right: 0rem;
`;

const SettingsDropdown = ({ isOpen, setIsOpen, themeToggler, theme }) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.closest('button')?.name === 'settings-button'
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
    <SettingsDropdownStyles isOpen={isOpen} ref={ref}>
      <span className="dropdown-header">Settings</span>
      <ul>
        <li className="dm-toggle">
          <span>Theme</span>
          <ToggleSwitch toggleSomething={themeToggler} state={theme}>
            <FiMoon />
          </ToggleSwitch>
        </li>
      </ul>
    </SettingsDropdownStyles>
  );
};

SettingsDropdown.displayName = 'SettingsDropdown';

export default SettingsDropdown;
