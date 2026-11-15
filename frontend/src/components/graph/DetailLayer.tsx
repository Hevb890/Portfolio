import { memo, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { detailPositions } from "@/lib/graph";
import type { DetailItem, DetailKind, GraphNode } from "@/types/portfolio";
import s from "./graph.module.css";

const WIDTH = 150;
const HEIGHT = 46;

export const KIND_LABEL: Record<DetailKind, string> = {
  article: "Article",
  talk: "Talk",
  paper: "Paper",
};

function Glyph({ kind }: { kind: DetailKind }) {
  switch (kind) {
    case "article":
      return <path className={s.iconInk} d="M-6 -5h12M-6 0h12M-6 5h7" />;
    case "talk":
      return <path className={s.iconInk} d="M-8 -6h16v10h-9l-5 4v-4h-2z" strokeWidth={2.5} />;
    case "paper":
      return <path className={s.iconInk} d="M-5 -8h7l4 4v12h-11zM-2 1h5M-2 5h5" strokeWidth={2.5} />;
  }
}

interface DetailCardProps {
  item: DetailItem;
  x: number;
  y: number;
  visible: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}

const DetailCard = memo(function DetailCard({ item, x, y, visible, selected, onSelect }: DetailCardProps) {
  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(item.id);
    }
  };

  return (
    <g
      className={s.detail}
      data-visible={visible}
      data-selected={selected}
      transform={`translate(${x} ${y})`}
      role="button"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      aria-pressed={selected}
      aria-label={`${KIND_LABEL[item.kind]}: ${item.label}`}
      onClick={() => onSelect(item.id)}
      onKeyDown={handleKeyDown}
    >
      <g className={s.detailBody}>
        <rect className={cx(s.fillCard, s.outline)} x={-WIDTH / 2} y={-HEIGHT / 2} width={WIDTH} height={HEIGHT} rx={14} />
        <rect className={s.fillMint} x={-WIDTH / 2 + 8} y={-14} width={28} height={28} rx={8} />
        <g transform={`translate(${-WIDTH / 2 + 22} 0)`}>
          <Glyph kind={item.kind} />
        </g>
        <text className={s.detailLabel} x={-WIDTH / 2 + 44} y={-3}>{item.label}</text>
        <text className={s.detailMeta} x={-WIDTH / 2 + 44} y={12}>{item.year} · {KIND_LABEL[item.kind]}</text>
      </g>
    </g>
  );
});

interface DetailLayerProps {
  node: GraphNode;
  /** True while the parent node is the active stop. */
  visible: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** Fans a node's detail items around it and tethers each to the parent. */
export function DetailLayer({ node, visible, selectedId, onSelect }: DetailLayerProps) {
  const details = node.details ?? [];
  const positions = detailPositions(node.position, details.length);

  return (
    <g>
      {details.map((item, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <line
            key={`tether-${item.id}`}
            className={cx(s.tether, s.tetherDetail)}
            data-visible={visible}
            x1={node.position.x}
            y1={node.position.y}
            x2={pos.x}
            y2={pos.y}
          />
        );
      })}
      {details.map((item, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <DetailCard key={item.id} item={item} x={pos.x} y={pos.y} visible={visible} selected={item.id === selectedId} onSelect={onSelect} />
        );
      })}
    </g>
  );
}