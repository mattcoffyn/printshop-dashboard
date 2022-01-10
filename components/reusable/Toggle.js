import { useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 1rem;
  }
`;

const Switch = styled.div`
  position: relative;
  width: 4rem;
  height: 2rem;
  background: ${({ theme }) => theme.textTertiary};
  border-radius: 1rem;
  padding: 0.2rem;
  transition: 300ms all;

  &:before {
    content: '';
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 1rem;
    top: 50%;
    /* left: 4px; */
    background: white;
    transform: translate(0, -50%);
    transition: 300ms all;
  }
`;

const Input = styled.input`
  display: none;
  &:checked + ${Switch} {
    background: var(--success--base);
    &:before {
      transform: translate(2rem, -50%);
    }
  }
`;

export const ToggleSwitch = ({ toggleSomething, state, children }) => {
  const [checked, setChecked] = useState(state === 'dark');

  const handleChange = (e) => {
    setChecked(e.target.checked);
    toggleSomething();
  };
  return (
    <Label>
      {children}
      <Input checked={checked} type="checkbox" onChange={handleChange} />{' '}
      <Switch />
    </Label>
  );
};
