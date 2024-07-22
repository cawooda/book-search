import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { getSavedBookIds, removeBookId } from "../utils/localStorage";

import { useMutation } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const SavedBooks = () => {
  const [userData, setUserData] = useState({ savedBooks: [] });

  const [
    removeBook,
    { loading: mutationLoading, data: mutationData, error: mutationError },
  ] = useMutation(REMOVE_BOOK, {
    onError: (err) => {
      console.error("GraphQL Error:", err.graphQLErrors);
      console.error("Network Error:", err.networkError);
      console.error("Message:", err.message);
    },
  });
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const userId = Auth.getProfile().authenticatedPerson._id;

  const {
    loading: queryLoading,
    data: queryData,
    error: queryError,
  } = useQuery(QUERY_ME, { variables: { id: userId } });

  useEffect(() => {
    if (!queryLoading && !queryError && queryData) {
      getSavedBookIds();
      setUserData(queryData.getMe);
    }
  }, [queryData, queryLoading, queryError, userData]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const userId = Auth.getProfile().authenticatedUser._id;
    if (!token) {
      return false;
    }
    const { data } = await removeBook({
      variables: {
        userId,
        bookId,
      },
    });

    await removeBookId(bookId);

    setUserData((prevUserData) => ({
      ...prevUserData,
      savedBooks: prevUserData.savedBooks.filter((book) => {
        book.bookId == bookId;
      }),
    }));
  };

  // if data isn't here yet, say so
  if (queryLoading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks?.length} saved ${
                userData.savedBooks?.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
