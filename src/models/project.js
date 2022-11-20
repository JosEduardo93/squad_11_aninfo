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
    required: [true, 'Descriptions is a required field'],
    validate(value) {
      if (!validator.isLength(value, {min: 1, max: 1000})) {
        throw Error("The description cannot be empty, the maximum number of characters is 1000");
      }
    }
  },
  idealInitDate : {
    type: Date,
    required : true,
    default: Date.now,
    validate(value) {
      if (!validator.isDate(value)) {
        throw Error("Format date error");
      }
    }
  },
  idealEndDate:{
    type: Date,
    required: true,
    default: Date.now,
    validate(value) {
      if (!validator.isDate(value)) {
        throw Error("Format date error");
      }
    }
  },
  invertedHours : {
    type : Number, 
    default: 0,
    required: false
  },
  initDate: {
    type: Date,
    required: false, 
    default: Date.now,
    validate(value) {
      if (!validator.isDate(value)) {
        throw Error("Format date error");
      }
    }
  },
  endDate: {
    type: Date,
    required : false,
    default: Date.now,
    validate(value) {
      if (!validator.isDate(value)) {
        throw Error("Format date error");
      }
    }
  },
  assignedClient: {
    type: Number,
    required: false, // A analizar
    default: -1
  },
  status: {
    type: String,
    required: false,
    default: "notStarted"
  }
});

module.exports = mongoose.model('Project', projectSchema);