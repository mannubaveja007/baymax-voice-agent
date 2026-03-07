const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

// POST /api/conversations - Save a conversation message
router.post('/', async (req, res) => {
  try {
    const { sessionId, speaker, message, detectedBodyPart } = req.body;

    if (!sessionId || !speaker || !message) {
      return res.status(400).json({ error: 'sessionId, speaker, and message are required' });
    }

    const conversation = await Conversation.create({
      sessionId,
      speaker,
      message,
      detectedBodyPart: detectedBodyPart || null,
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/conversations/:sessionId - Get all messages for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      sessionId: req.params.sessionId,
    }).sort({ createdAt: 1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/conversations - Get all sessions (grouped)
router.get('/', async (req, res) => {
  try {
    const sessions = await Conversation.aggregate([
      {
        $group: {
          _id: '$sessionId',
          messageCount: { $sum: 1 },
          firstMessage: { $first: '$message' },
          startedAt: { $min: '$createdAt' },
          lastMessageAt: { $max: '$createdAt' },
        },
      },
      { $sort: { startedAt: -1 } },
      { $limit: 50 },
    ]);

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
