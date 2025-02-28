import React, { useMemo, useRef, useState, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
 
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

export default PieSegment;