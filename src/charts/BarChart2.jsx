import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import MovingLight2 from '../lights/MovingLight2';
import OrbitCtrls from '../controls/OrbitControls';

// Component to render each bar
const Bar2 = ({ position, height, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};



// Main BarChart component
const BarChart2 = ({ data }) => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight intensity={0.2} />
      <MovingLight2 /> 
      <OrbitCtrls /> 
      {data.map((item, index) => {
        const height = (item.value / maxVal) * 5; // Normalize the height
        const position = [
          index * 1.5 - data.length / 2, // x position
          height / 2, // y position (half of height to position bars from the foot)
          0 // z position
        ];
        const color = new THREE.Color(item.color || '#3498db');

        return (
          <React.Fragment key={item.label}>
            <Bar2 position={position} height={height} color={color} />
            <Text
              position={[position[0], -0.5, 0]} // Position label directly below the bar
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {item.label}
            </Text>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

export default BarChart2;
