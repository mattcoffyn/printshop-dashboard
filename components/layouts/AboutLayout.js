import styled from 'styled-components';
import { Header } from '../Header';

const InnerStyles = styled.main`
  width: 100%;
  /* max-width: var(--maxWidth); */
  padding: var(--headerHeight) 0 0;
  margin: 0 0 0 0;
  display: grid;
  gap: 1rem;
  --columns: 12;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));
  @media (max-width: 800px) {
    --columns: 1;
  }
`;

export default function AboutLayout({ children }) {
  return (
    <>
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
}
