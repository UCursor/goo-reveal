import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { FluidCanvas } from "@/components/FluidCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOTHIN' — Creative Studio in Paris" },
      {
        name: "description",
        content:
          "Not a style, a perspective. NOTHIN' is a creative studio in Paris building bold brand and digital experiences.",
      },
      { property: "og:title", content: "NOTHIN' — Creative Studio in Paris" },
      {
        property: "og:description",
        content:
          "Not a style, a perspective. NOTHIN' is a creative studio in Paris building bold brand and digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="stage">
      <ClientOnly>
        <FluidCanvas />
      </ClientOnly>

      <header className="stage-top">
        <div className="intro">
          <p>Not a style, a perspective.</p>
          <p>Because Nothin&rsquo; is Everythin&rsquo;.</p>
          <button type="button" className="cta">
            BOOK A CALL <span>&rarr;</span>
          </button>
        </div>
        <div className="menu">MENU ::</div>
      </header>

      <main className="hero">
        <h1 className="hero-text">NOTHIN&rsquo;</h1>
      </main>

      <footer className="stage-footer">
        <span>Creative studio in Paris</span>
        <div className="links">
          <span>LINKEDIN</span>
          <span>/</span>
          <span>INSTAGRAM</span>
          <span className="lang">EN</span>
        </div>
      </footer>
    </div>
  );
}
