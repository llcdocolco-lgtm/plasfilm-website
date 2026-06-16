import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function rand(a, b) { return a + Math.random() * (b - a); }

const PELLET_COLORS = ['#F05A22', '#1A2FA8', '#2A8A4A', '#E8E8E4', '#2A2A2A', '#D12E2E'];

function Pellets({ count = 34 }) {
  const data = useMemo(() => Array.from({ length: count }, () => ({
    position: [rand(-0.95, 1.0), rand(-0.85, -0.45), rand(-0.5, 0.75)],
    scale: rand(0.05, 0.1),
    color: PELLET_COLORS[Math.floor(Math.random() * PELLET_COLORS.length)],
    speed: rand(0.7, 1.6),
  })), [count]);

  return (
    <>
      {data.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={0.5} floatIntensity={0.7} floatingRange={[-0.04, 0.04]}>
          <mesh position={p.position} scale={p.scale} castShadow>
            <sphereGeometry args={[1, 20, 20]} />
            <meshPhysicalMaterial color={p.color} roughness={0.25} clearcoat={0.6} clearcoatRoughness={0.3} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Drum({ position, color, label, radius = 0.42, height = 1.05 }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, height + 0.035, 0]}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, 0.07, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
      </mesh>
      <Text
        position={[0, height / 2 + 0.06, radius + 0.005]}
        fontSize={0.16}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Barrel({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.29, 0.31, 0.78, 32]} />
        <meshStandardMaterial color="#D12E2E" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.05, 32]} />
        <meshStandardMaterial color="#9E1F1F" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

function AdditiveBox({ position }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.85, 0.95, 0.6]} radius={0.04} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#E8E8E4" roughness={0.65} />
      </RoundedBox>
      <Text position={[0, 0.1, 0.305]} fontSize={0.14} color="#333" anchorX="center" anchorY="middle">PVC</Text>
      <Text position={[0, -0.1, 0.305]} fontSize={0.075} color="#555" anchorX="center" anchorY="middle">Additives</Text>
    </group>
  );
}

function Signboard() {
  return (
    <group position={[0, 0.92, -0.35]} rotation={[0, -0.12, 0]}>
      <RoundedBox args={[1.85, 0.74, 0.06]} radius={0.025} smoothness={4} castShadow>
        <meshStandardMaterial color="#0E0E14" roughness={0.55} metalness={0.2} />
      </RoundedBox>
      <mesh position={[-0.9, 0, 0.035]}>
        <boxGeometry args={[0.04, 0.74, 0.02]} />
        <meshStandardMaterial color="#F05A22" />
      </mesh>
      <Text position={[0.06, 0.19, 0.04]} fontSize={0.145} color="#F05A22" letterSpacing={0.03} anchorX="center" anchorY="middle">
        PLASFILM S.A.S.
      </Text>
      <Text position={[0.06, -0.03, 0.04]} fontSize={0.082} color="#C8C8D2" letterSpacing={0.07} anchorX="center" anchorY="middle">
        BOGOTA · COLOMBIA
      </Text>
      <Text position={[0.06, -0.25, 0.04]} fontSize={0.07} color="white" letterSpacing={0.09} anchorX="center" anchorY="middle">
        CALIDAD INTERNACIONAL
      </Text>
    </group>
  );
}

function Rig() {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.22 - 0.1, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.1, 0.04);
  });

  return (
    <group ref={group}>
      <Drum position={[-0.7, -0.6, -0.5]} color="#1A2FA8" label="TiO2" radius={0.34} height={0.82} />
      <Drum position={[0.42, -0.65, -0.85]} color="#C8820A" label="DOP" radius={0.3} height={0.74} />
      <AdditiveBox position={[-0.15, -0.58, 0.35]} />
      <Barrel position={[0.95, -0.68, -0.2]} />
      <Pellets count={28} />
      <Signboard />
    </group>
  );
}

export default function PolymerScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0.35, 5.6], fov: 30 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-2.5, 1, 2]} intensity={0.7} color="#F05A22" />
      <pointLight position={[2, 1.5, -1]} intensity={0.4} color="#1A2FA8" />
      <Rig />
      <ContactShadows position={[0, -1.08, 0]} opacity={0.55} scale={5} blur={2.6} far={2} />
    </Canvas>
  );
}
