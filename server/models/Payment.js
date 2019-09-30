const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true }, // Manual reference (like a foreign key)
    processor: { type: String, default: 'Stripe' },
    paymentId: { type: String }, // Unique id from payment processor
    name: { type: String },
    email: { type: String, trim: true },
    description: { type: String },
    credits: { type: Number },
    amount: { type: Number },
    currency: { type: String },
    units: { type: String },
    status: { type: String },
    paymentDate: { type: Date },
    receiptUrl: { type: String },
    charge: { type: Schema.Types.Mixed }, // Reserved (when processor is Stripe)
    createDate: { type: Date, default: Date.now, required: true } // create date/time
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
        delete ret.charge;
      }
    },
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
      minimize: false,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.charge;
      }
    }
  }
);

paymentSchema.virtual('formatted').get(function() {
  if (
    this.units.toLowerCase() === 'pennies' &&
    this.currency.toLowerCase() === 'usd'
  ) {
    return `$${Number(this.amount / 100)
      .toFixed(2)
      .toLocaleString()}`;
  }
  return '$0.00';
});

mongoose.model('payments', paymentSchema);
