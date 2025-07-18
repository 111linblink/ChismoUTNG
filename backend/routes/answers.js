//Rutas para Answers
const express = require('express');
const router = express.Router();
const AnswersController = require('../controllers/answersController');

//Rutas para Answers
router.get('/', AnswersController.getAnswer);
router.put('/:id', AnswersController.updateAnswer);
router.get('/:id', AnswersController.getAnswerById);
router.delete('/:id', AnswersController.deleteAnswer);
router.post('/', AnswersController.createAnswer);


module.exports = router;