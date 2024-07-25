# Book Search Engine Starter Code

## user story

## Requirements

The requirements for this project were to upgrade an existing authentication using routes to one that is used with graphql.

## GraphQL Environment Back End

graphql requires the installation of a graphql server using Appolo Servier. This is located in server.js. Along with this, predefined typeDefs and resolvers are imported for use with GraphQl.
An Apollo server is started. There is a configuration in vite required for proxy requests to graphql also. This ensures no CORS issues.
GraphQL request are handled by resolvers which allow for queries and muations on the Mongoose Models, and these are defined in the resolvers.

## GraphQL Environment Back End

On the front end, we can rely on some of the same functions as previous requests, but mainly we are moving requests to the back end into the useQuery and useMutation hooks that are present in react's environment. This is done in the respective compnents and pages.
In this project an Auth service is defined and imported to handle authentication tasks.
When a user logs in, the Auth services login is called which writes the token to local storage and resets the route to the home page.
In the login component a similar process creates a newUserAuth which provides us a token which is then sent to the existing Auth service to store in local storage with `Auth.login(newUserAuth.data.loginUser.token);`

In both the SearchBooks and SavedBooks, there are mutations defined that provide the connection to the back end. With graphql, we make use of utils/ called mutation.js and query.js

These are made use of in the hooks in each component. For example SearchBooks has an ADD_BOOK mutation. SavedBooks makes use of a mutation which removes a book from a users list.

## Challentes

It was a challenge to get a grasp of the movement between front and back end to see what is being sent what is being recieved and how to know what each method, funciton or resolver is recieving and expecting.

The network tooks came in handy for this.

SOme of the error messages in react made it difficult to know what was wrong and it was quite frustrating sometimes not knowing how to fix it.
