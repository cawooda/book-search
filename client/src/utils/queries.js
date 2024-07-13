import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Query($id: ID!) {
    getMe(_id: $id) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
