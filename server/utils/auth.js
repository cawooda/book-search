require("dotenv").config();
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = process.env.SECRET;

const expiration = "2h";

// function for our authenticated routes
module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  authMiddleware: function ({ req }) {
    console.log(req.query.token);
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { authenticatedPerson } = jwt.verify(token, secret, {
        maxAge: expiration,
      });
      req.user = authenticatedPerson;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { email, username, _id };

    return jwt.sign({ authenticatedPerson: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
