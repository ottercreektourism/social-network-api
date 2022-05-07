const { Schema, model } = require('mongoose');

const ReactionSchema = require('./Reactions');
// TODO: make utils
const dateFormat = require('../utils/helpers');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // dateFormat will be imported
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// create a virtual property "reactionCount" as read action only. Gets the amount of reactions per post
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

// TODO: should it be mongoose.model( instead?
const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;