import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

// Main points for the line
const mainPoints = [
  new THREE.Vector3(-4, 0, 0),
  new THREE.Vector3(-3, 1, 0),
  new THREE.Vector3(-2, 0.5, 0),
  new THREE.Vector3(-1, 1.5, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0.5, 0),
  new THREE.Vector3(2, -1, 0),
  new THREE.Vector3(3, -0.5, 0),
  new THREE.Vector3(4, -1.5, 0),
  new THREE.Vector3(5, 0, 0)
];

// Function to generate a smooth path with interpolated points
const generateSmoothPath = (points, segments) => {
  const smoothPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const x = THREE.MathUtils.lerp(start.x, end.x, t);
      const y = THREE.MathUtils.lerp(start.y, end.y, t);
      const z = THREE.MathUtils.lerp(start.z, end.z, t);
      smoothPoints.push(new THREE.Vector3(x, y, z));
    }
  }
  return smoothPoints;
};

const smoothPoints = generateSmoothPath(mainPoints, 20); // Higher value for segments = smoother path

// Line component with animation
function AnimatedLine() {
  const lineRef = useRef();
  const [drawCount, setDrawCount] = useState(0);
  const maxPoints = smoothPoints.length;

  useFrame(() => {
    if (drawCount < maxPoints) {
      setDrawCount(drawCount + 1); // Increment to draw line smoothly
      lineRef.current.geometry.setDrawRange(0, drawCount);
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" setFromPoints={smoothPoints} />
      <lineBasicMaterial attach="material" color="blue" />
    </line>
  );
}

// Axes and labels component
function AxesAndLabels({ length }) {
  return (
    <>
      {/* X and Y axes */}
      <Line points={[[-length, 0, 0], [length, 0, 0]]} color="black" lineWidth={1} />
      <Line points={[[0, -length, 0], [0, length, 0]]} color="black" lineWidth={1} />

      {/* Axis Labels */}
      {[...Array(length * 2 + 1)].map((_, i) => {
        const position = i - length;
        if (position === 0) return null; // Skip the origin
        return (
          <React.Fragment key={i}>
            <Text position={[position, -0.3, 0]} fontSize={0.3} color="black">
              {position}
            </Text>
            <Text position={[-0.3, position, 0]} fontSize={0.3} color="black">
              {position}
            </Text>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      {/* Axes and labels */}
      <AxesAndLabels length={5} />
      {/* Animated line */}
      <AnimatedLine />
    </Canvas>
  );
}
