import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

//the animated camera here........
const AnimatedCamera = ({zPos=10}) => {
    const { camera } = useThree();
    const [isMouseDown, setIsMouseDown] = React.useState(false);

    useFrame(({ clock }) => {
        if (!isMouseDown) {
        const time = clock.getElapsedTime();
        const x = Math.sin(time) * zPos * 0.5;
        camera.position.set(x, 2, zPos);
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

export default AnimatedCamera
