const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  solution: {
    type: String
  }
});

const CodeBlock = mongoose.model('codeBlock', codeBlockSchema);

module.exports = CodeBlock;
