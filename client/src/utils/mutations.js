import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation Mutation(
    $userId: ID!
    $bookId: ID!
    $title: String!
    $description: String!
    $image: String
    $link: String
  ) {
    addBook(
      userId: $userId
      bookId: $bookId
      title: $title
      description: $description
      image: $image
      link: $link
    ) {
      username
      savedBooks {
        bookId
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($userId: ID!, $bookId: ID!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;
