import { useQuery, gql } from '@apollo/client';

const GET_BREWERIES = gql`
  query GetBreweries($language : String) {
    allBreweries {
      id
      translation(where: {language: $language}) {
        name
      }
    }
  }
`;

const Breweries = props => {
  const { loading, error, data } = useQuery(GET_BREWERIES, {variables: {$language: 'fr'}}); // TODO : A CHANGER AVEC LA VARIABLE GLOBAL

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  const breweries = data.allBreweries.map((brewery) => (
    <option key={brewery.id} value={brewery.id}>{brewery.translation[0].name}</option>
  ));

  return (
    <select className="form-control mb-2" onChange={event => props.onChange(event.target.value)} prompt="Nom">
        <option value="all">Nom de la brasserie</option>
      {breweries}
    </select>
  )   
}

export default Breweries;