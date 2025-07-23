//Rutas para Answers
const express = require('express');
const router = express.Router();
const AnswersController = require('../controllers/answersController');

//Rutas para Answers
router.get('/grouped-by-category', AnswersController.getGroupedAnswersByCategory);
router.get('/', AnswersController.getAnswer);
router.post('/', AnswersController.createAnswer);
router.put('/:id', AnswersController.updateAnswer);
router.get('/:id', AnswersController.getAnswerById);
router.delete('/:id', AnswersController.deleteAnswer);

module.exports = router;