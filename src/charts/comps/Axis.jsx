import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';


//the x and y axis here..... 
const Axis = () => {
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  useFrame(() => {
    if (xAxisRef.current) {
      xAxisRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (yAxisRef.current) {
      yAxisRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  //the xAxis line.... 

  const xAxisPoints = [
    new THREE.Vector3(-7.5, 0, 0),
    new THREE.Vector3(7.5, 0, 0),
  ];
  const xAxisGeometry = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
  const xAxisMaterial = new THREE.LineBasicMaterial({ color: 'white' });
  const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);

  //the yAxis line.... 

  const yAxisPoints = [
    new THREE.Vector3(-7.5, 15, 0),   
    new THREE.Vector3(-7.5, 5, 0),   
  ];
  const yAxisGeometry = new THREE.BufferGeometry().setFromPoints(yAxisPoints);
  const yAxisMaterial = new THREE.LineBasicMaterial({ color: 'white' });
  const yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);

  return (
    <>
      <primitive ref={xAxisRef} object={xAxisLine} />
      <primitive ref={yAxisRef} object={yAxisLine} position={[0, -5, 0]} />
    </>
  );
};


export default Axis;