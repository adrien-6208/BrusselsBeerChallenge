import { useQuery, gql } from '@apollo/client';

const GET_BREWERIES = gql`
  query GetBreweries {
    allBreweries {
      id
      name
    }
  }
`;

const Breweries = props => {
  const { loading, error, data } = useQuery(GET_BREWERIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  const breweries = data.allBreweries.map(({ name, id }) => (
    <option key={id} value={id}>{name}</option>
  ));

  return (
    <select onChange={event => props.onChange(event.target.value)} prompt="Nom">
        <option value="all">Nom de la brasserie</option>
      {breweries}
    </select>
  )   
}

export default Breweries;