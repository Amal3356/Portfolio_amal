import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { useTheme } from "./hooks/useTheme";
import { education, experience, profile, skills } from "./data/profile";

export default function App() {
  const { toggle } = useTheme();
  return (
    <>
      <Nav onToggleTheme={toggle} />
      <Hero />
      <main>
        <Section id="experience" title="Experience">
          <Timeline entries={experience} />
          <h2 className="mb-7 mt-14 text-[clamp(30px,5vw,44px)] font-extrabold tracking-tight">Education</h2>
          <Timeline entries={education} />
        </Section>
        <Section id="work" title="Projects">
          <Projects />
        </Section>
        <Section id="skills" title="Skills">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-7">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="mb-2 text-lg font-extrabold">{s.group}</h3>
                <p className={s.lead ? "text-ink" : "text-muted"}>{s.items}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-7 text-sm text-muted">
        {profile.name}. Based in {profile.location}.
      </footer>
    </>
  );
}
