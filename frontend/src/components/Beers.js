import { useQuery, gql } from '@apollo/client';
import Beer from './Beer';

function Beers(idBrewery) {
  const GET_BEERS = gql`
    query GetBeers {
      allBeers {
        id
        name
        alcohol
        brewery {
          id
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BEERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  // TODO : retirer bootstrap-react
  // TODO : Ajouter le filtre medal et beer name
  // TODO : cogiter au multilingue
  // TODO : Ajouter les catégories de récompense
  // TODO : Ajouter le choix de trier par desc ou asc
  
  function filterByParams(beer, idBrewery, medal){
    return beer.brewery.id == idBrewery.idBrewery;
  }

  function sortBy(a, b) {
    if(a.name < b.name) {
      return -1;
    }
    return 1;
  }

  const beers = data.allBeers.filter((beer) => filterByParams(beer, idBrewery)).sort(sortBy).map( (filteredBeer)=>( 
    <Beer dataBeer={filteredBeer} />
  ));

  return (
    <div className="row">
      {beers}
    </div>
  );
}

export default Beers;