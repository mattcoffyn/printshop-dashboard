import React from 'react';
import styled from 'styled-components';
import Skeleton from '../components/reusable/Skeleton';

const ThemeTest = styled.div`
  height: 100px;
  width: 100px;
  background: ${({ theme }) => theme.body};
`;

const SampleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SampleSwatch = styled.div`
  width: 60px;
  height: 60px;
  background: var(--${(props) => props.test});
`;

const ThemePage = () => (
  <>
    <div style={{ padding: '5rem', display: 'flex' }}>
      <SampleContainer>
        <span>Success</span>
        <SampleSwatch test="success--base" />
        <SampleSwatch test="success--darker" />
        <SampleSwatch test="success--darkest" />
      </SampleContainer>
      <SampleContainer>
        <span>Info</span>
        <SampleSwatch test="info--base" />
        <SampleSwatch test="info--darker" />
        <SampleSwatch test="info--darkest" />
      </SampleContainer>
      <SampleContainer>
        <span>Danger</span>
        <SampleSwatch test="danger--base" />
        <SampleSwatch test="danger--darker" />
        <SampleSwatch test="danger--darkest" />
      </SampleContainer>
      <ThemeTest />
    </div>
    <Skeleton />
  </>
);

export default ThemePage;
