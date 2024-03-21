const express = require('express');
const { check } = require('express-validator');
const tasksController = require('../controllers/tasks-controller');
const router = express.Router();

// Middleware pour obtenir toutes les tâches
router.get('/', tasksController.getTasks);

router.get('/:tid', tasksController.getTasksById);

router.get('/user/:uid', tasksController.getTasksByUserId);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 10 }),
    check('dueDate').not().isEmpty(),
  ],
  tasksController.createTask
);

router.patch('/:tid', tasksController.updateTask);

router.delete('/:tid', tasksController.deleteTask);

module.exports = router;
