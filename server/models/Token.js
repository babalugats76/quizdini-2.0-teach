const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    secret: { type: String, required: true }, // Secret verification token
    claimed: { type: Boolean, default: false }, // Has token been claimed
    expiryDate: { type: Date, required: true }, // When token expires
    user_id: { type: Schema.Types.ObjectId, required: true }, // Manual reference (like a foreign key) to only user who can claim
    createDate: { type: Date, default: Date.now, required: true }, // create date/time
    updateDate: { type: Date, default: Date.now }, // last update date/time
  },
  {
    id: false,
    toObject: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.user_id;
      }
    },
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.user_id;
      }
    }
  }
);

mongoose.model('tokens', tokenSchema);
