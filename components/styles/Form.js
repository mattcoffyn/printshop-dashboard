import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  h2 {
    font-weight: var(--font-weight-2);
  }
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  button {
    background: var(--success--base);
    border-radius: 5px;
    font-weight: var(--font-weight-4);
    box-shadow: var(--shadow-1);
    transition: all 0.2s;
    &:hover {
      background: var(--success--darker);
      /* box-shadow: var(--inner-shadow-1); */
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    /* &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    } */
  }
`;

export default Form;
