require("@babel/register");
require("reflect-metadata");

const server = require("../src/utils/createApolloServer").default;

module.exports = async () => {
  global.httpServer = server;
  (await global.httpServer()).start();
};
