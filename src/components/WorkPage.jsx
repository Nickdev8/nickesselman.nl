import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { allProjects, projectPath } from "../data/projects";
import { localizeProject, t, useLocale } from "../locale";

export default function WorkPage() {
  const locale = useLocale();
  return (
    <div className="case-shell">
      <SiteHeader />
      <main>
        <section className="work-intro">
          <h1>{t(locale, "Websites, software, hardware and games.")}</h1>
        </section>
        <section className="work-list" aria-label="Selected projects">
          {allProjects.map((item) => {
            const project = localizeProject(locale, item);
            return (
            <article key={project.slug}>
              <a href={projectPath(project, locale)}>
                <span>{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </a>
            </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
