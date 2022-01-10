import styled from 'styled-components';

const CardStyles = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
`;

export const Card = ({ children }) => (
  <CardStyles>
    <div>{children}</div>
  </CardStyles>
);
