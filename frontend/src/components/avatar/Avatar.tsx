import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject, type ReactNode } from "react";
import { MathUtils, type Group, type Vector3Tuple } from "three";
import type { MotionState } from "@/types/motion";

const COLORS = {
  skin: "#f1c7a5",
  hair: "#3a403c",
  shirt: "#2f8f5b",
  trousers: "#7b857f",
  shoes: "#2a2f2c",
  ink: "#111111",
} as const;

const ARM_REST = 0.25;
const ARM_WAVE = 2.6;
const FACE_NODE_YAW = -0.35;
const TRAVEL_YAW = 1.1;

function Part({ position, color, children }: { position?: Vector3Tuple; color: string; children: ReactNode }) {
  return (
    <mesh position={position}>
      {children}
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  );
}

interface AvatarProps {
  motion: MutableRefObject<MotionState>;
}

/** Stylised guide character: walks while the page scrolls and waves when it rests on a node. */
export function Avatar({ motion }: AvatarProps) {
  const root = useRef<Group>(null);
  const head = useRef<Group>(null);
  const armRight = useRef<Group>(null);
  const armLeft = useRef<Group>(null);
  const legRight = useRef<Group>(null);
  const legLeft = useRef<Group>(null);
  const phase = useRef(0);

  useFrame((state, delta) => {
    const body = root.current;
    if (!body || !head.current || !armRight.current || !armLeft.current || !legRight.current || !legLeft.current) return;

    const { velocity, direction, atNode } = motion.current;
    const time = state.clock.elapsedTime;
    phase.current += delta * (4 + velocity * 10);
    const swing = Math.sin(phase.current) * velocity;

    const targetYaw = atNode ? FACE_NODE_YAW : velocity > 0.05 ? direction * TRAVEL_YAW : body.rotation.y;
    body.rotation.y = MathUtils.damp(body.rotation.y, targetYaw, 6, delta);
    body.position.y = Math.sin(time * 2) * 0.03 + Math.abs(swing) * 0.08;

    legRight.current.rotation.x = swing * 0.7;
    legLeft.current.rotation.x = -swing * 0.7;
    armLeft.current.rotation.z = -ARM_REST - swing * 0.3;
    const armTarget = atNode ? ARM_WAVE + Math.sin(time * 9) * 0.3 : ARM_REST + swing * 0.3;
    armRight.current.rotation.z = MathUtils.damp(armRight.current.rotation.z, armTarget, 8, delta);
    head.current.rotation.y = atNode ? 0 : Math.sin(time * 0.8) * 0.1;
  });

  return (
    <group ref={root}>
      <Part position={[0, 1.15, 0]} color={COLORS.shirt}>
        <cylinderGeometry args={[0.42, 0.5, 1, 24]} />
      </Part>

      <group ref={legRight} position={[0.2, 0.7, 0]}>
        <Part position={[0, -0.35, 0]} color={COLORS.trousers}><cylinderGeometry args={[0.13, 0.13, 0.7, 12]} /></Part>
        <Part position={[0, -0.72, 0.08]} color={COLORS.shoes}><boxGeometry args={[0.24, 0.12, 0.4]} /></Part>
      </group>
      <group ref={legLeft} position={[-0.2, 0.7, 0]}>
        <Part position={[0, -0.35, 0]} color={COLORS.trousers}><cylinderGeometry args={[0.13, 0.13, 0.7, 12]} /></Part>
        <Part position={[0, -0.72, 0.08]} color={COLORS.shoes}><boxGeometry args={[0.24, 0.12, 0.4]} /></Part>
      </group>

      <group ref={head} position={[0, 2.05, 0]}>
        <Part color={COLORS.skin}><sphereGeometry args={[0.4, 28, 28]} /></Part>
        <Part position={[0, 0.04, -0.03]} color={COLORS.hair}>
          <sphereGeometry args={[0.43, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </Part>
        {[-0.15, 0.15].map((x) => (
          <group key={x}>
            <Part position={[x, 0.03, 0.36]} color={COLORS.ink}><sphereGeometry args={[0.05, 10, 10]} /></Part>
            <Part position={[x, 0.03, 0.37]} color={COLORS.ink}><torusGeometry args={[0.1, 0.015, 8, 20]} /></Part>
          </group>
        ))}
      </group>

      <group ref={armRight} position={[0.58, 1.55, 0]}>
        <Part position={[0, -0.4, 0]} color={COLORS.shirt}><cylinderGeometry args={[0.1, 0.1, 0.8, 12]} /></Part>
        <Part position={[0, -0.82, 0]} color={COLORS.skin}><sphereGeometry args={[0.12, 12, 12]} /></Part>
      </group>
      <group ref={armLeft} position={[-0.58, 1.55, 0]}>
        <Part position={[0, -0.4, 0]} color={COLORS.shirt}><cylinderGeometry args={[0.1, 0.1, 0.8, 12]} /></Part>
        <Part position={[0, -0.82, 0]} color={COLORS.skin}><sphereGeometry args={[0.12, 12, 12]} /></Part>
      </group>
    </group>
  );
}
