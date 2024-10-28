import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from "three";

// Generate random data for pie chart
const generateRandomData = () => {
  return Array.from({ length: 5 }, () => Math.random());
};

// Pie chart segment component
const PieSegment = ({ startAngle, endAngle, color, radius = 2 }) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [startAngle, endAngle, radius]);

  return (
    <mesh>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Main 3D Pie Chart component
const PieChart3D = () => {
  const data = useMemo(generateRandomData, []);
  const total = data.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls
        rotateSpeed={0.2} // Adjust to slow down rotation
        zoomSpeed={0.5}   // Adjust to slow down zooming
        panSpeed={0.5}    // Adjust to slow down panning
      />

      {data.map((value, index) => {
        const angle = (value / total) * Math.PI * 2;
        const endAngle = startAngle + angle;
        const color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`);
        const segment = (
          <PieSegment
            key={index}
            startAngle={startAngle}
            endAngle={endAngle}
            color={color}
          />
        );
        startAngle = endAngle;
        return segment;
      })}
    </Canvas>
  );
};

export default PieChart3D;
