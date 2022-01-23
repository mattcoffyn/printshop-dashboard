import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../lib/useUser';
import { ButtonSecondary } from './reusable/Buttons';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const SignOutButton = ({ children }) => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <ButtonSecondary type="button" onClick={signout}>
      {children || 'Sign Out'}
    </ButtonSecondary>
  );
};

export const SignOutUnstyled = ({ setIsOpen, children }) => {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleSignout() {
    setIsOpen(false);
    signout();
  }

  return (
    <button className="signout-basic" type="button" onClick={handleSignout}>
      {children || 'Sign Out'}
    </button>
  );
};
