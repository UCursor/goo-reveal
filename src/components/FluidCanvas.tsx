import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;
    const canvas = ref.current;
    if (!canvas) return;

    import("webgl-fluid").then((mod) => {
      if (cancelled) return;
      const WebGLFluid = (mod.default ?? mod) as (
        c: HTMLCanvasElement,
        o?: Record<string, unknown>,
      ) => void;
      WebGLFluid(canvas, {
        TRIGGER: "hover",
        SIM_RESOLUTION: isMobile ? 64 : 128,
        DYE_RESOLUTION: isMobile ? 512 : 1024,
        DENSITY_DISSIPATION: 0.81,
        VELOCITY_DISSIPATION: 0.85,
        PRESSURE: 0.3,
        PRESSURE_ITERATIONS: isMobile ? 12 : 20,
        CURL: 0,
        SPLAT_RADIUS: 0.36,
        SPLAT_FORCE: 600,
        COLORFUL: false,
        // Rendered as white dye on black, then inverted in CSS so the page
        // stays white and the liquid reads as thick black goo.
        SPLAT_COLOR: { r: 1, g: 1, b: 1 },
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: false,
        SHADING: false,
        BLOOM: false,
        SUNRAYS: false,
        IMMEDIATE: false,
        AUTO: false,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  return <canvas ref={ref} className="fluid-canvas" />;
}
