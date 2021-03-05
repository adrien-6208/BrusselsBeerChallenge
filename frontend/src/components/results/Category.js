import { useQuery, gql } from "@apollo/client";

const Category = (props) => {
  const GET_CATEGORIES = gql`
    query GetCategories($language: String, $idCategory: ID!) {
      Category(where: { id: $idCategory }) {
        id
        translation(where: { language: $language }) {
          name
        }
        subcategory {
          id
          translation(where: { language: $language }) {
            name
          }
          beer {
            id
            alcohol
            bitterness
            bottle_content
            final_gravity
            original_gravity
            translation(where: { language: $language }) {
              name
            }
            brewery {
              translation(where: { language: $language }) {
                name
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { language: "fr", idCategory: props.match.params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;

  return (
    <div className="container">
      <div className="m-5">
        <h1 className="text-center">{data.Category.translation[0].name}</h1>
      </div>
      {data.Category.subcategory.map((subCategory) => (
        <div key={subCategory.id}>
          <div className="m-5">
            <h3 className="text-center">{subCategory.translation[0].name}</h3>
          </div>
          <div className="row">
            {subCategory.beer.map((beer) => (
              <div className="col-md-4" key={beer.id}>
                <div className="card" style={{width: "18rem"}}>
                  <a href={`/beer/${beer.id}`} className="stretched-link"> </a>
                  <div className="card-body">
                    <h5 className="card-title">{beer.translation[0].name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{beer.brewery.translation[0].name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
