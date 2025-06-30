import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceChat() {
  const {
    startSession,
    endSession,
    status,
  } = useConversation({
    onMessage: (msg) => console.log(msg),
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