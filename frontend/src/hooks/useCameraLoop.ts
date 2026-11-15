"use client";

import { useEffect, type MutableRefObject, type RefObject } from "react";
import { clamp, computeCameraPose } from "@/lib/graph";
import type { MotionState } from "@/types/motion";
import type { GraphNode } from "@/types/portfolio";

interface CameraLoopOptions {
  nodes: readonly GraphNode[];
  worldRef: RefObject<SVGGElement>;
  markerRef: RefObject<SVGCircleElement>;
  barRef: RefObject<HTMLDivElement>;
  motion: MutableRefObject<MotionState>;
  onActiveChange: (index: number) => void;
}

/**
 * Drives the 2D camera from window scroll. DOM updates are applied imperatively
 * each frame so scrolling never triggers React renders; React state only changes
 * when the active node changes.
 */
export function useCameraLoop({
  nodes,
  worldRef,
  markerRef,
  barRef,
  motion,
  onActiveChange,
}: CameraLoopOptions): void {
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let lastActive = -1;
    const last = nodes.length - 1;

    const tick = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      const progress = clamp(y / maxScroll, 0, 1);
      velocity += (Math.min(1, Math.abs(delta) / 30) - velocity) * 0.15;

      const pose = computeCameraPose(nodes, progress, window.innerWidth, window.innerHeight);
      worldRef.current?.setAttribute("transform", pose.transform);

      const marker = markerRef.current;
      if (marker) {
        marker.setAttribute("cx", String(pose.x));
        marker.setAttribute("cy", String(pose.y));
        marker.setAttribute("r", pose.segmentT > 0 && pose.segmentT < 1 ? "9" : "0");
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;

      const exact = progress * last;
      motion.current.velocity = velocity;
      motion.current.direction = delta < 0 ? -1 : delta > 0 ? 1 : motion.current.direction;
      motion.current.atNode = Math.abs(exact - Math.round(exact)) < 0.1 && velocity < 0.15;

      const active = Math.round(exact);
      if (active !== lastActive) {
        lastActive = active;
        onActiveChange(active);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [nodes, worldRef, markerRef, barRef, motion, onActiveChange]);
}
