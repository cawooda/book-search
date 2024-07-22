import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($username: String, $email: String, $password: String) {
    loginUser(username: $username, email: $email, password: $password) {
      _id
      token
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($userId: ID!, $bookId: ID!) {
    removeBook(userId: $userId, bookId: $bookId) {
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
