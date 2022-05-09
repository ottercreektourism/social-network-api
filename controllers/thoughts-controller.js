// Require Thoughts and Users Models
const { Thoughts, Users } = require('../models');

const thoughtsController = {

    // Add new thought
    //POST /api/thoughts
    addThought({ body }, res) {
        Thoughts.create(body)
            .then(thoughts => {
                console.log(body.userId);
                return Users.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughts._id } },
                    { new: true }
                )
                    .then(thoughts => {
                        if (!thoughts) {
                            res.status(404).json({ message: 'No user found with this id' });
                            return;
                        }
                        return res.json(thoughts);
                    })
            })
    },


    // Get all thoughts
    // GET /api/thoughts
    // TODO: 500 internal server error
    getThoughts(req, res) {
        Thoughts.find({})
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },


    // Get thought by id
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
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: "no thought found" });
                    return;
                }
                Users.findOneAndUpdate(
                    // TODO: trying to delete the thought from the user's thought array too. which of these lines do I use?
                    { thoughts: params.thoughtId },
                    // { username: thoughts.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true, runValidators: true }
                ).then(() => res.json({ message: 'Successfully deleted the thought' }))
                .catch((err) => res.status(500).json(err));
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
    // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
    // TODO: when I delete a reaction, it deletes all reactions to that thought
    deleteReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        ).then((thoughts) => {
            if (!thoughts) {
                return res.status(404).json({ message: "no thoughts with that ID" })
            }
            return res.json(thoughts);
        })
    },

}

module.exports = thoughtsController
