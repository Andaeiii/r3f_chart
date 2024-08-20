import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Component to render each bar
const Bar2 = ({ position, height, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Component for the moving point light
const MovingLight2 = () => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time) * 5; // Move left to right
    lightRef.current.position.set(x, 3, 5); // Position light above the bars
  });

  return <pointLight ref={lightRef} intensity={1} distance={10} color="white" />;
};

// Main BarChart component
const BarChart2 = ({ data }) => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight intensity={0.2} />
      <MovingLight2 />
      <OrbitControls
        rotateSpeed={0.2} // Adjust to slow down rotation
        zoomSpeed={0.5}   // Adjust to slow down zooming
        panSpeed={0.5}    // Adjust to slow down panning
      />

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
