import { KIND_LABEL } from "@/components/graph/DetailLayer";
import type { DetailItem, GraphNode } from "@/types/portfolio";
import s from "../experience.module.css";

interface InfoCardProps {
  node: GraphNode;
  neighbors: readonly GraphNode[];
  /** Currently selected detail item of `node`, if any. */
  detail: DetailItem | null;
  onSelect: (id: string) => void;
  onSelectDetail: (id: string | null) => void;
}

export function InfoCard({ node, neighbors, detail, onSelect, onSelectDetail }: InfoCardProps) {
  if (detail) {
    return (
      <section className={s.card} aria-live="polite" aria-labelledby="node-title">
        <small className={s.cardKicker}>{KIND_LABEL[detail.kind]} · {detail.year}</small>
        <h2 id="node-title" className={s.cardTitle}>{detail.label}</h2>
        <p className={s.cardMeta}>{detail.venue}</p>
        <p className={s.cardText}>{detail.summary}</p>
        <div className={s.links}>
          {detail.url ? (
            <a className={s.linkPrimary} href={detail.url} target="_blank" rel="noopener noreferrer">Read →</a>
          ) : null}
          <button type="button" className={s.linkButton} onClick={() => onSelectDetail(null)}>
            ← Back to {node.label}
          </button>
        </div>
      </section>
    );
  }

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
      {node.details?.length ? (
        <>
          <p className={s.sectionLabel}>Explore</p>
          <div className={s.links}>
            {node.details.map((item) => (
              <button key={item.id} type="button" className={s.linkButton} onClick={() => onSelectDetail(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
      {neighbors.length > 0 && (
        <div className={s.links} style={{ marginTop: node.details?.length ? 12 : 0 }}>
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