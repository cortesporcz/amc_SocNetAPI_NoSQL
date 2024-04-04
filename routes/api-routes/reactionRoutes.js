const router = require('express').Router();
const {
  addReaction,
  deleteReaction
} = require('../../controllers/reactionController');

router.route('/')
  .post(addReaction);

router.route('/:reactionId')
  .delete(deleteReaction);

module.exports = router;
