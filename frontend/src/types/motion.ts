/** Mutable scroll-motion snapshot shared with the 3D avatar without causing React re-renders. */
export interface MotionState {
  /** Smoothed scroll speed, 0 (still) to 1 (fast). */
  velocity: number;
  direction: 1 | -1;
  /** True when the viewport rests on a node. */
  atNode: boolean;
}
