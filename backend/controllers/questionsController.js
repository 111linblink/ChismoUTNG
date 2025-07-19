const Question = require("../models/question");

exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.json(question);
  } catch (error) {
    console.error(`Error al crear pregunta: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('category', 'name');
    res.json(questions);
  } catch (error) {
    console.error(`Error al obtener preguntas: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('category', 'name');
    if (!question) return res.status(404).json({ msg: 'Pregunta no encontrada' });
    res.json(question);
  } catch (error) {
    console.error(`Error al obtener pregunta: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ msg: 'Pregunta no encontrada' });
    res.json(question);
  } catch (error) {
    console.error(`Error al actualizar pregunta: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ msg: 'Pregunta no encontrada' });
    res.json({ msg: 'Pregunta eliminada' });
  } catch (error) {
    console.error(`Error al eliminar pregunta: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};
