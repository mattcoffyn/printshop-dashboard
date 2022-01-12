import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import DropdownStyles from './styles/DropdownStyles';
import { useUser } from '../lib/useUser';

const UserDropdownStyles = styled(DropdownStyles)`
  right: 0rem;
  min-width: 200px;
`;

const UserDropdown = ({ isOpen, setIsOpen }) => {
  const ref = useRef();
  const user = useUser();
  const isLoggedIn = !!user;

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
      <span className="dropdown-header">Account</span>
      <ul />
    </UserDropdownStyles>
  );
};

UserDropdown.displayName = 'UserDropdown';

export default UserDropdown;
