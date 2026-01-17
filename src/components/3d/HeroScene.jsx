import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Cylinder, Box, Torus, Environment, ContactShadows } from '@react-three/drei';

const Dumbbell = (props) => {
    return (
        <group {...props}>
            {/* Handle */}
            <Cylinder args={[0.1, 0.1, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
            </Cylinder>
            {/* Weights (Hex style simplified) */}
            <Box args={[0.4, 0.4, 0.2]} position={[0, 0, 0.5]}>
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} />
            </Box>
            <Box args={[0.4, 0.4, 0.2]} position={[0, 0, -0.5]}>
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} />
            </Box>
        </group>
    );
};

const WeightPlate = (props) => {
    return (
        <group {...props}>
            <Torus args={[1, 0.4, 16, 32]}>
                <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
            </Torus>
            {/* Center Hub */}
            <Cylinder args={[0.2, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#999" roughness={0.1} metalness={1} />
            </Cylinder>
        </group>
    )
}

const HeroScene = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Slow gentle rotation of the entire group
            groupRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#FF1E1E" />
            <spotLight position={[-5, 5, 5]} intensity={1} color="#00d4ff" angle={0.5} />

            <group ref={groupRef} position={[0, 0, -3]}>
                {/* Main Floating Dumbbell */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <Dumbbell position={[3, 1, 0]} rotation={[0.5, 0.5, 0]} scale={1.5} />
                </Float>

                {/* Secondary Dumbbell */}
                <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
                    <Dumbbell position={[-3, -1, -1]} rotation={[-0.5, 1, 0]} />
                </Float>

                {/* Floating Plates */}
                <Float speed={1} rotationIntensity={0.4} floatIntensity={0.5}>
                    <WeightPlate position={[-2, 2, -2]} scale={0.6} rotation={[1, 0, 0]} />
                </Float>

                <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.6}>
                    <WeightPlate position={[2, -2, -1]} scale={0.8} rotation={[0, 1, 0]} />
                </Float>
            </group>

            <Environment preset="city" />
        </>
    );
};

export default HeroScene;
