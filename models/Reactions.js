const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            // Don't have to say DataType.String because the "string" is defined by JS. So it doesnt have to be pulled in and defined manually by our use of mongoose.
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
            // TODO:  will be imported (in utils?)
            get: timestamp => dateFormat(timestamp)
        }
    }
)

module.exports = ReactionSchema;