import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import OrbitCtrls from '../controls/OrbitControls';
import MovingLight2 from '../lights/MovingLight';

const CanvasLayout = ({ children, bgColor='black'}) => {
  return (
        <Canvas style={{ background: bgColor }}>
            <ambientLight intensity={0.2} />
            <MovingLight2 />
            <OrbitCtrls />
            { children }
        </Canvas>
  )
}

export default CanvasLayout
