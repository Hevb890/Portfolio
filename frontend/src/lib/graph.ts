import type { GraphNode, Point } from "@/types/portfolio";

export const COMPACT_BREAKPOINT = 700;
export const SCROLL_VH_PER_NODE = 110;

export interface Edge {
  from: number;
  to: number;
}

export interface CameraPose {
  transform: string;
  /** Interpolated world position of the travelling marker. */
  x: number;
  y: number;
  /** Eased progress (0-1) between two nodes. */
  segmentT: number;
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export function computeCameraPose(
  nodes: readonly GraphNode[],
  progress: number,
  viewportWidth: number,
  viewportHeight: number,
): CameraPose {
  const compact = viewportWidth < COMPACT_BREAKPOINT;
  const last = nodes.length - 1;
  const firstNode = nodes[0];
  if (!firstNode) return { transform: "", x: 0, y: 0, segmentT: 0 };

  const position = clamp(progress, 0, 1) * last;
  const index = Math.min(Math.max(last - 1, 0), Math.floor(position));
  const t = last > 0 ? easeInOut(position - index) : 0;
  const from = (nodes[index] ?? firstNode).position;
  const to = (nodes[index + 1] ?? nodes[index] ?? firstNode).position;

  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;
  const scale = (compact ? 0.75 : 1.1) - Math.sin(t * Math.PI) * 0.25;
  const tx = viewportWidth / 2 + (compact ? 0 : viewportWidth * 0.06) - x * scale;
  const ty = viewportHeight * (compact ? 0.5 : 0.45) - y * scale;

  return { transform: `translate(${tx} ${ty}) scale(${scale})`, x, y, segmentT: t };
}

export function edgePath(a: Point, b: Point): string {
  const mid = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${mid},${a.y} ${mid},${b.y} ${b.x},${b.y}`;
}

export function buildEdges(nodes: readonly GraphNode[]): Edge[] {
  const indexById = new Map(nodes.map((node, index) => [node.id, index]));
  return nodes.flatMap((node, from) =>
    node.links.flatMap((id) => {
      const to = indexById.get(id);
      return to === undefined ? [] : [{ from, to }];
    }),
  );
}

/** Nodes directly connected to `index`, in either direction. */
export function getNeighbors(nodes: readonly GraphNode[], index: number): GraphNode[] {
  const current = nodes[index];
  if (!current) return [];
  const ids = new Set(current.links);
  for (const node of nodes) if (node.links.includes(current.id)) ids.add(node.id);
  return nodes.filter((node) => ids.has(node.id));
}

export function detailPositions(parent: Point, count: number): Point[] {
  const startDeg = 50;
  const endDeg = 100;
  return Array.from({ length: count }, (_, i) => {
    const deg = count === 1 ? 90 : startDeg + (i * (endDeg - startDeg)) / (count - 1);
    const radius = i % 2 === 0 ? 210 : 290;
    const rad = (deg * Math.PI) / 180;
    return { x: parent.x + Math.cos(rad) * radius, y: parent.y + Math.sin(rad) * radius };
  });
}
