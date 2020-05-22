const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {},
});

server.listen().then(({ url }) => console.log(`listening on port ${url}`));
