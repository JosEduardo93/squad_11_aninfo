const mongoose = require("mongoose");
const validator = require("validator");
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

const typeProject = [
  "Implementacion",
  "Desarrollo"
]

const states = [
  "No Iniciado",
  "Iniciado",
  "Analisis",
  "Desarrollo",
  "Pruebas",
  "Produccion",
  "Post-Produccion",
  "Cancelado"
];

const projectSchema = mongoose.Schema({
  numProject:{ type:Number},
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
    default: "No Iniciado",
    validate(value) {
      if (!states.includes(value)) {
        throw Error("Status error");
      }
    }
  },
  projectLeader: {
    type: Number,
    required: false,
    default: "project-leader"
  },
  type: {
    type: String,
    required: false,
    default: "Desarrollo",
    validate(value) {
      if (!typeProject.includes(value)) {
        throw Error("Type Project error");
      }
    }
  }
});

projectSchema.plugin(autoIncrement.plugin, {
    model:'Project',
    field: 'numProject',
    startAt: 1,
    incrementBy: 1
})
module.exports = mongoose.model('Project', projectSchema);