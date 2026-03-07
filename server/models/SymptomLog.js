const mongoose = require('mongoose');

const symptomLogSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  severity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('SymptomLog', symptomLogSchema);
