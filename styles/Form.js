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
  padding: 2rem;
  h2 {
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-2);
    line-height: var(--font-lineheight-3);
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 2rem;
  }
  label {
    display: block;
    margin-bottom: 1rem;
    font-size: var(--font-size-4);
    font-weight: var(--font-weight-2);
    letter-spacing: var(--font-letterspacing-2);
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 2rem;
    border: 2px solid ${({ theme }) => theme.cardBorder};
    &:focus {
      outline: 0;
      border-color: var(--success--base);
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
  .signin-input {
    min-height: 4rem;
    border-radius: 5px;
    font-size: 1.5rem;
  }
  .signin-button {
    margin: 1rem 0;
    background: var(--success--base);
    border-radius: 5px;
    font-weight: var(--font-weight-4);
    box-shadow: var(--shadow-1);
    transition: all 0.2s;
    &:hover {
      background: var(--success--darker);
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
