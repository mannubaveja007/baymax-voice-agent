const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const SymptomLog = require('../models/SymptomLog');

// POST /api/report - Send illness report to n8n agent which emails the user
router.post('/', async (req, res) => {
  try {
    const { sessionId, email, patientName } = req.body;

    if (!sessionId || !email) {
      return res.status(400).json({ error: 'sessionId and email are required' });
    }

    // Fetch conversation and symptoms from MongoDB
    const conversations = await Conversation.find({ sessionId }).sort({ createdAt: 1 });
    const symptoms = await SymptomLog.find({ sessionId }).sort({ createdAt: -1 });

    if (conversations.length === 0) {
      return res.status(404).json({ error: 'No conversation found for this session' });
    }

    // Format conversation into readable text
    const conversationText = conversations
      .map(c => `${c.speaker === 'ai' ? 'Baymax' : 'Patient'}: ${c.message}`)
      .join('\n');

    // Format symptoms list
    const symptomList = symptoms.map(s => ({
      bodyPart: s.bodyPart,
      description: s.description,
      severity: s.severity,
      reportedAt: s.createdAt,
    }));

    // Build payload for n8n webhook
    const n8nPayload = {
      patientName: patientName || 'Patient',
      email,
      sessionId,
      symptoms: symptomList,
      conversationText,
      messageCount: conversations.length,
      timestamp: new Date().toISOString(),
    };

    // Send to n8n webhook
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

    if (!N8N_WEBHOOK_URL) {
      return res.status(500).json({ error: 'N8N_WEBHOOK_URL not configured in .env' });
    }

    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook responded with status ${n8nResponse.status}`);
    }

    res.json({ success: true, message: 'Report sent to your email via n8n agent' });
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
