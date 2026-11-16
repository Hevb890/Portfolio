"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { getTopTechnologies } from "@/lib/projects";
import type { ProjectCollection } from "@/types/portfolio";
import s from "../experience.module.css";

interface ProjectsDialogProps {
  title: string;
  collection: ProjectCollection;
  open: boolean;
  onClose: () => void;
}

/**
 * Modal built on the native <dialog>: focus is trapped, Escape closes it and the
 * rest of the page is inert while it is open.
 */
export function ProjectsDialog({ title, collection, open, onClose }: ProjectsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The graph is driven by page scroll, so freeze the page while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const technologies = getTopTechnologies(collection, 12);

  return (
    <dialog ref={dialogRef} className={s.dialog} aria-labelledby="projects-title" onClose={onClose} onClick={handleBackdropClick}>
      {open && (
        <>
          <header className={s.dialogHead}>
            <small className={s.cardKicker}>{collection.projects.length} projects · {technologies.total} technologies</small>
            <h2 id="projects-title" className={s.dialogTitle}>{title}</h2>
            <ul className={s.tech}>
              {technologies.top.map((tech) => (
                <li key={tech} className={s.techChip}>{tech}</li>
              ))}
              {technologies.remaining > 0 && <li className={s.techChip}>+{technologies.remaining} more</li>}
            </ul>
            <button type="button" className={s.dialogClose} onClick={onClose} aria-label="Close projects" autoFocus>
              ×
            </button>
          </header>

          <div className={s.dialogBody}>
            {collection.projects.map((project) => (
              <article key={project.id} className={s.projectCard}>
                <header className={s.projectHead}>
                  <div>
                    <h3 className={s.projectTitle}>{project.title}</h3>
                    <p className={s.projectMeta}>{project.year} · {project.role}</p>
                  </div>
                  <span className={s.statusTag}>{project.status}</span>
                </header>
                <p className={s.projectSummary}>{project.summary}</p>
                <dl className={s.steps}>
                  <div className={s.step}><dt>Challenge</dt><dd>{project.challenge}</dd></div>
                  <div className={s.step}><dt>Approach</dt><dd>{project.approach}</dd></div>
                  <div className={s.step}><dt>Outcome</dt><dd>{project.outcome}</dd></div>
                </dl>
                <ul className={s.tech}>
                  {project.technologies.map((tech) => (
                    <li key={tech} className={s.techChip}>{tech}</li>
                  ))}
                </ul>
                {project.links?.length ? (
                  <div className={s.links}>
                    {project.links.map((link) => (
                      <a key={link.url} className={s.linkPrimary} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label} →
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </>
      )}
    </dialog>
  );
}