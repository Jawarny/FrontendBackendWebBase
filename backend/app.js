const express = require('express');
const tasksRoutes = require('./routes/tasks-routes');
const usersRoutes = require('./routes/users-routes');
// Importer le gestionnaire d'erreurs
const errorHandler = require('./handler/error-handler');

const app = express();

//Parse le code entrant pour ajouter une propriété body sur la request
app.use(express.json());

app.use('/api/tasks', tasksRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);

app.listen(5000);
