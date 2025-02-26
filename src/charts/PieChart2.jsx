import React, { useMemo, useRef, useState, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import CanvasLayout from "../layouts/CanvasLayout";

// Provided dataset with labels, values, and colors
const data = [
  { label: 'rice', value: 30, color: '#ff5733' },
  { label: 'beans', value: 100, color: '#33ff57' },
  { label: 'garri', value: 15, color: '#3357ff' },
  { label: 'flour', value: 95, color: '#ff33a1' },
  { label: 'millet', value: 79, color: '#33ff57' },
  { label: 'rice', value: 50, color: '#fff457' },
  { label: 'corn', value: 115, color: '#3357ff' },
  { label: 'amala', value: 90, color: '#ff33a1' }
];

// Pie chart segment component with extrusion, click interaction, and GSAP animation
const PieSegment = React.memo(({ index, startAngle, endAngle, color, label, value, radius = 2, depth = 0.5, isActive, onClick }) => {
  const meshRef = useRef();

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(0, 0);
    return shape;
  }, [startAngle, endAngle, radius]);

  const extrudeSettings = { depth, bevelEnabled: false };

  // Animate the segment when the active status changes
  useEffect(() => {
    gsap.to(meshRef.current.position, {
      z: isActive ? 1 : depth / 2, // Move active forward, reset others back
      duration: 0.5
    });
  }, [isActive, depth]);

  const handleClick = () => {
    if (onClick) onClick(index);
  };

  return (
    <mesh ref={meshRef} onClick={handleClick} position={[0, 0, depth / 2]}>
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
        {label} ({value})
      </Text>
    </mesh>
  );
});

// Main 3D Pie Chart component
const PieChart3D = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const handleSegmentClick = (index) => {
    setSelectedSegment(index); // Set the clicked segment index
  };

  return (
    <CanvasLayout bgColor="blue" bg={false}>

      {data.map((item, index) => {
        const angle = (item.value / total) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const segment = (
          <PieSegment
            key={index}
            index={index}
            startAngle={startAngle}
            endAngle={endAngle}
            color={item.color}
            label={item.label}
            value={item.value}
            depth={0.5}  // Extrusion depth
            isActive={selectedSegment === index} // True if this segment is active
            onClick={handleSegmentClick} // Handle segment click
          />
        );

        startAngle = endAngle;
        return segment;
      })}

      {/* Display selected segment value */}

      {selectedSegment !== null && (
        <Text position={[0, -2.5, 1]} fontSize={0.4} color="black">
          Selected: {data[selectedSegment].label} - {data[selectedSegment].value}
        </Text>
      )}
   
   </CanvasLayout>
  );
};

export default PieChart3D;
