import { useRouter } from 'next/router';

const Customer = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Customer ID: {pid}</p>;
};

export default Customer;
