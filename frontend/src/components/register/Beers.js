import { useQuery, gql } from '@apollo/client';
import Beer from './Beer';

function Beers(params) {
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
        medal {
          id
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BEERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  // TODO : cogiter au multilingue
  // TODO : Ajouter les catégories de récompense
  // TODO : Ajouter le choix de trier par desc ou asc
  
  function filterByParams(beer, params){
    if(params.idBrewery != 'all') {
      if(beer.brewery.id != params.idBrewery) {
        return false;
      }
    }
    
    if(params.idMedal != 'all') {
      if(beer.medal.id != params.idMedal) {
        return false;
      }
    }

    if(params.nameBeer != '') {
      if(!beer.name.toLowerCase().includes(params.nameBeer)) {
        return false;
      }
    }

    return true;
  }

  function sortBy(a, b) {
    if(a.name < b.name) {
      return -1;
    }
    return 1;
  }

  const beers = data.allBeers.filter((beer) => filterByParams(beer, params)).sort(sortBy).map( (filteredBeer)=>( 
    <Beer dataBeer={filteredBeer} />
  ));

  return (
    <div className="row">
      {beers}
    </div>
  );
}

export default Beers;