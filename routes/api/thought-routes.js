const router = require('express').Router();

// TODO: require all of the routes from the thoughts controller

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThoughtById);

module.exports = router;