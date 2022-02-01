import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SignInPageComponent from '../components/SignInPageComponent';
import { useUser } from '../context/user';
import BaseLayout from '../components/layouts/BaseLayout';

const Login = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <>
      <SignInPageComponent />
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Login;
