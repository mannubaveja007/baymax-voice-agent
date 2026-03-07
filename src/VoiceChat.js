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

export default function VoiceChat({ setFocus }) {
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

      console.log("Voice Transcript:", transcript);

      if (!transcript) return;

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
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-medium transition-all duration-300 disabled:opacity-40 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 animate-pulse-subtle"
      >
        <Mic className="w-5 h-5" /> Start
      </button>

      <button
        onClick={stop}
        disabled={status !== "connected"}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-medium transition-all duration-300 disabled:opacity-40 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 animate-pulse-subtle"
      >
        <MicOff className="w-5 h-5" /> Stop
      </button>
    </div>
  );
}