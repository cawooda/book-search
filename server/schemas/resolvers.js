const { User } = require("../models");

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().sort({ _id });
    },
    getUser: async (parent, { _id }) => {
      return User.findById();
    },
    getMe: async (parent, { _id }) => {
      return User.findById(_id);
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });

        const token = await user.createToken();
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    loginUser: async (parent, { username, email, password }) => {
      if (!username && !email) {
        //check if either are provided and throw error
        throw new Error("Please provide a username or email");
      }

      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      }); //try to find user
      if (user.isCorrectPassword(password)) {
        //check their password before initiating a token for them
        const token = await user.createToken();
      }

      return user || "error";
    },
    addBook: async (
      parent,
      { userId, bookauthors, description, bookId, image, link, title }
    ) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            savedBooks: {
              bookauthors,
              description,
              bookId,
              image,
              link,
              title,
            },
          },
        },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },
    removeBook: async (parent, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId } } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
