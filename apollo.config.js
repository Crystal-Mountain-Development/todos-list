module.exports = {
  client: {
    includes: ["./queries/**/*.graphql"],
    service: {
      name: "todo-api",
      url: "http://localhost:4000/",
    },
  },
};
