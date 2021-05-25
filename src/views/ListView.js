import React from "react";
import { useQuery, gql } from "@apollo/client";
import {Link} from "react-router-dom";

const MESSAGES = gql`
  query {
    allMessages {
      id
      priority
      message
      user {
        username
        fullName
        isStaff
        email
        profile {
          profilePicture
          recentTime
        }
      }
    }
  }
`;

const ListView = () => {
  const { loading, error, data } = useQuery(MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Graphene Call</h2>
      {data &&
        data.allMessages.map((item) => (
          <div key={item.id}>
            <Link to={`/messages/${item.id}`}>
              <p>
                {item.id} - {item.message} - {item.user.fullName} - {item.priority}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ListView;