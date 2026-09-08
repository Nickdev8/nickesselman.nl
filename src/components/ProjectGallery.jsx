import { featuredProjects } from "../data/projects";
import { localePath, t, useLocale } from "../locale";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery() {
  const locale = useLocale();
  return (
    <section
      className="projects-section"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="recent-work-row">
        <h2 className="section-title" id="work-heading">
          {t(locale, "recent work")}
        </h2>
        <a href={localePath("/work/", locale)}>{t(locale, "view all")}</a>
      </div>
      <div className="project-grid">
        {featuredProjects.slice(0, 3).map((project, index) => (
          <ProjectCard
            item={project}
            index={index}
            locale={locale}
            key={project.slug}
          />
        ))}
      </div>
    </section>
  );
}
