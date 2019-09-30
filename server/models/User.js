const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: String,
    googlePicture: String,
    credits: { type: Number, default: 0, required: true },
    username: { type: String, lowercase: true, trim: true },
    password: String,
    title: String,
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    city: String,
    stateCode: String,
    countryCode: String,
    email: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      default: 'teach'
    },
    verified: { type: Boolean, default: false },
    createDate: { type: Date, default: Date.now, required: true }, // create date/time
    updateDate: { type: Date, default: Date.now }, // last update date/time
    lastLoginDate: Date
  },
  {
    id: true,
    toObject: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.password;
      }
    },
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.password;
      }
    }
  }
);

userSchema.virtual('fullName').get(function() {
  return (
    (this.title ? this.title + ' ' : '') +
    (this.firstName ? this.firstName + ' ' : '') +
    (this.lastName ? this.lastName : '')
  );
});

mongoose.model('users', userSchema);
