const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  speaker: {
    type: String,
    enum: ['user', 'ai'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  detectedBodyPart: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
