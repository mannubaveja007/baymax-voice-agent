import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AnatomyModel } from './components/AnatomyModel';

// Camera position presets for the different anatomy focuses [x, y, z]
const CAMERA_PRESETS = {
    fullBody: {
        position: [0, 1, 4.5],
        lookAt: [0, 0.5, 0],
        fov: 30,
    },
    head: {
        position: [0, 2.9, 1.2],
        lookAt: [0, 1, 0],
        fov: 35,
    },
    eyes: {
        position: [0, 1.65, 0.6],
        lookAt: [0, 0.9, -2],
        fov: 30,
    },
    chest: {
        position: [0, 1.3, 1.5],
        lookAt: [0, -1.2, -6],
        fov: 30,
    },
    stomach: {
        position: [0, 0.9, 1.5],
        lookAt: [0, 1.8, -6],
        fov: 40,
    },
    leftArm: {
        position: [0.8, 1.0, 1.2],
        lookAt: [0.4, -1.8, -6],
        fov: 35,
    },
    rightArm: {
        position: [-0.8, 1.0, 1.2],
        lookAt: [-0.4, 0.9, 0],
        fov: 35,
    },
    knees: {
        position: [0, -0.3, 1.5],
        lookAt: [0, -0.3, 0],
        fov: 35,
    },
    feet: {
        position: [0, -1.0, 1.5],
        lookAt: [0, -1.0, 0],
        fov: 40,
    }
};

export default function TestAnatomy() {
    const [focus, setFocus] = useState('fullBody');

    const buttons = [
        { id: 'fullBody', label: 'Full Body' },
        { id: 'head', label: 'Head' },
        { id: 'eyes', label: 'Eyes' },
        { id: 'chest', label: 'Chest' },
        { id: 'stomach', label: 'Stomach' },
        { id: 'leftArm', label: 'Left Arm' },
        { id: 'rightArm', label: 'Right Arm' },
        { id: 'knees', label: 'Knees' },
        { id: 'feet', label: 'Feet' }
    ];

    return (
        <div className="w-screen h-screen bg-neutral-900 flex flex-col items-center">
            {/* UI Overlay for Testing Buttons */}
            <div className="absolute top-8 z-10 flex flex-wrap justify-center gap-2 max-w-4xl bg-black/50 p-4 rounded-2xl backdrop-blur-md">
                {buttons.map(btn => (
                    <button
                        key={btn.id}
                        onClick={() => setFocus(btn.id)}
                        className={`px-4 py-2 text-sm rounded-lg font-medium transition ${focus === btn.id ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Environment preset="city" />

                    {/* Smooth Camera Transition Wrapper using vanilla Three.js math */}
                    <CameraAnimator
                        targetPosition={CAMERA_PRESETS[focus].position}
                        targetLookAt={CAMERA_PRESETS[focus].lookAt}
                        targetFov={CAMERA_PRESETS[focus].fov}
                    />

                    {/* Render the 3D human model */}
                    <AnatomyModel />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                    />
                </Canvas>
            </div>
        </div>
    );
}

// Custom camera animator that smoothly interpolates the default camera's position, rotation, and FOV
function CameraAnimator({ targetPosition, targetLookAt, targetFov }) {
    const { camera } = useThree();

    // We store the current lookAt point so we can smoothly transition it
    const currentLookAt = React.useRef(new THREE.Vector3(0, 0.5, 0));

    useFrame((state, delta) => {
        // Smoothly interpolate camera position using Three.js vector lerping
        const posVec = new THREE.Vector3(...targetPosition);
        camera.position.lerp(posVec, 3 * delta);

        // Smoothly interpolate FOV
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 3 * delta);
        camera.updateProjectionMatrix();

        // Smoothly interpolate WHERE the camera is looking
        const targetLookVec = new THREE.Vector3(...targetLookAt);
        currentLookAt.current.lerp(targetLookVec, 3 * delta);
        camera.lookAt(currentLookAt.current);
    });

    return null; // This component handles logic, no rendering needed
}
