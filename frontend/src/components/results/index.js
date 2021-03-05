import { useQuery, gql } from "@apollo/client";
import Image from './image-1.jpg';

function Result() {
  
  const GET_CATEGORIES = gql`
    query GetCategories($language: String) {
      allCategories {
        id
        visible
        translation(where: { language: $language }) {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CATEGORIES, {
    variables: { $language: "fr" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;
  
  
  
  
  return (
    <div className="container">
      <h1 className="text-center m-5">Résultats par catégorie de 2020</h1>
      <div className="row">
        {data.allCategories.map((category) => (
          <div className="col-md-4 pb-2 pt-2" key={category.id}>
            <div className="card">
              <img className="card-img-top" src={Image} alt="Card" />
              <a href={`/result/${category.id}`} className="stretched-link"> </a>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p className="card-text text-center"><strong>{category.translation[0].name}</strong></p>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
