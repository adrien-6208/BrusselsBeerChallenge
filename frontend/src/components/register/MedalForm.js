import { useQuery, gql } from '@apollo/client';

const GET_MEDALS = gql`
  query GetMedals {
    allMedals {
      id
      name
    }
  }
`;

const Medals = props => {
  const { loading, error, data } = useQuery(GET_MEDALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  const medals = data.allMedals.map(({ name, id }) => (
    <option key={id} value={id}>{name}</option>
  ));

  return (
    <select className="form-control mb-2" onChange={event => props.onChange(event.target.value)} prompt="Nom">
        <option value="all">Prix</option>
      {medals}
    </select>
  )   
}

export default Medals;