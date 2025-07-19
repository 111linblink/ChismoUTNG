const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questionsController');

router.post('/', QuestionsController.createQuestion);
router.get('/', QuestionsController.getQuestions);
router.get('/:id', QuestionsController.getQuestionById);
router.put('/:id', QuestionsController.updateQuestion);
router.delete('/:id', QuestionsController.deleteQuestion);

module.exports = router;
