import React, { useMemo, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import CanvasLayout from "../layouts/CanvasLayout";
import AnimatedCamera from "../cameras/AnimatedCamera";

// Generate random data for pie chart
const generateRandomData = () => {
  return Array.from({ length: 5 }, () => Math.random() * 100);
};

// Pie chart segment component with extrusion and click interaction
const PieSegment = React.memo(({ startAngle, endAngle, color, value, radius = 2, depth = 0.5, onClick }) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [startAngle, endAngle, radius]);

  const extrudeSettings = { depth, bevelEnabled: false };

  return (
    <mesh onClick={onClick} position={[0, 0, depth / 2]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial color={color} />
      
      {/* Add text label on top of each segment */}
      <Text
        position={[
          (radius / 2) * Math.cos((startAngle + endAngle) / 2), 
          (radius / 2) * Math.sin((startAngle + endAngle) / 2), 
          depth + 0.1
        ]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {value.toFixed(1)}
      </Text>
    </mesh>
  );
});

// Main 3D Pie Chart component
const PieChart3D = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const data = useMemo(generateRandomData, []);
  const total = data.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;

  // Memoize the click handler to avoid re-renders
  const handleSegmentClick = useCallback((value) => {
    //setSelectedValue(value);
    console.log(value);
  }, []);

  return (
    <CanvasLayout bgColor="darkgreen">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedCamera zPos={4}/>

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
            value={value}
            depth={0.5}  // Extrusion depth
            onClick={() => handleSegmentClick(value)} // Memoized handler
          />
        );

        startAngle = endAngle;
        return segment;
      })}

      {/* Display selected segment value */}
      {selectedValue !== null && (
        <Text position={[0, -2.5, 1]} fontSize={0.4} color="black">
          Selected Value: {selectedValue.toFixed(1)}
        </Text>
      )}
    </CanvasLayout>
  );
};

export default PieChart3D;
