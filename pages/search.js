import dynamic from 'next/dynamic';

const Search = dynamic(() => import('../components/CustomerSearch'), {
  ssr: false,
});

const SearchPage = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default SearchPage;
