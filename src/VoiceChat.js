import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";

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

      // Update Subtitle State depending on the speaker
      if (msg.source === 'ai') {
        setAiTranscript(msg.message || msg.content || transcript);
      } else {
        setUserTranscript(msg.message || msg.content || transcript);
      }

      // Intent Matching Logic
      // Check each category and its keywords. First match wins to prevent flickering.
      for (const [anatomyFocus, keywords] of Object.entries(INTENT_MAP)) {
        if (keywords.some(keyword => transcript.includes(keyword))) {
          console.log(`Detected Intent -> Translating to 3D Focus: ${anatomyFocus}`);
          setFocus(anatomyFocus);
          break; // Stop looking once we find a match in the current sentence
        }
      }
    },
  });

  const start = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    await startSession({ agentId: "agent_01jy98cxhsf5s88vt1x4sp5exb" });
  };

  const stop = async () => {
    await endSession();
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
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
    </div>
  );
}