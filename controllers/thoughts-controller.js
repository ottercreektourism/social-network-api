// Require Thoughts and Users Models
const { Thoughts, Users } = require('../models');

const thoughtsController = {
    // Add new thought
    addThought({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    // TODO: Do we need to run validators?
                    { new: true, runValidators: true }
                ).then(thoughts => {
                    if(!thoughts) {
                        return res.status(404).json({ message: "not added" });
                    }
                    return res.json(thoughts);
                })
            })
    },


    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },


    // Get thought by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ thoughtId })
    },

    // Update thought by id
    updateThoughtById({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            // TODO: needs body too?
            { new: true, runValidators: true }
        )
            // TODO: needs .select('-__v')?
            .then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thought with that ID' })
                }
                return res.json(thoughts);
            })
    },

    // Delete thought by id
    deleteThoughtById({ params }, res) {
        Thoughts.findOneAndRemove({ _id: params.thoughtId })
            .then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: "no thought found" });
                }
                return Users.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    // TODO: needs validators?
                    { new: true }
                )
            }).then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: "not deleted" });
                }
                return res.json({ message: "successfully deleted" });
            })
    },

    // Add reaction
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
    deleteReaction({ params }, res) {
        Thoughts.findOneAndDelete(
            { _id: params.thoughtId },
            // TODO: should it be body or params since this is delete?
            // TODO: maybe make something with a reactionsId
            { $pull: { reactions: body } },
            // TODO: make sure this is true, not sure since I'm not adding a new thing to this
            { new: true }
        ).then((thoughts) => {
            if (!thoughts) {
                return res.status(404).json({ message: "no thoughts with that ID" })
            }
            return res.json(thoughts);
        })
    }
}

module.exports = thoughtsController
