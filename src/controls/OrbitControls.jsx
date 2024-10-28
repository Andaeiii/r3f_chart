import React from 'react';
import { OrbitControls, Text } from '@react-three/drei';

const OrbitCtrls = () => {
  return (
    <OrbitControls
        rotateSpeed={0.2} // Adjust to slow down rotation
        zoomSpeed={0.5}   // Adjust to slow down zooming
        panSpeed={0.5}    // Adjust to slow down panning
    />
  )
}

export default OrbitCtrls;
