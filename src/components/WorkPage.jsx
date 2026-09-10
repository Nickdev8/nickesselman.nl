import BackToTop from "./BackToTop";
import Footer from "./Footer";
import WorkPhysics from "./WorkPhysics";
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
        <section className="work-intro" aria-label="Interactive physics test">
          <WorkPhysics />
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
      <BackToTop label={locale === "nl" ? "Terug naar boven" : "Back to top"} />
    </div>
  );
}
