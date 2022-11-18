const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true
      },
      idealInitDate : {
        type: Date,
        required : true
      },
      idealEndDate: {
        type: Date,
        required: true
      },
      responsible: {
        type: String, //TODO: debería recibir un tipo User
        required: false
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
})