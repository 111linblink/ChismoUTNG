const Answer = require("../models/Answers");

exports.createAnswer = async (req, res) => {
  try {
    let answer;
    answer = new Answer(req.body);
    await answer.save();
    console.log(`Answer creado - ID: ${answer._id}`);
    res.send(answer);
  } catch (error) {
    console.error(`Error al crear answer: ${error.message}`);
    res.status(500).send('Error en el server');
  }
}

exports.getAnswer = async (req, res) => {
  try {
    const answers = await Answer.find({});
    console.log(`Consulta de answer - Total: ${answers.length}`);
    res.json(answers);
  } catch (error) {
    console.error(`Error al obtener answer: ${error.message}`);
    res.status(500).send('Error en el server');
  }
}

exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findByIdAndUpdate(id, req.body, { new: true });

    if (!answer) {
      console.warn(`Intento de actualizar answer no existente - ID: ${id}`);
      return res.status(404).json({ msg: 'No se encontró el answer' });
    }
    console.log(`Answer actualizado - ID: ${id}`);
    res.send(answer);
  } catch (error) {
    console.error(`Error al actualizar answer: ${error.message}`);
    res.status(500).send('Error en el server');
  }
}

exports.getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) {
      console.warn(`Answer no encontrado - ID: ${id}`);
      return res.status(404).json({ msg: 'No se encontró el Answer' });
    }

    console.log(`Consulta de Answer por ID: ${id}`);
    res.send(answer);
  } catch (error) {
    console.error(`Error al obtener answer por ID: ${error.message}`);
    res.status(500).send('Error en el server');
  }
}

exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findByIdAndDelete(id);

    if (!answer) {
      console.warn(`Intento de eliminar Answer no existente - ID: ${id}`);
      return res.status(404).json({ msg: 'No se encontró el answer' });
    }

    console.log(`Answer eliminado - ID: ${id}`);
    res.send(answer);
  } catch (error) {
    console.error(`Error al eliminar answer: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};
