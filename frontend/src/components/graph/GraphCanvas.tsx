import { memo, useMemo, type RefObject } from "react";
import { buildEdges, edgePath } from "@/lib/graph";
import { cx } from "@/lib/cx";
import type { PortfolioData } from "@/types/portfolio";
import { GraphNodeView, type NodeState } from "./GraphNodeView";
import s from "./graph.module.css";

interface GraphCanvasProps {
  data: PortfolioData;
  activeIndex: number;
  worldRef: RefObject<SVGGElement>;
  markerRef: RefObject<SVGCircleElement>;
  onSelect: (index: number) => void;
  className?: string;
}

const PILL_BASE_WIDTH = 40;
const STEP_EXTRA_WIDTH = 10;
const CHAR_WIDTH = 7.4;

function GraphCanvasBase({ data, activeIndex, worldRef, markerRef, onSelect, className }: GraphCanvasProps) {
  const { nodes, satellites, owner } = data;
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const nodeById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  const stateOf = (index: number): NodeState =>
    index === activeIndex ? "active" : index < activeIndex ? "visited" : "idle";

  return (
    <svg className={className} role="group" aria-label="Portfolio graph">
      <g ref={worldRef}>
        {edges.map(({ from, to }) => {
          const a = nodes[from];
          const b = nodes[to];
          if (!a || !b) return null;
          const on = from === activeIndex || to === activeIndex;
          return <path key={`${a.id}-${b.id}`} className={cx(s.edge, on && s.edgeActive)} d={edgePath(a.position, b.position)} />;
        })}

        {satellites.map((sat) => {
          const parent = nodeById.get(sat.parentId);
          if (!parent) return null;
          const x = parent.position.x + sat.offset.x;
          const y = parent.position.y + sat.offset.y;
          const width = Math.round(sat.label.length * CHAR_WIDTH + PILL_BASE_WIDTH + (sat.step ? STEP_EXTRA_WIDTH : 0));
          return (
            <g key={`${sat.parentId}-${sat.label}`}>
              <line className={s.tether} x1={parent.position.x} y1={parent.position.y} x2={x} y2={y} />
              <g transform={`translate(${x} ${y})`}>
                <rect className={s.pill} x={-width / 2} y={-15} width={width} height={30} rx={15} />
                {sat.step ? (
                  <>
                    <circle className={s.fillAccent} cx={-width / 2 + 15} cy={0} r={10} />
                    <text className={s.stepNumber} x={-width / 2 + 15} y={4}>{sat.step}</text>
                  </>
                ) : (
                  <circle className={s.fillGrey} cx={-width / 2 + 16} cy={0} r={5} />
                )}
                <text className={s.pillLabel} x={8} y={4}>{sat.label}</text>
              </g>
            </g>
          );
        })}

        <circle ref={markerRef} className={s.marker} r={0} />

        {nodes.map((node, index) => (
          <GraphNodeView key={node.id} node={node} index={index} state={stateOf(index)} initials={owner.initials} onSelect={onSelect} />
        ))}
      </g>
    </svg>
  );
}

export const GraphCanvas = memo(GraphCanvasBase);
