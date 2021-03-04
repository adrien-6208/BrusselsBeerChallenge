import { useQuery, gql } from '@apollo/client';

const GET_MEDALS = gql`
  query GetMedals($language : String) {
    allMedals {
      id
      translation(where: {language: $language}) {
        name
      }
    }
  }
`;

const Medals = props => {
  const { loading, error, data } = useQuery(GET_MEDALS, {variables: {$language: 'fr'}}); // TODO : A CHANGER AVEC LA VARIABLE GLOBAL

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  const medals = data.allMedals.map((medal) => (
    <option key={medal.id} value={medal.id}>{medal.translation[0].name}</option>
  ));

  return (
    <select className="form-control mb-2" onChange={event => props.onChange(event.target.value)} prompt="Nom">
        <option value="all">Prix</option>
      {medals}
    </select>
  )   
}

export default Medals;