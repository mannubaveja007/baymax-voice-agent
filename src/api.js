const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Save a conversation message
  saveMessage: async (sessionId, speaker, message, detectedBodyPart = null) => {
    const res = await fetch(`${API_BASE}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, speaker, message, detectedBodyPart }),
    });
    return res.json();
  },

  // Get conversation history for a session
  getConversation: async (sessionId) => {
    const res = await fetch(`${API_BASE}/conversations/${encodeURIComponent(sessionId)}`);
    return res.json();
  },

  // Get all sessions
  getSessions: async () => {
    const res = await fetch(`${API_BASE}/conversations`);
    return res.json();
  },

  // Log a symptom
  logSymptom: async (sessionId, bodyPart, description = '', severity = 5) => {
    const res = await fetch(`${API_BASE}/symptoms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, bodyPart, description, severity }),
    });
    return res.json();
  },

  // Get symptoms for a session
  getSymptoms: async (sessionId) => {
    const res = await fetch(`${API_BASE}/symptoms/${encodeURIComponent(sessionId)}`);
    return res.json();
  },

  // Health check
  healthCheck: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // Send illness report via n8n agent (emails user)
  sendReport: async (sessionId, email, patientName = 'Patient') => {
    const res = await fetch(`${API_BASE}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, email, patientName }),
    });
    return res.json();
  },
};
