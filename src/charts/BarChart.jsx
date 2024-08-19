import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Bar = ({ position, height, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const BarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {data.map((item, index) => {
        const height = (item.value / maxVal) * 5; // Normalize the height
        const position = [index * 1.5 - data.length / 2, height / 2, 0];
        const color = new THREE.Color(item.color || '#3498db');
        return <Bar key={item.label} position={position} height={height} color={color} />;
      })}
    </Canvas>
  );
};

export default BarChart;
