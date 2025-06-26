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
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        title="Spline Background"
      ></iframe>
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          Baymax AI
        </h1>
        <VoiceChat />
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-6 w-full text-center z-10 px-4">
        <p className="text-sm text-white/70 italic">
          “Your personal healthcare companion. Always here to listen.”
        </p>
      </div>
    </div>
  );
}

export default App;
