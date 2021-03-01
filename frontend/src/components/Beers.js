import { useQuery, gql } from '@apollo/client';

const GET_BEERS = gql`
  query GetBeers {
    allBeers {
      name
      alcohol
      brewery {
        name
      }
    }
  }
`;

function Beers() {
  const { loading, error, data } = useQuery(GET_BEERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  return data.allBeers.map((beer) => (
    <div>
      <p>
          {beer.name}: {beer.alcohol} - {beer.brewery.name}
      </p>
    </div>
  ));
}

export default Beers;