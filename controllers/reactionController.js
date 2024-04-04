const { Thought } = require('../models');

// Controller functions

const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to add reaction.' });
  }
};

const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
    await thought.save();
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete reaction.' });
  }
};

module.exports = {
  addReaction,
  deleteReaction
};
