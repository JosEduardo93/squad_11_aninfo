const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field'],
    validate(value) {
      if (!validator.isLength(value, { min: 6, max: 50 })) {
        throw Error("Length of the name should be between 6-50");
      }
    }
  },
  description: {
    type: String,
    required: [true, 'Descriptions is a required field']
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
  },
  initDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required : false
  }
});

module.exports = mongoose.model('Project', projectSchema);