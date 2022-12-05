const mongoose = require("mongoose");
const validator = require('validator');
const autoIncrement = require('mongoose-auto-increment')

const taskSchema = mongoose.Schema({
    numTask:{
      type:Number
    },
    name: {
        type: String,
        required: [true, 'name is a required field'],
        validate(value) {
          if (!validator.isLength(value, { min: 6, max: 50 })) {
            throw Error("Length of the name should be between 6-50");
          }
    }},
    description: {
      type: String,
      required: [true, 'description is a required field'],
      validate(value) {
        if (!validator.isLength(value, { min: 1, max: 1000 })) {
          throw Error("Length of the name should be between 1-1000");
        }
    }},
    idealInitDate : {
      type: Date,
      required : true,
      default: Date.now,
      validate(value) {
        if (!validator.isDate(value)) {
          throw Error("Format date error");
      }
    }},
    idealEndDate: {
      type: Date,
      required : true,
      default: Date.now,
      validate(value) {
        if (!validator.isDate(value)) {
          throw Error("Format date error");
      }
    }},
    responsible: {
        type: [],
        default : [{ "id": 0 }],
        required: false
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
          throw Error("Format date error ");
        }
      }
    },
    status: {
      type: String,
      required : false,
      default : "notStarted"
    },
    projectID: {
      type: String,
      required : true
    }
});

taskSchema.plugin(autoIncrement.plugin, {
  model:'Task',
  field: 'numTask',
  startAt: 1,
  incrementBy: 1
})
module.exports = mongoose.model('Task', taskSchema);