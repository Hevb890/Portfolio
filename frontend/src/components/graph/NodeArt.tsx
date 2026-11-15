import { cx } from "@/lib/cx";
import type { CaseArt, GraphNode } from "@/types/portfolio";
import s from "./graph.module.css";

const CASE_W = 176;
const CASE_H = 124;

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

function Projects() {
  return (
    <>
      <circle className={s.ring} r={42} />
      <g className={s.body}>
        <polygon
          className={cx(s.fillCard, s.outline)}
          points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21"
          strokeLinejoin="round"
        />
        <g className={cx(s.spin, s.spinFast)}>
          <circle className={s.iconGrey} r={14} strokeDasharray="62 26" />
          <polygon className={s.fillAccent} points="12,-16 21,-8 9,-5" />
        </g>
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
        {/* back card suggests a stack of roles */}
        <rect className={s.fillMint} x={-34} y={-38} width={72} height={60} rx={20} transform="rotate(-6)" />
        <rect className={cx(s.fillCard, s.outline)} x={-36} y={-30} width={72} height={60} rx={18} />
        {/* briefcase */}
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
        {/* back page */}
        <rect className={s.fillMint} x={-26} y={-44} width={58} height={80} rx={10} transform="rotate(6)" />
        {/* page with folded corner */}
        <path
          className={cx(s.fillCard, s.outline)}
          d="M-22 -42H12L30 -24V34a8 8 0 0 1-8 8H-22a8 8 0 0 1-8-8V-34a8 8 0 0 1 8-8Z"
          strokeLinejoin="round"
        />
        <path className={s.fillSoft} d="M12 -42V-30a6 6 0 0 0 6 6H30Z" />
        {/* title + text lines */}
        <rect className={s.fillAccent} x={-20} y={-28} width={26} height={6} rx={3} />
        <rect className={s.fillEdge} x={-20} y={-14} width={40} height={4} rx={2} />
        <rect className={s.fillEdge} x={-20} y={-6} width={40} height={4} rx={2} />
        <rect className={s.fillEdge} x={-20} y={2} width={28} height={4} rx={2} />
        {/* figure */}
        <rect className={s.fillMint} x={-20} y={12} width={40} height={16} rx={4} />
        <rect className={s.fillAccent} x={-14} y={19} width={6} height={6} rx={2} />
        <rect className={s.fillAccent} x={-4} y={16} width={6} height={9} rx={2} />
        <rect className={s.fillAccent} x={6} y={13} width={6} height={12} rx={2} />
        {badge ? (
          <>
            <rect className={s.fillInk} x={14} y={30} width={50} height={22} rx={11} />
            <text className={s.badgeText} x={39} y={45}>{badge}</text>
          </>
        ) : null}
      </g>
    </>
  );
}

function MobileArt() {
  return (
    <>
      <rect className={cx(s.fillSoft, s.outline)} x={-58} y={-30} width={52} height={82} rx={10} />
      <rect className={s.fillEdge} x={-48} y={-20} width={32} height={5} rx={2.5} />
      <rect className={s.fillEdge} x={-48} y={-8} width={24} height={5} rx={2.5} />
      <rect className={s.fillMint} x={-48} y={30} width={32} height={11} rx={5.5} />
      <rect className={cx(s.fillCard, s.outline)} x={6} y={-30} width={52} height={82} rx={10} style={{ stroke: "var(--accent)" }} />
      <circle className={s.fillAccent} cx={32} cy={-6} r={10} />
      <polyline className={s.iconOnAccent} points="27,-6 31,-2 38,-11" />
      <rect className={s.fillAccent} x={16} y={30} width={32} height={11} rx={5.5} />
    </>
  );
}

function DashboardArt() {
  return (
    <>
      <rect className={s.fillSoft} x={-80} y={-34} width={24} height={88} rx={8} />
      <rect className={s.fillAccent} x={-46} y={-32} width={36} height={18} rx={6} />
      <rect className={s.fillMint} x={-4} y={-32} width={36} height={18} rx={6} />
      <rect className={s.fillSoft} x={38} y={-32} width={40} height={18} rx={6} />
      <rect className={s.fillMint} x={-46} y={30} width={16} height={20} rx={4} />
      <rect className={s.fillAccent} x={-20} y={16} width={16} height={34} rx={4} />
      <rect className={s.fillMint} x={6} y={22} width={16} height={28} rx={4} />
      <rect className={s.fillAccent} x={32} y={4} width={16} height={46} rx={4} />
      <rect className={s.fillEdge} x={58} y={26} width={20} height={24} rx={4} />
    </>
  );
}

const TILE_TOP = [s.fillAccent, s.fillMint, s.fillSoft, s.fillAccent] as const;
const TILE_BOTTOM = [s.fillSoft, s.fillAccent, s.fillMint, s.fillSoft] as const;

function SystemArt() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className={TILE_TOP[i]} x={-72 + i * 38} y={-32} width={32} height={26} rx={8} />
          <rect className={TILE_BOTTOM[i]} x={-72 + i * 38} y={2} width={32} height={26} rx={8} />
        </g>
      ))}
      <rect className={s.fillEdge} x={-72} y={38} width={144} height={12} rx={6} />
    </>
  );
}

const CASE_ART: Record<CaseArt, () => JSX.Element> = {
  mobile: MobileArt,
  dashboard: DashboardArt,
  system: SystemArt,
};

function CaseCard({ art, badge }: { art: CaseArt; badge?: string }) {
  const Art = CASE_ART[art];
  return (
    <>
      <rect className={s.ring} x={-CASE_W / 2} y={-62} width={CASE_W} height={CASE_H} rx={18} />
      <g className={s.body}>
        <rect className={cx(s.fillCard, s.outline)} x={-88} y={-62} width={CASE_W} height={CASE_H} rx={18} />
        <rect className={s.fillSoft} x={-86} y={-60} width={172} height={22} rx={16} />
        <rect className={s.fillSoft} x={-86} y={-48} width={172} height={10} />
        <circle className={s.fillAccent} cx={-72} cy={-50} r={3.5} />
        <circle className={s.fillEdge} cx={-60} cy={-50} r={3.5} />
        <circle className={s.fillEdge} cx={-48} cy={-50} r={3.5} />
        <Art />
        {badge ? (
          <>
            <rect className={s.fillInk} x={36} y={-76} width={60} height={26} rx={13} />
            <text className={s.badgeText} x={66} y={-59}>{badge}</text>
          </>
        ) : null}
      </g>
    </>
  );
}

export const LABEL_Y: Record<GraphNode["kind"], number> = {
  hub: 86,
  about: 62,
  projects: 66,
  case: 86,
  experience: 62,
  publication: 74,
  contact: 64,
};

export function NodeArt({ node, initials }: { node: GraphNode; initials: string }) {
  switch (node.kind) {
    case "hub":
      return <Hub initials={initials} />;
    case "about":
      return <About />;
    case "projects":
      return <Projects />;
    case "contact":
      return <Contact />;
    case "experience":
      return <Experience badge={node.badge} />;
    case "publication":
      return <Publication badge={node.badge} />;
    case "case":
      return <CaseCard art={node.caseArt ?? "system"} badge={node.badge} />;
  }
}
