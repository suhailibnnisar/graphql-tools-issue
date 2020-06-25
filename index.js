const path = require("path");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { GraphQLServer } = require("graphql-yoga");

const resolvers = require("./resolvers");

const typesArray = loadFilesSync(path.join(__dirname, "./graphql"));
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new GraphQLServer({
  schema,
});

server
  .start({
    post: 4000,
  })
  .then(() => {
    console.log("server is up and running!");
  })
  .catch((error) => {
    console.log("[Error] ", error);
  });
