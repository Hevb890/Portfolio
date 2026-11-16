import type { ProjectDetails } from "@/types/portfolio";
import s from "../experience.module.css";

/** Case-study details rendered as a stack of small cards. */
export function ProjectPanels({ project }: { project: ProjectDetails }) {
  return (
    <div className={s.project}>
      <section className={s.panel}>
        <h3 className={s.panelTitle}>Overview</h3>
        <dl className={s.facts}>
          <dt>Role</dt>
          <dd>{project.role}</dd>
          <dt>Team</dt>
          <dd>{project.team}</dd>
          <dt>Duration</dt>
          <dd>{project.duration}</dd>
        </dl>
      </section>
      <section className={s.panel}>
        <h3 className={s.panelTitle}>Challenge</h3>
        <p className={s.panelText}>{project.challenge}</p>
      </section>
      <section className={s.panel}>
        <h3 className={s.panelTitle}>Solution</h3>
        <p className={s.panelText}>{project.solution}</p>
      </section>
      <section className={s.panel}>
        <h3 className={s.panelTitle}>Highlights</h3>
        <ul className={s.bullets}>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className={s.panel}>
        <h3 className={s.panelTitle}>Technologies used</h3>
        <ul className={s.tech}>
          {project.technologies.map((tech) => (
            <li key={tech} className={s.techChip}>{tech}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}