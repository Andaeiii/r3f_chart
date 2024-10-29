import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import OrbitCtrls from "../controls/OrbitControls";
import MovingLight2 from "../lights/MovingLight";
import CanvasLayout from "../layouts/CanvasLayout";
import AnimatedCamera from "../cameras/AnimatedCamera";

// Generate random data for pie chart
const generateRandomData = () => {
  return Array.from({ length: 5 }, () => Math.random());
};

// Pie chart segment component with extrusion
const PieSegment = ({ startAngle, endAngle, color, radius = 2, depth = 0.5 }) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [startAngle, endAngle, radius]);

  const extrudeSettings = { depth, bevelEnabled: false };

  return (
    <mesh>
      <extrudeGeometry args={[shape, extrudeSettings]} />
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

    <CanvasLayout bgColor="black">
      
      <AnimatedCamera zPos={5}/>

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
            depth={0.5}  // Extrusion depth
          />
        );
        
        startAngle = endAngle;
        return segment;
      })} 
      
      </CanvasLayout>
  );
};

export default PieChart3D;
