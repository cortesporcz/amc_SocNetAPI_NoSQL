const { Thought, User } = require('../models');

// Controller functions

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get thoughts.' });
  }
};

const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get thought.' });
  }
};

const createThought = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const thought = await Thought.create(req.body);
    user.thoughts.push(thought._id);
    await user.save();
    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create thought.' });
  }
};

const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update thought.' });
  }
};

const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to delete thought.' });
  }
};

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
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
};
