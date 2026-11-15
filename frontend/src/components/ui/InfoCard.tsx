import type { GraphNode } from "@/types/portfolio";
import s from "../experience.module.css";

interface InfoCardProps {
  node: GraphNode;
  neighbors: readonly GraphNode[];
  onSelect: (id: string) => void;
}

export function InfoCard({ node, neighbors, onSelect }: InfoCardProps) {
  return (
    <section className={s.card} aria-live="polite" aria-labelledby="node-title">
      <small className={s.cardKicker}>{node.label}</small>
      <h2 id="node-title" className={s.cardTitle}>{node.title}</h2>
      <p className={s.cardText}>{node.summary}</p>
      <dl className={s.metrics}>
        {node.metrics.map((metric) => (
          <div key={metric.label} className={s.metric}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      {neighbors.length > 0 && (
        <div className={s.links}>
          {neighbors.map((neighbor) => (
            <button key={neighbor.id} type="button" className={s.linkButton} onClick={() => onSelect(neighbor.id)}>
              → {neighbor.title}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
