import { useQuery, gql } from "@apollo/client";

export default function Beers(params) {
  const GET_BEERS = gql`
    query GetBeers($language: String) {
      allBeers {
        id
        alcohol
        brewery {
          id
          translation(where: { language: $language }) {
            name
          }
        }
        medal {
          id
        }
        translation(where: { language: $language }) {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_BEERS, {
    variables: { $language: "fr" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  function filterByParams(beer, params) {
    if (params.idBrewery !== "all") {
      if (beer.brewery.id !== params.idBrewery) {
        return false;
      }
    }

    if (params.idMedal !== "all") {
      if (beer.medal.id !== params.idMedal) {
        return false;
      }
    }

    if (params.nameBeer !== "") {
      if (!beer.translation[0].name.toLowerCase().includes(params.nameBeer)) {
        return false;
      }
    }

    return true;
  }

  function sortBy(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  }

  return (
    <div className="row">
      {data.allBeers.filter((beer) => filterByParams(beer, params)).sort(sortBy).map((filteredBeer) => (
          <div className="col-md-4 pb-2 pt-2" key={filteredBeer.id}>
            <div className="card">
              <a href={`/beer/${filteredBeer.id}`} className="stretched-link"> </a>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{filteredBeer.translation[0].name}</p>
                  <footer className="blockquote-footer">
                    {filteredBeer.alcohol}% -{" "}
                    <cite title="Source Title">
                      {filteredBeer.brewery.translation[0].name}
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}