// Require Thoughts and Users Models
const { Thoughts, Users } = require('../models');

const thoughtsController = {

    // Add new thought
    // GET /api/thoughts
    addThought({ params, body }, res) {
        Thoughts.create(body)
        // TODO: unread value
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: params.thoughtId } },
                    { new: true, runValidators: true }
                ).then(thoughts => {
                    if (!thoughts) {
                        return res.status(404).json({ message: "not added" });
                    }
                    return res.json(thoughts);
                })
            })
    },


    // Get all thoughts
    // GET /api/thoughts
    getThoughts(req, res) {
        Thoughts.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },


    // TODO: Get thought by id
    // GET /api/thoughts/:thoughtId
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.thoughtId })
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },


    // Update thought by id
    // PUT /api/thoughts/:thoughtId
    updateThoughtById({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $set: body },
            { new: true, runValidators: true }
        ).then((thoughts) => {
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }
            return res.json(thoughts);
        })
    },


    // Delete thought by id
    // DELETE /api/thoughts/:thoughtId
    deleteThoughtById({ params }, res) {
        Thoughts.findOneAndRemove({ _id: params.thoughtId })
            .then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: "no thought found" });
                }
                return Users.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true, runValidators: true }
                )
            }).then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: "not deleted" });
                }
                return res.json({ message: "successfully deleted" });
            })
    },

    
    // Add reaction
    // POST /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        ).then((thoughts) => {
            if (!thoughts) {
                return res.status(404).json({ message: "not added" });
            }
            return res.json(thoughts);
        })
    },


    // Delete reaction by id
    // DELETE /api/thoughts/:thoughtId/reactions
    deleteReaction({ params }, res) {
        Thoughts.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        ).then((thoughts) => {
            if (!thoughts) {
                return res.status(404).json({ message: "no thoughts with that ID" })
            }
            return res.json(thoughts);
        })
    }
}

module.exports = thoughtsController
