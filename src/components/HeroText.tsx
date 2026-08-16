import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroText() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;
    let warp = 0;
    let targetWarp = 0;
    const map = document.getElementById("hover-warp-map");
    const noise = document.getElementById("hover-warp-noise");
    let t = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      pointer = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(0)`;

      if (map) {
        const rect = el.getBoundingClientRect();
        if (pointer) {
          const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
          const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
          const dist = Math.hypot(dx, dy);
          targetWarp = Math.max(0, 1 - dist / 260) * 22;
        } else {
          targetWarp = 0;
        }
        warp += (targetWarp - warp) * 0.12;
        map.setAttribute("scale", warp.toFixed(2));
        if (noise && warp > 0.4) {
          t += 0.006;
          noise.setAttribute(
            "baseFrequency",
            `${(0.011 + Math.sin(t) * 0.003).toFixed(4)}`,
          );
        }
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  return (
    <div className="hero-3d" ref={ref}>
      <h1 className="hero-text" data-text="NOTHIN&rsquo;">
        NOTHIN&rsquo;
      </h1>
    </div>
  );
}
