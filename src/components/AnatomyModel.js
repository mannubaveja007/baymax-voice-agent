import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function AnatomyModel(props) {
    // Load the standard human.glb file from the public folder
    const { scene } = useGLTF('/human.glb');
    const modelRef = useRef();

    // Basic rendering of the loaded 3D scene
    // We attach it to a primitive
    return (
        <primitive
            object={scene}
            ref={modelRef}
            scale={1}
            position={[0, -1, 0]} // adjust as necessary to center
            {...props}
        />
    );
}

// Preload the GLTF file for better performance
useGLTF.preload('/human.glb');
