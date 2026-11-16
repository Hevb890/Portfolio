"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GraphCanvas } from "@/components/graph/GraphCanvas";
import { InfoCard } from "@/components/ui/InfoCard";
import { useCameraLoop } from "@/hooks/useCameraLoop";
import { SCROLL_VH_PER_NODE, getNeighbors } from "@/lib/graph";
import { scrollToNode } from "@/lib/scroll";
import type { MotionState } from "@/types/motion";
import type { PortfolioData } from "@/types/portfolio";
import s from "./experience.module.css";
import { ProjectsDialog } from "@/components/ui/ProjectsDialog";

// three.js needs the browser, so the avatar is loaded on the client only.
const AvatarCanvas = dynamic(() => import("@/components/avatar/AvatarCanvas"), { ssr: false });

export default function PortfolioExperience({ data }: { data: PortfolioData }) {
  const { nodes, owner } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  const worldRef = useRef<SVGGElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const motion = useRef<MotionState>({ velocity: 0, direction: 1, atNode: true });
  const [detailId, setDetailId] = useState<string | null>(null);

  const [projectsOpen, setProjectsOpen] = useState(false);
  const activeRef = useRef(0);

  const selectNode = useCallback(
    (index: number) => {
      if (index === activeRef.current && nodes[index]?.collection) {
        setProjectsOpen(true);
        return;
      }
      scrollToNode(index, nodes.length);
    },
    [nodes],
  );

  const closeProjects = useCallback(() => setProjectsOpen(false), []);

  const handleActiveChange = useCallback((index: number) => {
    activeRef.current = index;
    setActiveIndex(index);
    setDetailId(null); // leaving a node closes its detail view
  }, []);

  useCameraLoop({ nodes, worldRef, markerRef, barRef, motion, onActiveChange: handleActiveChange });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectIndex = useCallback((index: number) => scrollToNode(index, nodes.length), [nodes.length]);
  const selectId = useCallback(
    (id: string) => {
      const index = nodes.findIndex((node) => node.id === id);
      if (index >= 0) selectIndex(index);
    },
    [nodes, selectIndex],
  );

  const activeNode = nodes[activeIndex] ?? nodes[0];
  const activeDetail = activeNode?.details?.find((item) => item.id === detailId) ?? null;
  const neighbors = useMemo(() => getNeighbors(nodes, activeIndex), [nodes, activeIndex]);
  if (!activeNode) return null;

  return (
    <main>
      <div className={s.spacer} style={{ height: `${nodes.length * SCROLL_VH_PER_NODE}vh` }} aria-hidden="true" />

      <div className={s.stage}>
        <GraphCanvas
          className={s.svg}
          data={data}
          activeIndex={activeIndex}
          detailId={detailId}
          worldRef={worldRef}
          markerRef={markerRef}
          onSelect={selectNode}
          onSelectDetail={setDetailId}
        />
      </div>
      <AvatarCanvas motion={motion} className={s.avatar} />

      <div ref={barRef} className={s.bar} role="presentation" />
      <header className={s.hud}>
        <strong>{owner.name} · {owner.role}</strong>
        <span className={s.hudMuted}>{activeIndex + 1} / {nodes.length}</span>
      </header>

      <InfoCard node={activeNode} neighbors={neighbors} detail={activeDetail} onSelect={selectId} onSelectDetail={setDetailId} onOpenProjects={() => setProjectsOpen(true)} />
      {activeNode.collection ? (
        <ProjectsDialog title={activeNode.title} collection={activeNode.collection} open={projectsOpen} onClose={closeProjects} />
      ) : null}
      {activeIndex === 0 && <p className={s.hint}>Scroll or click a node ↓</p>}

      <nav aria-label="Portfolio sections" className={s.srOnly}>
        <ol>
          {nodes.map((node, index) => (
            <li key={node.id}>
              <button type="button" onClick={() => selectNode(index)}>{node.title}</button>
            </li>
          ))}
        </ol>
      </nav>
    </main>
  );
}
