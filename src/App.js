import React, { useState } from 'react';
import VoiceChat from "./VoiceChat";
import TestAnatomy from "./TestAnatomy";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { AnatomyModel } from './components/AnatomyModel';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Define the camera presets (reusing from TestAnatomy)
const CAMERA_PRESETS = {
  fullBody: { position: [0, 1, 4.5], lookAt: [0, 0.5, 0], fov: 30 },
  head: { position: [0, 1.8, 1.2], lookAt: [0, 1, 0], fov: 35 },
  eyes: { position: [0, 1.65, 0.6], lookAt: [0, 0.9, -2], fov: 30 },
  chest: { position: [0, 1.3, 1.5], lookAt: [0, -1.2, -6], fov: 30 },
  stomach: { position: [0, 0.9, 1.5], lookAt: [0, 1.8, -6], fov: 40 },
  leftArm: { position: [0.8, 1.0, 1.2], lookAt: [0.4, -1.8, -6], fov: 35 },
  rightArm: { position: [-0.8, 1.0, 1.2], lookAt: [-0.4, 0.9, 0], fov: 35 },
  knees: { position: [0, -0.3, 1.5], lookAt: [0, -0.3, 0], fov: 35 },
  feet: { position: [0, -1.0, 1.5], lookAt: [0, -1.0, 0], fov: 40 }
};

// Custom camera animator that smoothly interpolates the default camera's position, rotation, and FOV
function CameraAnimator({ targetPosition, targetLookAt, targetFov }) {
  const { camera } = useThree();
  const currentLookAt = React.useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((state, delta) => {
    const posVec = new THREE.Vector3(...targetPosition);
    camera.position.lerp(posVec, 3 * delta);

    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 3 * delta);
    camera.updateProjectionMatrix();

    const targetLookVec = new THREE.Vector3(...targetLookAt);
    currentLookAt.current.lerp(targetLookVec, 3 * delta);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function App() {
  const [focus, setFocus] = useState('fullBody');

  // Temporary routing for development
  if (window.location.hash === "#test") {
    return <TestAnatomy />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cosmic-glow">

      {/* 3D Canvas Background replacing Spline */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80">
        <Canvas>
          {/* Phase 1: Cinematic Hologram Lighting */}
          <ambientLight intensity={0.15} />
          <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={180} color="#06b6d4" />
          <spotLight position={[-5, 5, -5]} angle={0.2} penumbra={1} intensity={250} color="#8b5cf6" />
          <pointLight position={[0, -2, 2]} intensity={80} color="#3b82f6" distance={8} />

          <Environment preset="city" />

          {/* Smooth Camera Transition Wrapper using vanilla Three.js math */}
          <CameraAnimator
            targetPosition={CAMERA_PRESETS[focus]?.position || CAMERA_PRESETS.fullBody.position}
            targetLookAt={CAMERA_PRESETS[focus]?.lookAt || CAMERA_PRESETS.fullBody.lookAt}
            targetFov={CAMERA_PRESETS[focus]?.fov || CAMERA_PRESETS.fullBody.fov}
          />

          {/* Render the 3D human model */}
          <AnatomyModel />

          {/* Phase 2: Post-Processing Effects (Bloom) */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.05}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* Hide Spline Logo & Add Team Name */}
      <div className="flex items-center justify-center absolute bottom-3 right-4 w-48 h-12 bg-sky-900/40 z-0 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-xl border border-sky-400/20 pointer-events-none">
        <span className="text-white/90 text-base font-semibold tracking-wider">Team Syndicate</span>
      </div>

      {/* Foreground Content */}
      <div
        className={`fixed z-10 flex flex-col items-start transition-all duration-[1500ms] ease-in-out ${focus === 'fullBody'
          ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 items-center'
          : 'top-8 left-8 translate-x-0 translate-y-0 scale-[0.6] origin-top-left'
          }`}
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg pb-1 whitespace-nowrap">
          Baymax AI
        </h1>
        <div className={`transition-all duration-[1500ms] ease-in-out ${focus === 'fullBody' ? 'mt-8' : 'mt-4 origin-top-left scale-110'}`}>
          <VoiceChat setFocus={setFocus} />
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