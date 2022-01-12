import styled from 'styled-components';

const DropdownStyles = styled.div`
  position: absolute;
  min-height: 300px;
  min-width: 300px;
  background: ${({ theme }) => theme.card};
  /* border: 1px solid ${({ theme }) => theme.cardBorder}; */
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  top: calc(5rem);
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transform: ${(props) => (props.isOpen ? `scale(1,1)` : `scale(0.9)`)};
  transform-origin: top;
  margin: 0;
  z-index: 1;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out,
    visibility 0.1s ease-in-out;
  .dropdown-header {
    padding: 1rem;
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 200;
    font-size: 2rem;
  }
  ul {
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      padding: 1rem 2rem;
      border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
      span {
        color: ${({ theme }) => theme.textSecondary};
        margin-right: auto;
        font-weight: 300;
      }
    }
  }
`;

export default DropdownStyles;
