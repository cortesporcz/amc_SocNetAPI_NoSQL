const router = require('express').Router();
const userRoutes = require('./api-routes/userRoutes');
const thoughtRoutes = require('./api-routes/thoughtRoutes');
const reactionRoutes = require('./api-routes/reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;