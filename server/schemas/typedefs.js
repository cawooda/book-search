const typeDefs = `
type bookSchema {
    authors:[String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [bookSchema]
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
    createUser(username: String!, email: String!, password: String!): User
    loginUser(username:String, email: String, password: String ): User
    addBook(userId:ID!,bookId:ID!,authors:[String],title:String!,description:String!,image: String, link:String):User
    removeBook(userId:ID!,bookId:ID!):User
    
}

  
`;

module.exports = typeDefs;
