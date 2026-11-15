import { memo, type KeyboardEvent } from "react";
import { LABEL_Y, NodeArt } from "./NodeArt";
import type { GraphNode } from "@/types/portfolio";
import s from "./graph.module.css";

export type NodeState = "idle" | "visited" | "active";

interface GraphNodeViewProps {
  node: GraphNode;
  index: number;
  state: NodeState;
  initials: string;
  onSelect: (index: number) => void;
}

function GraphNodeViewBase({ node, index, state, initials, onSelect }: GraphNodeViewProps) {
  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(index);
    }
  };

  return (
    <g
      className={s.node}
      data-state={state}
      transform={`translate(${node.position.x} ${node.position.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${node.label}: ${node.title}`}
      aria-current={state === "active" ? "step" : undefined}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
    >
      <NodeArt node={node} initials={initials} />
      <text className={s.label} x={0} y={LABEL_Y[node.kind]}>
        {node.label}
      </text>
    </g>
  );
}

export const GraphNodeView = memo(GraphNodeViewBase);
