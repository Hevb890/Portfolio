export type NodeKind = "hub" | "about" | "projects" | "case" | "contact" | "experience" | "publication";
export type CaseArt = "mobile" | "dashboard" | "system";
export type DetailKind = "article" | "talk" | "paper"

export interface Point {
  x: number;
  y: number;
}

export interface Metric {
  value: string;
  label: string;
}

export interface DetailItem {
  id: string;
  label: string;
  kind: DetailKind;
  venue: string;
  year: number;
  summary: string;
  url?: string;
}

export interface GraphNode {
  id: string;
  kind: NodeKind;
  /** Short label rendered under the node. */
  label: string;
  title: string;
  summary: string;
  position: Point;
  metrics: readonly Metric[];
  /** Ids of the nodes this node connects to (directed, drawn as edges). */
  links: readonly string[];
  /** Headline result shown as a badge on case-study nodes. */
  badge?: string;
  caseArt?: CaseArt;
  details?: readonly DetailItem[];
}

export interface Satellite {
  label: string;
  parentId: string;
  offset: Point;
  /** Present for numbered process steps. */
  step?: number;
}

export interface PortfolioData {
  owner: { name: string; initials: string; role: string };
  nodes: readonly GraphNode[];
  satellites: readonly Satellite[];
}
