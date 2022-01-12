import styled from 'styled-components';
import LoginForm from './LoginForm';
import { Card } from './reusable/Card';

const LoginComponent = styled.div`
  --op-gradient-direction: to top left;
  width: 100%;
  min-height: calc(100vh - var(--headerHeight));
  padding: 3rem;
  h1 {
    font-size: calc(var(--font-size-8));
    font-weight: var(--font-weight-3);
  }
  form {
    padding: 2rem 5rem;
    width: 500px;
    input {
      height: 4rem;
      border-radius: 5px;
    }
  }
`;

const Login = () => (
  <LoginComponent>
    <h1>Welcome to Print Shop.</h1>
    <Card>
      <LoginForm />
    </Card>
  </LoginComponent>
);

export default Login;
