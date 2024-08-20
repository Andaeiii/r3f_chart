import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const data = [
  { label: 'A', value: 60, color: '#ff5733' },
  { label: 'B', value: 30, color: '#33ff57' },
  { label: 'C', value: 35, color: '#3357ff' },
  { label: 'D', value: 30, color: '#ff33a1' },
  { label: 'B', value: 89, color: '#33ff57' },
  { label: 'C', value: 15, color: '#3357ff' },
  { label: 'D', value: 90, color: '#ff33a1' },
  { label: 'C', value: 25, color: '#3357ff' },
  { label: 'D', value: 10, color: '#ff33a1' }
];

const Bar = ({ position, height, color }) => {
  const meshRef = useRef();
  const [targetHeight, setTargetHeight] = useState(height);

  useEffect(() => {
    setTargetHeight(height);
  }, [height]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y += (targetHeight - meshRef.current.scale.y) * 0.1;
      meshRef.current.position.y = meshRef.current.scale.y / 2;
    }
  });

  return (
    <mesh position={position} ref={meshRef} scale={[1, height, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const MovingLight = () => {
  const lightRef = useRef();

  // Animation loop to move the light from left to right
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time) * 5; // Left to right motion
    lightRef.current.position.set(x, 3, 5); // Keep the light above the bars
  });

  return <pointLight ref={lightRef} intensity={6} distance={10} color="white" />;
};

const BarChart = () => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
    <Canvas 
       camera={{ position: [0, 10, 10], fov: 75 }} // Adjust camera position upwards
       style={{ background: 'black' }}>
        
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 5, 5]} intensity={0.1} />
      <MovingLight />
      <OrbitControls />

      {data.map((item, index) => {
        const height = (item.value / maxVal) * 5; // Normalize the height
        const position = [
          index * 1.5 - data.length / 2, // x position
          height / 2, // y position (half of height to position bars from the foot)
          0 // z position
        ];
        const color = new THREE.Color(item.color || '#3498db');
        return <Bar key={item.label + index} position={position} height={height} color={color} />;
      })}
    </Canvas>
  );
};

export default BarChart;
