const mongoose = require("mongoose");
const { Schema } = mongoose;

const countrySchema = new Schema(
  { countryId: { type: Number, required: true },
    countryCode: { type: String, required: true },
    countryName: { type: String, required: true}
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

mongoose.model("countries", countrySchema);
