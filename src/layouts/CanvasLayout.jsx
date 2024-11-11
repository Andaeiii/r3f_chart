import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import OrbitCtrls from '../controls/OrbitControls';
import MovingLight2 from '../lights/MovingLight';
import AnimatedCamera from '../cameras/AnimatedCamera';

const CanvasLayout = ({ children, bgColor='black', bg=true}) => {
  return (
        <Canvas style={{ background: bg && bgColor }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 5]} intensity={0.1} />
            <AnimatedCamera zPos={4}/>
            <MovingLight2 />
            <OrbitCtrls />
            { children }
        </Canvas>
  )
}

export default CanvasLayout
