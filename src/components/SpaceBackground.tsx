import { useRef, useMemo, FC } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useGravity } from '../context/GravityContext';


const Particles: FC<{ gravityEnabled: boolean }> = ({ gravityEnabled }) => {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Create 1500 particles
  const [positions] = useMemo(() => {
    const p = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
    }
    return [p];
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    if (gravityEnabled) {
      // Rotation
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.02;

      // Parallax based on mouse
      const targetX = (state.pointer.x * viewport.width) / 10;
      const targetY = (state.pointer.y * viewport.height) / 10;
      
      ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

export const SpaceBackground: FC = () => {
  const { gravityEnabled } = useGravity();
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas 
        fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#050510] to-[#000] w-full h-full" />}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Particles gravityEnabled={gravityEnabled} />
      </Canvas>
    </div>
  );
};
