const express = require('express');
const router = express.Router();
const SymptomLog = require('../models/SymptomLog');

// POST /api/symptoms - Log a symptom
router.post('/', async (req, res) => {
  try {
    const { sessionId, bodyPart, description, severity } = req.body;

    if (!sessionId || !bodyPart) {
      return res.status(400).json({ error: 'sessionId and bodyPart are required' });
    }

    const symptom = await SymptomLog.create({
      sessionId,
      bodyPart,
      description: description || '',
      severity: severity || 5,
    });

    res.status(201).json(symptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/symptoms/:sessionId - Get symptoms for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const symptoms = await SymptomLog.find({
      sessionId: req.params.sessionId,
    }).sort({ createdAt: -1 });

    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/symptoms - Get all symptom logs
router.get('/', async (req, res) => {
  try {
    const symptoms = await SymptomLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
