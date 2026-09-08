import Footer from "./Footer";
import ProjectCard from "./ProjectCard";
import SiteHeader from "./SiteHeader";
import { allProjects } from "../data/projects";
import { t, useLocale } from "../locale";

export default function WorkPage() {
  const locale = useLocale();
  return (
    <div className="case-shell">
      <SiteHeader />
      <main>
        <section className="work-intro">
          <h1>{t(locale, "Websites, software, hardware and games.")}</h1>
        </section>
        <section className="work-grid" aria-label={t(locale, "Selected work")}>
          {allProjects.map((project, index) => (
            <ProjectCard
              item={project}
              index={index}
              locale={locale}
              key={project.slug}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
