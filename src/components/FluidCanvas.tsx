import { useEffect, useRef } from "react";

export function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

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
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        DENSITY_DISSIPATION: 0.98,
        VELOCITY_DISSIPATION: 0.15,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 35,
        SPLAT_RADIUS: 0.22,
        SPLAT_FORCE: 6500,
        COLORFUL: false,
        // Rendered as white dye on black, then inverted in CSS so the page
        // stays white and the liquid reads as thick black goo.
        SPLAT_COLOR: { r: 0.8, g: 0.8, b: 0.8 },
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
  }, []);

  return <canvas ref={ref} className="fluid-canvas" />;
}
