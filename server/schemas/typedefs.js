const typeDefs = `
type bookSchema {
    authors:[String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Auth {
  _id: ID
  username: String
  token: String
}

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [bookSchema]
    token:String
  }

    input BookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
}

  type Query {
    getUsers: [User]!
    getUser(_id: ID!): User!
    getMe(_id:ID!):User!
  }
 type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(username:String, email: String, password: String ): Auth
    addBook(userId:ID!,bookId:ID!,authors:[String],title:String!,description:String!,image: String, link:String):User
    removeBook(userId:ID!,bookId:ID!):User
    
}

  
`;

module.exports = typeDefs;
