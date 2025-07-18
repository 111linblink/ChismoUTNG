const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  question_id: {
    type: Number, 
    required: true,
  },
  answer: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  user_group: {
    type: String,
    required: true
  },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
});

module.exports = mongoose.model('Answer', AnswerSchema);
