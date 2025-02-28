import React, { useMemo, useRef, useState, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import CanvasLayout from "../layouts/CanvasLayout";
import PieSegment from "./comps/PieSegment";

 

// Main 3D Pie Chart component
const PieChart3D = ({sdata:data}) => {
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

      
        <Text position={[0, -2.5, 1]} fontSize={0.4} color="black">
          { 
          selectedSegment !== null 
                            ? `Selected: ${data[selectedSegment].label} - ${data[selectedSegment].value}`
                            : 'Click on Any Segment'
          }
        </Text>
      
   
   </CanvasLayout>
  );
};

export default PieChart3D;
