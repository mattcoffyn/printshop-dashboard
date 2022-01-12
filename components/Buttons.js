import React from 'react';
import styled from 'styled-components';

const PrimaryButtonStyles = styled.button`
  background: ${({ theme }) => theme.buttonPrimary};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 1rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ theme }) => theme.buttonPrimaryHover};
    color: ${({ theme }) => theme.textSecondary};
    border: 1px solid ${({ theme }) => theme.CardBorderHover};
  }
`;

const SecondaryButtonStyles = styled.button`
  background: ${({ theme }) => theme.buttonSecondary};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 1rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ theme }) => theme.buttonPrimaryHover};
    color: ${({ theme }) => theme.textSecondary};
    border: 1px solid ${({ theme }) => theme.CardBorderHover};
  }
`;

const TertiaryButtonStyles = styled.button`
  background: ${({ theme }) => theme.buttonTertiary};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 1rem 2rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ theme }) => theme.buttonTertiaryHover};
    color: ${({ theme }) => theme.textTertiary};
    border: 1px solid ${({ theme }) => theme.CardBorderHover};
  }
`;

const DropdownButtonStyles = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  svg {
    stroke: ${({ theme }) => theme.textPrimary};
    height: 2.5rem;
    width: 2.5rem;
    stroke-width: 1;
  }
  span {
    padding-left: 0.5rem;
  }
  &:hover {
    svg {
      stroke: ${({ theme }) => theme.textSecondary};
    }
  }
`;

const DropdownUserButtonStyles = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  svg {
    stroke: ${(props) =>
      props.isLoggedIn
        ? `var(--success--base)`
        : ({ theme }) => theme.textPrimary};
    height: 2.5rem;
    width: 2.5rem;
    stroke-width: 2;
  }
  span {
    padding-left: 0.5rem;
  }
  &:hover {
    svg {
      stroke: ${({ theme }) => theme.textSecondary};
    }
  }
`;

export const ButtonPrimary = ({ onClick, children }) => (
  <PrimaryButtonStyles typeof="button" onClick={onClick}>
    {children}
  </PrimaryButtonStyles>
);

export const ButtonSecondary = ({ onClick, children }) => (
  <SecondaryButtonStyles typeof="button" onClick={onClick}>
    {children}
  </SecondaryButtonStyles>
);

export const ButtonTertiary = ({ onClick, children }) => (
  <TertiaryButtonStyles typeof="button" onClick={onClick}>
    {children}
  </TertiaryButtonStyles>
);

export const DropdownSettingsButton = ({ id, onClick, children }) => (
  <DropdownButtonStyles
    name="settings-button"
    id={id}
    typeof="button"
    onClick={onClick}
  >
    {children}
  </DropdownButtonStyles>
);

export const DropdownUserButton = ({ id, onClick, isLoggedIn, children }) => (
  <DropdownUserButtonStyles
    name="user-button"
    id={id}
    typeof="button"
    onClick={onClick}
    isLoggedIn={isLoggedIn}
  >
    {children}
  </DropdownUserButtonStyles>
);
