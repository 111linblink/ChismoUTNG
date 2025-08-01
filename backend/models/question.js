const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  category_id: {
    type: Number,
    ref: 'Category',
    required: true
  },
   created_at: {
     type: Date,
     default: Date.now
   },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
