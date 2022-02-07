import { gql, useQuery } from '@apollo/client';
import {
  color,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const GET_ALL_PROCESS_OPTIONS = gql`
  query GET_ALL_PROCESS_OPTIONS {
    filmTypes {
      id
      name
      description
      isSingle
      isSlide
      scanOnlyCost
    }
    filmColours {
      id
      name
      description
      developCost
    }
    scanResolutions {
      id
      name
      description
      scanCost
      scanOnlyCost
      singleFrameCost
    }
  }
`;

const Search = dynamic(() => import('../../../components/CustomerSearch'), {
  ssr: false,
});

const NewOrder = () => {
  const { data, loading, error } = useQuery(GET_ALL_PROCESS_OPTIONS);

  function handleSubmit() {
    console.log('test');
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Flex gridColumn={'1/19'}>
      <form onSubmit={handleSubmit}>
        <Search />
        <FormControl>
          <FormLabel htmlFor="film-colour">Film Colour</FormLabel>
          <Select id="film-colour" placeholder="Film Colour">
            {data.filmColours.map((colour) => (
              <option key={colour.id} value={colour.id}>
                {colour.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="film-type">Film Type</FormLabel>
          <Select id="film-type" placeholder="Film Type">
            {data.filmTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="scan-resolution">Scan Resolution</FormLabel>
          <Select id="scan-resolution" placeholder="Scan Resolution">
            {data.scanResolutions.map((resolution) => (
              <option key={resolution.id} value={resolution.id}>
                {resolution.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </form>
    </Flex>
  );
};

export default NewOrder;
