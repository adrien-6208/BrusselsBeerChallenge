import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";

const Beer = (props) => {
  const GET_BEER = gql`
    query GetBeer($id: ID!, $language: String) {
      Beer(where: { id: $id}) {
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

  const { loading, error, data } = useQuery(GET_BEER, {
    variables: { id: props.match.params.id, language: "fr" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error : {error.message}</pre>;
  if (!data) {
    return <Redirect to={{ pathname: "/404" }} />;
  }
  
  return <h1>{data.Beer.translation[0].name}</h1>;
};

export default Beer;