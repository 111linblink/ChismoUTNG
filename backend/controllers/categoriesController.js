const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send(category);
  } catch (error) {
    console.error(`Error al crear categoría: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.createAnswer = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(`Error al obtener categorías: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json(category);
  } catch (error) {
    console.error(`Error al obtener categoría: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json(category);
  } catch (error) {
    console.error(`Error al actualizar categoría: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json({ msg: 'Categoría eliminada' });
  } catch (error) {
    console.error(`Error al eliminar categoría: ${error.message}`);
    res.status(500).send('Error en el servidor');
  }
};
