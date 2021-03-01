import { useQuery, gql } from '@apollo/client';

const GET_BREWERIES = gql`
  query GetBreweries {
    allBreweries {
      name
      phone
      email
      address
      country
      website
    }
  }
`;

function Breweries() {
  const { loading, error, data } = useQuery(GET_BREWERIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  return data.allBreweries.map(({ name, phone, email, address, country, website }) => (
    <div>
      <h2>{name}</h2>
      <ul>
          <li>Téléphone : {phone}</li>
          <li>Email : {email}</li>
          <li>Adresse : {address}</li>
          <li>Pays : {country}</li>
          <li>Site web : {website}</li>
      </ul>
    </div>
  ));
}

export default Breweries;