import { gql, useMutation } from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY, useUser } from '../lib/useUser';

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

const LoginError = ({ error, children }) => {
  if (!error || !error?.message) return null;

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <Alert
        status="error"
        variant="left-accent"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        key={i}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Login Error
        </AlertTitle>
        <AlertDescription maxWidth="sm" data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </AlertDescription>
      </Alert>
    ));
  }

  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Login Error
      </AlertTitle>
      <AlertDescription maxWidth="sm" data-test="graphql-error">
        {error.message.replace('GraphQL error: ', '')}
        {children}
      </AlertDescription>
    </Alert>
  );
};

const SignInPageComponent = () => {
  const border = useColorModeValue('gray.300', 'gray.700');
  const user = useUser();
  const { inputs, handleChange } = useForm({
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
    <Container gridColumn="6/14">
      <Flex
        p={8}
        flexDir="column"
        mt={20}
        gap={4}
        borderColor={border}
        borderWidth={1}
        borderRadius="lg"
      >
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
          <LoginError error={error} user={user}>
            <p>Please try again or contact your administrator.</p>
          </LoginError>
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
          <Button
            type="submit"
            colorScheme="green"
            w="100%"
            maxW="10rem"
            mt={2}
            mx="auto"
          >
            Sign in
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SignInPageComponent;
