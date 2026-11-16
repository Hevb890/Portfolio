export type NodeKind = "hub" | "about" | "projectsHub" | "projects" | "contact" | "experience" | "publication";
export type ProjectArt = "ai" | "se";
export type ProjectStatus = "Shipped" | "In progress" | "Prototype";
export type DetailKind = "article" | "talk" | "paper" | "project" | "publication" | "internship" | "consultancy" | "fulltime"

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
  title: string;
  kind: DetailKind;
  venue: string;
  year: number;
  summary: string;
  url?: string;
  awards?: readonly string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

/** One project, shown as a detailed card inside the projects dialog. */
export interface ProjectItem {
  id: string;
  title: string;
  year: number;
  status: ProjectStatus;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: readonly string[];
  links?: readonly ProjectLink[];
}

/** A group of projects (e.g. "AI-based"); the node card derives counts and technologies from it. */
export interface ProjectCollection {
  art: ProjectArt;
  projects: readonly ProjectItem[];
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
  details?: readonly DetailItem[];
  collection?: ProjectCollection;
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
