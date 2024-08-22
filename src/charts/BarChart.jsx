import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const data = [
  { label: 'rice', value: 20, color: '#ff5733' },
  { label: 'beans', value: 70, color: '#33ff57' },
  { label: 'garri', value: 35, color: '#3357ff' },
  { label: 'flour', value: 115, color: '#ff33a1' },
  { label: 'millet', value: 89, color: '#33ff57' },
  { label: 'corn', value: 25, color: '#3357ff' },
  { label: 'amala', value: 90, color: '#ff33a1' } 
];



//make the bars here... 
const Bar = ({ position, height, color }) => {
  const meshRef = useRef();
  const [targetHeight, setTargetHeight] = React.useState(height);

  React.useEffect(() => {
    setTargetHeight(height);
  }, [height]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y += (targetHeight - meshRef.current.scale.y) * 0.1;
      meshRef.current.position.y = meshRef.current.scale.y / 2; // Position on the horizontal plane
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, height, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};




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

//the plane here...... 
const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[15, 10]} />
      <meshStandardMaterial 
          color="blue" 
          side={THREE.DoubleSide}   //ensure the material is on both sides.....
       />
    </mesh>
  );
};

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


//the labels here.... 
const Labels = () => {
  const { scene } = useThree();
  const fontLoader = useRef(new FontLoader());

  useEffect(() => {
    fontLoader.current.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      data.forEach((item, index) => {
        
        const textGeometry = new TextGeometry(item.label, { font, size: 0.23, height: 0.1, });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

        let xpos = index * 1.5 - (data.length * 1.5) / 2;

        console.log("xpos", xpos )

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


//the animated camera here........
const AnimatedCamera = () => {
  const { camera } = useThree();
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  useFrame(({ clock }) => {
    if (!isMouseDown) {
      const time = clock.getElapsedTime();
      const x = Math.sin(time) * 10;
      camera.position.set(x, 2, 10);
      camera.lookAt(0, 0, 0);
    }
  });

  React.useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return null;
};


//the barchat component itself.... 
const BarChart = () => {
  const maxVal = Math.max(...data.map(item => item.value));

  return (
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
      <Labels />
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
  );
};

export default BarChart;
