import React from "react";
import {gql, useQuery}  from "@apollo/client"

const MESSAGE = gql`
  query DetailView($id: ID!) {
    message(id: $id) {
      message
      priority
      creationDate
      user {
        fullName
        email
      }
    }
  }
`;

const DetailView = (props) => {
  const queryOptions = {
      variables: {
        id: props.match.params.id,
      },
  };
  const { loading, error, data } = useQuery(MESSAGE, queryOptions);

  if (loading) return <p>Loading...</p>;
  if (error) {
      console.error(error);
      return <p>Error :(</p>;
}

  return (
    <div>
      <h1>Message {data.message.message}</h1>
      <h1>Created @ {data.message.creationDate}</h1>
      <h1>Owner {data.message.user.fullName}</h1>
    </div>
  );
};


export default DetailView;
