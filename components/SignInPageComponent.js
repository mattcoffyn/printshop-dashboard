import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from '../lib/useUser';
import DisplayError from './ErrorMessage';

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

const SignInPageComponent = () => {
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
    e.preventDefault();
    await signin();

    // Send the email and password to the graphqlAPI
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Center p={2} gridColumn="4/10" d="flex" flexDir="column" gap={4}>
      <Text as="h1" fontSize="3xl">
        Sign in to view your dashboard.
      </Text>
      <Flex
        as="form"
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
        direction="column"
        gap={4}
      >
        <DisplayError error={error}>
          <p>Please try again or contact your administrator.</p>
        </DisplayError>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="jane.smith@example.com"
            className="signin-input"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="my_c0ol_p4s5w0rd"
            autoComplete="password"
            className="signin-input"
            value={inputs.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="green">
          Sign in
        </Button>
      </Flex>
    </Center>
  );
};

export default SignInPageComponent;
