import VoiceChat from "./VoiceChat";

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Spline Background */}
      <iframe
        src="https://my.spline.design/celestialflowabstractdigitalform-IROPXh23xzXDkI86ucFrbQIW/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none animate-fade-in"
        title="Spline Background"
      ></iframe>

      {/* Hide Spline Logo & Add Team Name */}
      <div className="flex items-center justify-center absolute bottom-3 right-4 w-48 h-12 bg-sky-900/40 z-0 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-xl border border-sky-400/20 pointer-events-none">
        <span className="text-white/90 text-base font-semibold tracking-wider">Team Syndicate</span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg animate-slide-down">
          Baymax AI
        </h1>
        <div className="animate-slide-up">
          <VoiceChat />
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-6 w-full text-center z-10 px-4 animate-fade-in-delayed">
        <p className="text-sm text-white/70 italic">
          "Your personal healthcare companion. Always here to listen."
        </p>
      </div>
    </div>
  );
}

export default App;