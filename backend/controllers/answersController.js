const Answer = require("../models/Answers");

exports.createAnswer = async (req, res) => {
  try {
    const answers = req.body;
    console.log("Datos recibidos:", answers);

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ msg: 'Debe enviar un arreglo con respuestas' });
    }

    const savedAnswers = await Answer.insertMany(answers);
    console.log(`Se guardaron ${savedAnswers.length} respuestas`);
    res.status(201).json(savedAnswers);
  } catch (error) {
    console.error(`Error al crear respuestas: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};


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

  exports.getGroupedAnswersByCategory = async (req, res) => {
    try {
      const categoryId = parseInt(req.query.category); 

      if (!categoryId) {
        return res.status(400).json({ msg: 'Debe enviar el ID de la categoría' });
      }

    const allAnswers = await Answer.find({ question_id: { $gte: (categoryId - 1) * 10 + 1, $lte: categoryId * 10 }});

      const grouped = {};

      for (const ans of allAnswers) {
        const key = `${ans.user_name}-${ans.user_group}`;
        if (!grouped[key]) {
          grouped[key] = {
            user_name: ans.user_name,
            user_group: ans.user_group,
            created_at: ans.created_at,
            answers: {}
          };
        }

        grouped[key].answers[ans.question_id] = ans.answer;
      }

      const result = Object.values(grouped);
      console.log(`Respuestas agrupadas por categoría ${categoryId}: ${result.length} personas`);
      res.json(result);
    } catch (error) {
      console.error(`Error al agrupar respuestas por categoría: ${error.message}`);
      res.status(500).send('Error en el servidor');
    }
  };


