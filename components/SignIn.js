/* eslint-disable react/jsx-no-bind */
import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from '../lib/useUser';
import DisplayError from './ErrorMessage';
import Form from '../styles/Form';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const SignIn = ({ setIsOpen }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    await signin();
    resetForm();
    if (setIsOpen) {
      setIsOpen(false);
    }
    // Send the email and password to the graphqlAPI
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Sign in.</h2>
      <DisplayError error={error}>
        <p>Please try again or contact your administrator.</p>
      </DisplayError>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="jane.smith@example.com"
          className="signin-input"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="my_c0ol_p4s5w0rd"
          autoComplete="password"
          className="signin-input"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit" className="signin-button">
          Sign in
        </button>
      </fieldset>
    </form>
  );
};
export default SignIn;
