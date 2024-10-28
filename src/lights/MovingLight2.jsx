import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; 

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


  export default MovingLight2;