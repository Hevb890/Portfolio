import { cx } from "@/lib/cx";
import type { ProjectArt, GraphNode } from "@/types/portfolio";
import s from "./graph.module.css";


function Hub({ initials }: { initials: string }) {
  return (
    <>
      <circle className={s.ring} r={60} />
      <g className={s.body}>
        <circle className={s.orbit} r={58} />
        <circle className={s.fillAccent} r={44} />
        <circle className={s.glow} r={38} />
        <text className={s.initials} y={9}>{initials}</text>
        <g className={s.spin}>
          <circle className={s.fillGrey} cx={58} r={7} />
        </g>
      </g>
    </>
  );
}

function About() {
  return (
    <>
      <rect className={s.ring} x={-36} y={-36} width={72} height={72} rx={22} />
      <g className={s.body}>
        <rect className={cx(s.fillCard, s.outline)} x={-36} y={-36} width={72} height={72} rx={22} />
        <circle className={s.iconInk} cx={0} cy={-8} r={9} />
        <path className={s.iconInk} d="M-17 22a17 14 0 0 1 34 0" />
        <circle className={s.fillAccent} cx={30} cy={-30} r={8} />
      </g>
    </>
  );
}

function Contact() {
  return (
    <>
      <rect className={s.ring} x={-64} y={-34} width={128} height={56} rx={28} />
      <g className={s.body}>
        <rect className={s.fillAccent} x={-64} y={-34} width={128} height={56} rx={28} />
        <polygon className={s.fillAccent} points="-40,18 -52,38 -20,18" />
        <rect className={s.iconOnAccent} x={-17} y={-20} width={34} height={24} rx={5} />
        <polyline className={s.iconOnAccent} points="-17,-18 0,-5 17,-18" />
      </g>
    </>
  );
}

function Experience({ badge }: { badge?: string }) {
  return (
    <>
      <rect className={s.ring} x={-40} y={-34} width={80} height={68} rx={20} />
      <g className={s.body}>
        <rect className={s.fillMint} x={-34} y={-38} width={72} height={60} rx={20} transform="rotate(-6)" />
        <rect className={cx(s.fillCard, s.outline)} x={-36} y={-30} width={72} height={60} rx={18} />
        <path className={s.iconInk} d="M-9 -9v-5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v5" />
        <rect className={s.iconInk} x={-18} y={-9} width={36} height={24} rx={6} />
        <path className={s.iconInk} d="M-18 2h36" />
        <circle className={s.fillAccent} cx={0} cy={2} r={3.5} />
        {badge ? (
          <>
            <rect className={s.fillInk} x={14} y={-42} width={46} height={22} rx={11} />
            <text className={s.badgeText} x={37} y={-27}>{badge}</text>
          </>
        ) : null}
      </g>
    </>
  );
}

function Publication({ badge }: { badge?: string }) {
  return (
    <>
      <rect className={s.ring} x={-34} y={-44} width={68} height={88} rx={12} />
      <g className={s.body}>
        <rect className={s.fillMint} x={-26} y={-44} width={58} height={80} rx={10} transform="rotate(6)" />
        <path
          className={cx(s.fillCard, s.outline)}
          d="M-22 -42H12L30 -24V34a8 8 0 0 1-8 8H-22a8 8 0 0 1-8-8V-34a8 8 0 0 1 8-8Z"
          strokeLinejoin="round"
        />
        <path className={s.fillSoft} d="M12 -42V-30a6 6 0 0 0 6 6H30Z" />
        <rect className={s.fillAccent} x={-20} y={-28} width={26} height={6} rx={3} />
        <rect className={s.fillEdge} x={-20} y={-14} width={40} height={4} rx={2} />
        <rect className={s.fillEdge} x={-20} y={-6} width={40} height={4} rx={2} />
        <rect className={s.fillEdge} x={-20} y={2} width={28} height={4} rx={2} />
        <rect className={s.fillMint} x={-20} y={12} width={40} height={16} rx={4} />
        <rect className={s.fillAccent} x={-14} y={19} width={6} height={6} rx={2} />
        <rect className={s.fillAccent} x={-4} y={16} width={6} height={9} rx={2} />
        <rect className={s.fillAccent} x={6} y={13} width={6} height={12} rx={2} />
        {badge ? (
          <>
            <rect className={s.fillInk} x={8} y={30} width={62} height={22} rx={11} />
            <text className={s.badgeText} x={39} y={45}>{badge}</text>
          </>
        ) : null}
      </g>
    </>
  );
}

function ProjectsHub() {
  return (
    <>
      <rect className={s.ring} x={-38} y={-38} width={76} height={76} rx={22} />
      <g className={s.body}>
        <rect className={s.fillMint} x={-34} y={-40} width={72} height={72} rx={22} transform="rotate(-8)" />
        <rect className={cx(s.fillCard, s.outline)} x={-36} y={-36} width={72} height={72} rx={22} />
        <rect className={s.fillAccent} x={-22} y={-22} width={20} height={20} rx={6} />
        <rect className={s.fillMint} x={2} y={-22} width={20} height={20} rx={6} />
        <rect className={s.fillMint} x={-22} y={2} width={20} height={20} rx={6} />
        <rect className={s.fillAccent} x={2} y={2} width={20} height={20} rx={6} />
      </g>
    </>
  );
}
const NET_LAYERS: ReadonlyArray<{ x: number; ys: readonly number[] }> = [
  { x: -44, ys: [-8, 12, 32] },
  { x: 0, ys: [-18, 2, 22, 42] },
  { x: 44, ys: [2, 22] },
];

function AiGlyph() {
  return (
    <>
      {NET_LAYERS.slice(0, -1).flatMap((layer, li) => {
        const next = NET_LAYERS[li + 1];
        if (!next) return [];
        return layer.ys.flatMap((y1) =>
          next.ys.map((y2) => (
            <line key={`${li}-${y1}-${y2}`} className={s.netLine} x1={layer.x} y1={y1} x2={next.x} y2={y2} />
          )),
        );
      })}
      {NET_LAYERS.flatMap((layer, li) =>
        layer.ys.map((y, i) => (
          <circle key={`${li}-${y}`} className={(li + i) % 2 === 0 ? s.fillAccent : s.fillGrey} cx={layer.x} cy={y} r={6} />
        )),
      )}
    </>
  );
}

function CodeGlyph() {
  return (
    <>
      <polyline className={s.iconInk} points="-20,-6 -38,10 -20,26" />
      <polyline className={s.iconInk} points="20,-6 38,10 20,26" />
      <path className={s.iconInk} d="M7 -10L-7 30" />
      <circle className={s.fillAccent} cx={0} cy={42} r={3} />
    </>
  );
}

function Projects({ art, count }: { art: ProjectArt; count: number }) {
  return (
    <>
      <rect className={s.ring} x={-78} y={-56} width={156} height={112} rx={20} />
      <g className={s.body}>
        <rect className={cx(s.fillCard, s.outline)} x={-78} y={-56} width={156} height={112} rx={20} />
        <rect className={s.fillSoft} x={-76} y={-54} width={152} height={22} rx={18} />
        <rect className={s.fillSoft} x={-76} y={-44} width={152} height={12} />
        <circle className={s.fillAccent} cx={-62} cy={-43} r={3.5} />
        <circle className={s.fillEdge} cx={-50} cy={-43} r={3.5} />
        <circle className={s.fillEdge} cx={-38} cy={-43} r={3.5} />
        {art === "ai" ? <AiGlyph /> : <CodeGlyph />}
        <rect className={s.fillInk} x={20} y={-70} width={84} height={26} rx={13} />
        <text className={s.badgeText} x={62} y={-53}>{count} projects</text>
      </g>
    </>
  );
}

export const LABEL_Y: Record<GraphNode["kind"], number> = {
  hub: 86,
  about: 62,
  projects: 66,
  experience: 62,
  publication: 74,
  contact: 64,
  projectsHub: 82
};

export function NodeArt({ node, initials }: { node: GraphNode; initials: string }) {
  switch (node.kind) {
    case "hub":
      return <Hub initials={initials} />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    case "experience":
      return <Experience badge={node.badge} />;
    case "publication":
      return <Publication badge={node.badge} />;
    case "projects":
      return <Projects art={node.collection?.art ?? "se"} count={node.collection?.projects.length ?? 0} />;
    case "projectsHub":
      return <ProjectsHub />;
  }
}
