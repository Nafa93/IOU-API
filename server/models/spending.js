const mongoose = require('mongoose')

var Spending = mongoose.model('Spending', {
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  },
  month: {
    type: String,
    require
  },
  createdAt: {
    type: Date,
    required: true
  },
  direct: {
    type: Boolean,
    default: false
  }
})

module.exports = { Spending }
