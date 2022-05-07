const router = require('express').Router();

// Require all of the routes from the thoughts controller
const {
    addThought,
    getThoughts,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);


module.exports = router;