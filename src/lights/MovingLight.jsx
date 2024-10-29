import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber'; 

//create the moving light here....
const MovingLight = () => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time) * 5;
    lightRef.current.position.set(x, 3, 5);
  });

  return <pointLight ref={lightRef} intensity={6} distance={10} color="white" />;
};

export default MovingLight;