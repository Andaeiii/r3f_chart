import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

//the labels here.... 
const Labels = ({data }) => {
    const { scene } = useThree();
    const fontLoader = useRef(new FontLoader());
  
    useEffect(() => {
      fontLoader.current.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        data.forEach((item, index) => {
          const textGeometry = new TextGeometry(item.label, { font, size: 0.23, height: 0.1, });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
          let xpos = index * 1.5 - (data.length * 1.5) / 2;
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(xpos, -0.5, 0);
          scene.add(textMesh);
        });
  
        for (let i = 0; i <= 5; i++) {
          const valueLabel = i * 20;
          const textGeometry = new TextGeometry(valueLabel.toString(), {
            font,
            size: 0.2,
            height: 0.1,
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(-8.0, (valueLabel / 100) * 5, 0);   //7.5 - BEING THE MAIN POINT.....
          scene.add(textMesh);
        }
      });
    }, [scene]);
  
    return null;
};
  
export default Labels;