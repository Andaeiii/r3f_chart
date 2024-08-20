import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const data = [
  { label: 'A', value: 30, color: '#ff5733' },
  { label: 'B', value: 70, color: '#33ff57' },
  { label: 'C', value: 35, color: '#3357ff' },
  { label: 'D', value: 10, color: '#ff33a1' },
  { label: 'E', value: 89, color: '#33ff57' },
  { label: 'F', value: 25, color: '#3357ff' },
  { label: 'G', value: 10, color: '#ff33a1' }
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
      meshRef.current.position.y = meshRef.current.scale.y / 2; // Position on the horizontal plane
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, height, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const MovingLight = () => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time) * 5;
    lightRef.current.position.set(x, 3, 5);
  });

  return <pointLight ref={lightRef} intensity={6} distance={10} color="white" />;
};

const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[15, 10]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const BarChart = () => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
    <Canvas style={{ background: 'black' }} camera={{ position: [0, 2, 10], fov: 75 }}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 5, 5]} intensity={0.1} />
      <MovingLight />
      <OrbitControls />

      <Plane /> {/* Added the rectangular plane */}

      {data.map((item, index) => {
        const height = (item.value / maxVal) * 5;
        const position = [
          index * 1.5 - (data.length * 1.5) / 2,
          0,
          0
        ];
        const color = new THREE.Color(item.color || '#3498db');
        return <Bar key={item.label + index} position={position} height={height} color={color} />;
      })}
    </Canvas>
  );
};

export default BarChart;

