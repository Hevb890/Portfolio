import type { Metric, ProjectCollection } from "@/types/portfolio";

export interface TechnologySummary {
  /** Most frequently used technologies, first. */
  top: string[];
  /** Technologies not included in `top`. */
  remaining: number;
  total: number;
}

export function getTopTechnologies(collection: ProjectCollection, limit: number): TechnologySummary {
  const counts = new Map<string, number>();
  for (const project of collection.projects) {
    for (const tech of project.technologies) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  const sorted = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tech]) => tech);
  return { top: sorted.slice(0, limit), remaining: Math.max(0, sorted.length - limit), total: sorted.length };
}

/** Counts shown on the node's info card, derived so they never drift from the data. */
export function getCollectionStats(collection: ProjectCollection): Metric[] {
  return [
    { value: String(collection.projects.length), label: "projects" },
    { value: String(getTopTechnologies(collection, 0).total), label: "technologies" },
    { value: String(collection.projects.filter((p) => p.status === "Shipped").length), label: "shipped" },
  ];
}