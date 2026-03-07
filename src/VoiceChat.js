import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Mail, Loader2, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import { api } from "./api";

// Generate a unique session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Dictionary mapping anatomy parts to English and Hindi/Hinglish keywords
const INTENT_MAP = {
  head: ["head", "headache", "migraine", "sir", "sir dard", "sar", "sar dard", "sirdard", "sardard"],
  eyes: ["eye", "eyes", "aankh", "aankhen", "vision", "blur", "aankhon", "nazar"],
  chest: ["chest", "heart", "chhati", "seena", "dil", "breath", "saans", "chest pain", "chhati mein dard"],
  stomach: ["stomach", "belly", "tummy", "pet", "peth", "digestion", "pet dard", "stomach ache", "pachan"],
  leftArm: ["left arm", "left hand", "bayan hath", "ulta hath", "baya hath", "bayan haath"],
  rightArm: ["right arm", "right hand", "dayan hath", "sidha hath", "daya hath", "dayan haath"],
  knees: ["knee", "knees", "ghutna", "ghutne", "ghutno", "joint"],
  feet: ["foot", "feet", "toe", "heel", "pair", "paon", "talwa"],
  fullBody: ["full body", "whole body", "poora sharir", "pura jism", "all over", "har jagah", "sab jagah"]
};

export default function VoiceChat({ setFocus, setAiTranscript, setUserTranscript }) {
  const sessionIdRef = useRef(generateSessionId());
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [reportStatus, setReportStatus] = useState('idle'); // idle | sending | sent | error

  const {
    startSession,
    endSession,
    status,
  } = useConversation({
    onMessage: (msg) => {
      // Parse the transcript text
      let transcript = "";
      if (typeof msg === 'string') transcript = msg.toLowerCase();
      else if (msg.message) transcript = msg.message.toLowerCase();
      else if (msg.content) transcript = msg.content.toLowerCase();

      console.log("Voice Transcript Object:", msg);

      if (!transcript) return;

      const messageText = msg.message || msg.content || transcript;
      const speaker = msg.source === 'ai' ? 'ai' : 'user';

      // Update Subtitle State depending on the speaker
      if (msg.source === 'ai') {
        setAiTranscript(messageText);
      } else {
        setUserTranscript(messageText);
      }

      // Intent Matching Logic
      let matchedPart = null;
      for (const [anatomyFocus, keywords] of Object.entries(INTENT_MAP)) {
        if (keywords.some(keyword => transcript.includes(keyword))) {
          console.log(`Detected Intent -> Translating to 3D Focus: ${anatomyFocus}`);
          setFocus(anatomyFocus);
          matchedPart = anatomyFocus;
          break;
        }
      }

      // Save message to MongoDB
      api.saveMessage(sessionIdRef.current, speaker, messageText, matchedPart).catch(console.error);

      // Log symptom if a body part was detected from user input
      if (matchedPart && matchedPart !== 'fullBody' && speaker === 'user') {
        api.logSymptom(sessionIdRef.current, matchedPart, messageText).catch(console.error);
      }
    },
  });

  const start = async () => {
    sessionIdRef.current = generateSessionId(); // New session each time
    await navigator.mediaDevices.getUserMedia({ audio: true });
    await startSession({ agentId: "agent_01jy98cxhsf5s88vt1x4sp5exb" });
  };

  const stop = async () => {
    await endSession();
  };

  const sendReport = async () => {
    if (!email) return;
    setReportStatus('sending');
    try {
      const result = await api.sendReport(sessionIdRef.current, email, patientName || 'Patient');
      if (result.success) {
        setReportStatus('sent');
        setTimeout(() => {
          setShowEmailInput(false);
          setReportStatus('idle');
        }, 3000);
      } else {
        setReportStatus('error');
      }
    } catch {
      setReportStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex justify-center gap-4">
        <button
          onClick={start}
          disabled={status === "connected"}
          className={`glass-panel text-cyan-400 border-cyan-500/30 px-6 py-3 rounded-2xl flex items-center gap-2 text-lg font-medium transition-all duration-300 ${status === "connected" ? 'opacity-40 scale-95' : 'hover:scale-105 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:text-cyan-300'}`}
        >
          <Mic className={`w-5 h-5 ${status !== "connected" && "animate-pulse-subtle"}`} /> Start
        </button>

        <button
          onClick={stop}
          disabled={status !== "connected"}
          className={`glass-panel text-red-400 border-red-500/30 px-6 py-3 rounded-2xl flex items-center gap-2 text-lg font-medium transition-all duration-300 ${status !== "connected" ? 'opacity-40 scale-95' : 'hover:scale-105 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:text-red-300 animate-pulse-subtle'}`}
        >
          <MicOff className="w-5 h-5" /> Stop
        </button>

        <button
          onClick={() => setShowEmailInput(!showEmailInput)}
          disabled={status === "connected"}
          className={`glass-panel text-emerald-400 border-emerald-500/30 px-6 py-3 rounded-2xl flex items-center gap-2 text-lg font-medium transition-all duration-300 ${status === "connected" ? 'opacity-40 scale-95' : 'hover:scale-105 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:text-emerald-300'}`}
        >
          <Mail className="w-5 h-5" /> Report
        </button>
      </div>

      {showEmailInput && (
        <div className="glass-panel p-4 rounded-2xl border-emerald-500/20 flex flex-col gap-3 w-80 animate-fade-in">
          <input
            type="text"
            placeholder="Your Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500/50"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500/50"
          />
          <button
            onClick={sendReport}
            disabled={!email || reportStatus === 'sending'}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${reportStatus === 'sent' ? 'bg-emerald-500/20 text-emerald-300' :
                reportStatus === 'error' ? 'bg-red-500/20 text-red-300' :
                  'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
          >
            {reportStatus === 'sending' && <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>}
            {reportStatus === 'sent' && <><CheckCircle className="w-4 h-4" /> Sent to your email!</>}
            {reportStatus === 'error' && <>Failed. Try again</>}
            {reportStatus === 'idle' && <><Mail className="w-4 h-4" /> Send Illness Report</>}
          </button>
        </div>
      )}
    </div>
  );
}