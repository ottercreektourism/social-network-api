const { Schema, model} = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: ()=>new Types.ObjectId()
        }, 
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // dateFormat will be imported
            get: timestamp => dateFormat(timestamp)
        }
    }
)

module.exports = ReactionSchema;