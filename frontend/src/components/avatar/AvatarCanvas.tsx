"use client";

import { Canvas } from "@react-three/fiber";
import { Component, type MutableRefObject, type ReactNode } from "react";
import type { MotionState } from "@/types/motion";
import { Avatar } from "./Avatar";

interface BoundaryState {
  failed: boolean;
}

/** Keeps the page usable when WebGL is unavailable: the graph works without the avatar. */
class AvatarBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error): void {
    console.error("[avatar] Rendering failed:", error);
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

interface AvatarCanvasProps {
  motion: MutableRefObject<MotionState>;
  className?: string;
}

export default function AvatarCanvas({ motion, className }: AvatarCanvasProps) {
  return (
    <div className={className} aria-hidden="true">
      <AvatarBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 1.5, 8.2], fov: 30 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ camera }) => camera.lookAt(0, 1.25, 0)}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 6, 5]} intensity={2.2} />
          <Avatar motion={motion} />
        </Canvas>
      </AvatarBoundary>
    </div>
  );
}
