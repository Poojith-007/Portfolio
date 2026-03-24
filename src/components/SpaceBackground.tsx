import { useRef, useMemo, useEffect, FC } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useGravity } from '../context/GravityContext';

const Particles: FC<{ gravityEnabled: boolean }> = ({ gravityEnabled }) => {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0, active: false });
  const time = useRef(0);
  
  // Track global mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.active = true;
    };
    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Create 2000 particles with structural shapes
  const [positions, ring, box, spiral, sphere] = useMemo(() => {
    const count = 2000;
    const p = new Float32Array(count * 3);
    const rArray = new Float32Array(count * 3);
    const bArray = new Float32Array(count * 3);
    const spArray = new Float32Array(count * 3);
    const sphArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const t = i / count;

      // Initial wide spread covering ultra-wide monitors with more depth
      p[idx] = (Math.random() - 0.5) * 120;
      p[idx+1] = (Math.random() - 0.5) * 80;
      p[idx+2] = (Math.random() - 0.5) * 80 - 20;

      // Shape 1: Ring (Q1: top-right)
      const ringRadius = 4;
      const ringAngle = t * Math.PI * 2;
      rArray[idx] = Math.cos(ringAngle) * ringRadius;
      rArray[idx+1] = Math.sin(ringAngle) * ringRadius;
      rArray[idx+2] = (Math.random() - 0.5) * 0.5; // slight thickness

      // Shape 2: Cube Edge/Surface (Q2: top-left)
      const size = 6;
      const face = Math.floor(Math.random() * 6);
      let cx = (Math.random() - 0.5) * size;
      let cy = (Math.random() - 0.5) * size;
      let cz = (Math.random() - 0.5) * size;
      if (face === 0) cx = size/2; else if (face === 1) cx = -size/2;
      else if (face === 2) cy = size/2; else if (face === 3) cy = -size/2;
      else if (face === 4) cz = size/2; else if (face === 5) cz = -size/2;
      bArray[idx] = cx; bArray[idx+1] = cy; bArray[idx+2] = cz;

      // Shape 3: DNA Double Helix / Spiral (Q3: bottom-left)
      const loops = 4;
      const spiralAngle = t * Math.PI * 2 * loops;
      const isSecondStrand = i % 2 === 0;
      const helixRadius = 2.5;
      spArray[idx] = Math.cos(spiralAngle + (isSecondStrand ? Math.PI : 0)) * helixRadius;
      spArray[idx+1] = (t - 0.5) * 12; // vertical height
      spArray[idx+2] = Math.sin(spiralAngle + (isSecondStrand ? Math.PI : 0)) * helixRadius;

      // Shape 4: Sphere Surface (Q4: bottom-right)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const sphereRadius = 3.5;
      sphArray[idx] = sphereRadius * Math.sin(phi) * Math.cos(theta);
      sphArray[idx+1] = sphereRadius * Math.sin(phi) * Math.sin(theta);
      sphArray[idx+2] = sphereRadius * Math.cos(phi);
    }
    return [p, rArray, bArray, spArray, sphArray];
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    time.current += delta;
    
    // Parallax & Gravity Rotation
    if (gravityEnabled) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.02;
    }

    const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;
    const targetX = (mousePos.current.x * viewport.width) / 2;
    const targetY = (mousePos.current.y * viewport.height) / 2;
    
    const lerpSpeed = delta * 5;
    let needsUpdate = false;

    // Which shape to use based on mouse quadrant
    let targetShape = ring;
    if (targetX < 0 && targetY > 0) targetShape = box;
    else if (targetX < 0 && targetY < 0) targetShape = spiral;
    else if (targetX > 0 && targetY < 0) targetShape = sphere;

    for (let i = 0; i < 2000; i++) {
      const idx = i * 3;
      
      const pX = positionsArray[idx];
      const pY = positionsArray[idx+1];
      const pZ = positionsArray[idx+2];

      const dxToMouse = targetX - pX;
      const dyToMouse = targetY - pY;
      const distToMouse = Math.hypot(dxToMouse, dyToMouse);

      // Default animation: Beautiful slow moving space
      let nextX = pX;
      let nextY = pY + Math.sin(time.current * 0.5 + pX * 0.1) * delta * 0.5; // slight wave
      let nextZ = pZ + delta * 8; // continuous forward motion
      
      // If a star flies past the camera, reset it far away
      if (nextZ > 10) {
        positionsArray[idx] = (Math.random() - 0.5) * 120;
        positionsArray[idx+1] = (Math.random() - 0.5) * 80;
        positionsArray[idx+2] = -60 - Math.random() * 40;
        needsUpdate = true;
        continue;
      }

      // Local Attraction to shape
      if (mousePos.current.active && distToMouse < 20) {
        // Rotate shapes dynamically
        const sX = targetShape[idx];
        const sY = targetShape[idx+1];
        const sZ = targetShape[idx+2];

        // 3D Rotation matrices to spin shapes beautifully
        const rotY_X = sX * Math.cos(time.current) - sZ * Math.sin(time.current);
        const rotY_Z = sX * Math.sin(time.current) + sZ * Math.cos(time.current);
        const rotX_Y = sY * Math.cos(time.current*0.5) - rotY_Z * Math.sin(time.current*0.5);
        const rotX_Z = sY * Math.sin(time.current*0.5) + rotY_Z * Math.cos(time.current*0.5);

        const destX = targetX + rotY_X;
        const destY = targetY + rotX_Y;
        const destZ = rotX_Z;

        positionsArray[idx] += (destX - pX) * lerpSpeed;
        positionsArray[idx+1] += (destY - pY) * lerpSpeed;
        positionsArray[idx+2] += (destZ - pZ) * lerpSpeed;
      } else {
        // Just fly and wave forward
        positionsArray[idx] = nextX;
        positionsArray[idx+1] = nextY;
        positionsArray[idx+2] = nextZ;
      }
      
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      ref.current.geometry.attributes.position.needsUpdate = true;
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
        dpr={[1, 1.5]} // Optimize DPR to prevent frame drops
        gl={{ powerPreference: "high-performance", antialias: false }} // Better performance
      >
        <ambientLight intensity={0.5} />
        {/* Reduced count and optimized stars to prevent stutter */}
        <Stars radius={150} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Particles gravityEnabled={gravityEnabled} />
      </Canvas>
    </div>
  );
};
