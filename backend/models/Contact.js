const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    type: {
      type: String,
      default: 'personel',
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
