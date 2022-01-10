import styled, { keyframes } from 'styled-components';

const loadingFlash = keyframes`
  0% {
      background-position: -400px;
  }

  85% {
      background-position: calc(100% + 400px);
  }
  100% {
      background-position: calc(100% + 400px);
  }
`;

const Skeleton = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--ui-card-border--light);
  border-radius: 5px;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(
      90deg,
      var(--ui-card-border--light) 0px,
      var(--ui-card--light) calc(50% - 35px),
      var(--ui-card--light) calc(50% + 35px),
      var(--ui-card-border--light) 100%
    );
    background-size: 35%;
    background-position: 0%;
    background-repeat: no-repeat;
    animation: ${loadingFlash} 2.5s infinite linear;
  }
`;

export default Skeleton;
