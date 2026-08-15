# Liquid Reveal

Yep — I understand the effect you’re going for.

The clean trick is:

**white page → black Pavel fluid → white text using `mix-blend-mode: difference`**

That makes the text appear **black normally**, but automatically become **white only where the black liquid passes over it**. So you get that “liquid reveals the alternate text color” look from your screenshot.

Pavel’s original project is MIT licensed, and the ESM/WebGL version below preserves that MIT licensing while making it much easier to drop into a CodePen.

### CodePen HTML

```html




  



  


    


      

Not a style, a perspective.


      

Because Nothin’ is Everythin’.



      BOOK A CALL →
    



    

MENU ::



  
    

NOTHIN’



  


    

Creative studio in Paris



    


      LINKEDIN
      /
      INSTAGRAM
      EN
    







@0.4/dist/webgl-fluid.mjs";

  const canvas = document.getElementById("fluid");

  WebGLFluid(canvas, {
    TRIGGER: "hover",

    /* Performance */
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,

    /* Fluid feel */
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.15,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 35,

    /* Mouse */
    SPLAT_RADIUS: 0.22,
    SPLAT_FORCE: 6500,

    /* MAKE IT BLACK */
    COLORFUL: false,
    SPLAT_COLOR: {
      r: 0,
      g: 0,
      b: 0
    },

    /* We want the page itself to be white */
    TRANSPARENT: true,

    /* Remove colorful/light effects */
    SHADING: false,
    BLOOM: false,
    SUNRAYS: false,

    /* Don't spawn random blobs */
    IMMEDIATE: false,
    AUTO: false
  });
</script>
```

### CodePen CSS

```css
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  color: #000;
}

.page {
  position: relative;
  width: 100%;
  height: 100svh;
  background: #fff;
  overflow: hidden;
}

/* ------------------------------
   FLUID CANVAS
------------------------------ */

#fluid {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  /* Let the canvas catch the mouse */
  pointer-events: auto;
}

/* ------------------------------
   HEADER
------------------------------ */

.top {
  position: absolute;
  inset: 0 0 auto 0;
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  z-index: 20;
  pointer-events: none;
}

.intro {
  font-size: 19px;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.intro button {
  margin-top: 28px;
  border: 0;
  background: #000;
  color: #fff;
  border-radius: 100px;
  padding: 18px 25px;
  font-size: 13px;
  letter-spacing: 0.02em;
  cursor: pointer;
  pointer-events: auto;
}

.intro button span {
  margin-left: 18px;
  font-size: 18px;
}

.menu {
  font-size: 13px;
  font-weight: 700;
  pointer-events: auto;
}

/* ------------------------------
   HERO
------------------------------ */

.hero {
  position: absolute;
  inset: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;
}

.hero-text {
  white-space: nowrap;

  font-size: clamp(90px, 19vw, 360px);
  font-weight: 900;
  line-height: 0.75;
  letter-spacing: -0.085em;

  /*
    THIS IS THE IMPORTANT PART.

    Text is white, but:

    white + white background = black
    white + black fluid     = white

    So the word automatically changes
    color only where the liquid is.
  */
  color: white;
  mix-blend-mode: difference;

  transform: translateY(-2%);
}

/* ------------------------------
   FOOTER
------------------------------ */

footer {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 20;
  font-size: 12px;
  font-weight: 700;

  pointer-events: none;
}

.links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lang {
  background: #000;
  color: #fff;
  padding: 4px 7px;
  border-radius: 3px;
}
```

### Why this works

The important part isn't actually changing the text with JavaScript.

It's this:

```css
.hero-text {
  color: white;
  mix-blend-mode: difference;
}
```

Imagine the fluid isn't there:

```text
WHITE TEXT
    +
WHITE BACKGROUND
    =
BLACK
```

Then the black Pavel fluid moves under the text:

```text
WHITE TEXT
    +
BLACK FLUID
    =
WHITE
```

So you get exactly the effect you're describing:

```text
WHITE PAGE

          NOTHIN'
       █████████████
       █ fluid █████
          WHITE
       █ fluid █
       █████████

outside liquid → black text
inside liquid  → white text
```

And because the canvas is transparent, the fluid itself is just the **black liquid shape**, not a black fullscreen background. The WebGL fluid implementation explicitly exposes transparent rendering and hover triggering, which is why this setup works nicely for this use case. ([GitHub][1])

### To make it more like Buttermax/Noth

Change these values:

```js
SPLAT_RADIUS: 0.22,
SPLAT_FORCE: 6500,
CURL: 35,
DENSITY_DISSIPATION: 0.98,
VELOCITY_DISSIPATION: 0.15,
```

For **thicker goo**:

```js
SPLAT_RADIUS: 0.30,
SPLAT_FORCE: 8000,
CURL: 25,
DENSITY_DISSIPATION: 0.995,
VELOCITY_DISSIPATION: 0.08,
```

For **fast sharp liquid**:

```js
SPLAT_RADIUS: 0.14,
SPLAT_FORCE: 9000,
CURL: 45,
DENSITY_DISSIPATION: 0.96,
VELOCITY_DISSIPATION: 0.2,
```

One important detail: this is **inspired by the visual behavior** of those sites, not copied from their implementation.

Also, the Pavel project itself states that its code is available under the MIT license, and the ESM adaptation retains the MIT copyright/license notice.

This should give you the exact **white-background / black goo / black-to-white text reveal** foundation you're after.

[1]: https://github.com/cloydlau/webgl-fluid?utm_source=chatgpt.com "GitHub - cloydlau/webgl-fluid: ESM support for https://github.com/PavelDoGreat/WebGL-Fluid-Simulation. · GitHub"

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d0dba70d-0f80-4da7-9ae9-a4425c266d53).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
