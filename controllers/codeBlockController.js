const CodeBlock = require('../models/CodeBlock.js');

const getCodeBlocks = async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.status(200).json(codeBlocks);
  } catch (error) {
    console.error('Error retrieving code blocks:', error);
    next(error);
  }
};

const updateCode = async (req, res) => {
  try {
    const { codeBlockId, newCode } = req.body;
    console.log('Updating code:', codeBlockId);
    await CodeBlock.findByIdAndUpdate(codeBlockId, { code: newCode });
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating code:', error);
    next(error);
  }
};

module.exports = {
  getCodeBlocks,
  updateCode
};
