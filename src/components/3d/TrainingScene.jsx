import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const TrainingScene = ({ section }) => {
    const group = useRef();

    // Smoothly interpolate rotation based on section
    useFrame((state, delta) => {
        if (!group.current) return;

        // Target rotation based on section index (0, 1, 2, 3)
        const targetRotY = section * (Math.PI / 2);
        const targetPosZ = -section * 2;

        // Lerp current to target
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, delta * 2);
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetPosZ, delta * 2);
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#FF1E1E" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="blue" />

            <group ref={group}>
                {/* Section 0: Gyms (Structure) */}
                <group position={[2, 0, 0]}>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <Box args={[1, 4, 1]} rotation={[0, 0, 0.2]}>
                            <meshStandardMaterial color="#333" wireframe />
                        </Box>
                    </Float>
                </group>

                {/* Section 1: Methods (Geometry) */}
                <group position={[0, 2, -5]} rotation={[0, -Math.PI / 2, 0]}>
                    <Float speed={3}>
                        <Octahedron args={[1.5]} >
                            <meshStandardMaterial color="#FF1E1E" wireframe />
                        </Octahedron>
                    </Float>
                </group>

                {/* Section 2: Supplements (Pill shapes/Spheres) */}
                <group position={[-5, 0, -10]} rotation={[0, -Math.PI, 0]}>
                    <Float speed={1.5}>
                        <Torus args={[1, 0.3, 16, 32]}>
                            <meshStandardMaterial color="#fff" />
                        </Torus>
                    </Float>
                </group>

                {/* Section 3: Lifestyle (Book shapes) */}
                <group position={[0, -2, -15]} rotation={[0, -Math.PI * 1.5, 0]}>
                    <Float speed={1}>
                        <Box args={[1.5, 2, 0.2]}>
                            <meshStandardMaterial color="#333" />
                        </Box>
                    </Float>
                </group>
            </group>
        </>
    );
};

export default TrainingScene;
