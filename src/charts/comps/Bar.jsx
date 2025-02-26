import React, { useRef, useEffect, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

const Bar = ({ position, height, color }) => {
  const meshRef = useRef();

  // Animate on mount from height 0 to the initial height
  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(
        meshRef.current.scale,
        { y: 0 },
        {
          y: height,
          duration: 1.5,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        meshRef.current.position,
        { y: 0 },
        {
          y: height / 2,
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  // Animate height updates when the height prop changes
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        y: height,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(meshRef.current.position, {
        y: height / 2,
        duration: 2,
        ease: 'power2.out',
      });
    }
  }, [height]);

  return (
    <mesh ref={meshRef} position={position} scale={[1, height, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default memo(Bar);
