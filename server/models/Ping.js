const mongoose = require('mongoose');
const { Schema } = mongoose;

const pingSchema = new Schema(
  {
    ipAddress: { type: String },
    gameId: { type: String, required: true },
    gameType: { type: String, enum: ['M'], default: 'M', required: true },
    results: Schema.Types.Mixed, // Game result info {} POJO, e.g., score, etc.
    createDate: { type: Date, default: Date.now, required: true }
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
      }
    },
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
      }
    }
  }
);

mongoose.model('pings', pingSchema);