import { useEffect, useRef } from "react";
import { KIND_LABEL } from "@/components/graph/DetailLayer";
import type { DetailItem, GraphNode } from "@/types/portfolio";
import s from "../experience.module.css";
import { getCollectionStats, getTopTechnologies } from "@/lib/projects";

interface InfoCardProps {
  node: GraphNode;
  neighbors: readonly GraphNode[];
  /** Currently selected detail item of `node`, if any. */
  detail: DetailItem | null;
  onSelect: (id: string) => void;
  onSelectDetail: (id: string | null) => void;
  onOpenProjects: () => void;
}

export function InfoCard({ node, neighbors, detail, onSelect, onSelectDetail, onOpenProjects }: InfoCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // The card scrolls, so return to the top whenever its content changes.
  useEffect(() => {
    cardRef.current?.scrollTo({ top: 0 });
  }, [node.id, detail?.id]);

  if (detail) {
    return (
      <section ref={cardRef} className={s.card} tabIndex={0} aria-live="polite" aria-labelledby="node-title">
        <small className={s.cardKicker}>{KIND_LABEL[detail.kind]} · {detail.year}</small>
        <h2 id="node-title" className={s.cardTitle}>{detail.title}</h2>
        <p className={s.cardMeta}>{detail.venue}</p>
        <p className={s.cardText}>{detail.summary}</p>
        {detail.awards?.length ? (
          <>
            <p className={s.sectionLabel}>Awards</p>
            <ul className={s.awards}>
              {detail.awards.map((award) => (
                <li key={award} className={s.award}>{award}</li>
              ))}
            </ul>
          </>
        ) : null}
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

  const stats = node.collection ? getCollectionStats(node.collection) : node.metrics;
  const technologies = node.collection ? getTopTechnologies(node.collection, 8) : null;

  return (
    <section ref={cardRef} className={s.card} tabIndex={0} aria-live="polite" aria-labelledby="node-title">
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
      {technologies ? (
        <>
          <p className={s.sectionLabel}>Technologies used</p>
          <ul className={s.tech}>
            {technologies.top.map((tech) => (
              <li key={tech} className={s.techChip}>{tech}</li>
            ))}
            {technologies.remaining > 0 && <li className={s.techChip}>+{technologies.remaining} more</li>}
          </ul>
          <div className={s.links} style={{ margin: "12px 0" }}>
            <button type="button" className={s.linkPrimary} aria-haspopup="dialog" onClick={onOpenProjects}>
              Open projects →
            </button>
          </div>
        </>
      ) : null}
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