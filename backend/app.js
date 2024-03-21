const express = require("express");
const tasksRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");
// Importer le gestionnaire d'erreurs
const errorHandler = require("./handler/error-handler");

const app = express();

//Parse le code entrant pour ajouter une propriété body sur la request
app.use((req, res, next) => {
  res.setHeader("access-Control-Allow-Origin", "*"); // header et value * quels domaines peuvent acceder a notre serveur
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); //quel header sont autorisés ( pourait etre * pour tout)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // quelles methodes HTTP sont autorisées
  next();
});

app.use(express.json());

app.use("/api/tasks", tasksRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Route non trouvée");
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000);
