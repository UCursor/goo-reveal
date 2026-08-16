import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { FluidCanvas } from "@/components/FluidCanvas";
import { HeroText } from "@/components/HeroText";


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
      <svg className="svg-defs" aria-hidden="true" focusable="false">
        <filter id="goo-chroma" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"
            result="cyanish"
          />
          <feOffset in="cyanish" dx="-6" dy="-3" result="rShift" />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 1  0 1 0 0 0  0 0 0 0 1  0 0 0 1 0"
            result="magentaish"
          />
          <feOffset in="magentaish" dx="5" dy="-4" result="gShift" />
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 1 0 0  0 0 0 1 0"
            result="yellowish"
          />
          <feOffset in="yellowish" dx="2" dy="7" result="bShift" />
          <feBlend in="rShift" in2="gShift" mode="multiply" result="rg" />
          <feBlend in="rg" in2="bShift" mode="multiply" />
        </filter>

        <filter id="hover-warp" colorInterpolationFilters="sRGB">
          <feTurbulence
            id="hover-warp-noise"
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            id="hover-warp-map"
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>


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
        <HeroText />
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
