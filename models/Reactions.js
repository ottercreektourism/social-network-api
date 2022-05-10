const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

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
            // get: timestamp => dateFormat(timestamp)
            get: timestamp => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')

        }
    }
)

module.exports = ReactionSchema;