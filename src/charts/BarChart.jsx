import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; 
import AnimatedCamera from '../cameras/AnimatedCamera';
import MovingLight from '../lights/MovingLight';

import Bar from './comps/Bar';
import Axis from './comps/Axis';
import Labels from './comps/Labels';
import { Leva, useControls } from 'leva';


const data = [
  { label: 'rice', value: 90, color: '#ff5733' },
  { label: 'beans', value: 20, color: '#33ff57' },
  { label: 'garri', value: 75, color: '#3357ff' },
  { label: 'flour', value: 95, color: '#ff33a1' },
  { label: 'millet', value: 129, color: '#33ff57' }, 
  { label: 'corn', value: 115, color: '#3357ff' },
  { label: 'amala', value: 90, color: '#ff33a1' } 
];


 



//the plane here...... 
const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[15, 10]} />
      <meshStandardMaterial  color="blue"  side={THREE.DoubleSide} />          
    </mesh>
  );
};







//the barchat component itself.... 
const BarChart = () => {
  const maxVal = Math.max(...data.map(item => item.value));

  useControls({
    //students:{value:10, min:20, max:40, step:1, onEditEnd:(v)=>v}
  })

  return (

    <>
    
    <Leva /> 

    <Canvas  
      style={{ background: 'transparent' }}
      gl={{ alpha: true }} // Ensure the WebGLRenderer has alpha enabled
      camera={{ position: [0, 2, 10], fov: 75 }}
    >

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 5, 5]} intensity={0.1} />
      <MovingLight />
      <OrbitControls />

      <Plane />
      <Axis />
      <Labels data={data} /> 
      <AnimatedCamera />

      {data.map((item, index) => {
        const height = (item.value / maxVal) * 5;
        let xpos = (index * 1.5 - (data.length * 1.5) / 2) + 0.5;
        const position = [
          xpos, //index * 1.5 - data.length / 2, // x position
          height / 2, // y position
          0 // z position
        ];
        const color = new THREE.Color(item.color || '#3498db');
        return <Bar key={item.label} position={position} height={height} color={color} />;
      })}
    </Canvas>

    </>
  );
};

export default BarChart;
