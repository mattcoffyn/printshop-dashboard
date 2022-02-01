import { useRouter } from 'next/router';
import SignInPageComponent from '../components/SignInPageComponent';
import { useUser } from '../context/user';

const Login = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <>
      <SignInPageComponent />
    </>
  );
};

export default Login;
