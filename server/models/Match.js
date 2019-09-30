const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema(
  {
    matchId: { type: String, required: true }, // uuid/v4; not the Mongo-generated ObjectId type
    title: { type: String, required: true }, // Effectively, the "name" of the game
    instructions: String, // How to play author comments
    matches: [], // Pairs, i.e., terms and definitions
    options: Schema.Types.Mixed, // Config info {} POJO, e.g., duration, etc.
    createDate: { type: Date, default: Date.now, required: true }, // create date/time
    updateDate: { type: Date, default: Date.now }, // last update date/time
    user_id: { type: Schema.Types.ObjectId, required: true } // Manual reference (like a foreign key)
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

mongoose.model("matches", matchSchema);
