const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  initDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required : false
  },
  idealInitDate : {
    type: Date,
    required : true
  },
  idealEndDate:{
    type: Date,
    required: true
  },
  invertedHours : {
    type : Number, // deberia arrancar siempre en 0
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);