var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");
const connectDB = require("./config/database");
const schema = require("./graphql/schema");
const cors = require("cors");
var app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000;

// The root provides a resolver function for each API endpoint
var root = {
    hello() {
        return "Hello world!"
    },
}


app.use(express.json())
app.use(cors())

// Create and use the GraphQL handler.
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
        graphiql: false,
    })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
});

try {
    connectDB();
    app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))
    console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)
} catch (error) {
    console.error(error.message);
    process.exit(1);
}