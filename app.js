const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const recipesRouter = require("./routes/api/recipes");
const ownRecipesRouter = require("./routes/api/ownRecipes");
const favoriteRouter = require("./routes/api/favorite");
const ingredientRouter = require("./routes/api/ingredients");
const shoppingListRouter = require("./routes/api/shopping-list");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/ownRecipes", ownRecipesRouter);
app.use("/favorite", favoriteRouter);
app.use("/ingredients", ingredientRouter);
app.use("/shoppinglist", shoppingListRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
