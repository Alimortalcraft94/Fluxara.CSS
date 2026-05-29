# Fluxara

Fluxara is a CSS-first utility framework for building modern interfaces with
semantic design tokens, cascade layers, logical properties, responsive variants,
container-aware utilities, small component recipes, and a tiny JavaScript API.

Fluxara is utility-first, but it is not a Tailwind clone. The syntax, naming
model, token strategy, and customization flow are designed around readable
namespaces and native CSS primitives:

```html
<section class="fx:container fx:p:6 fx:stack:6">
  <div class="fx:grid fx:grid:cols:1 fx:md:grid:cols:3 fx:gap:4">
    <article class="fx:recipe:panel fx:p:5 fx:stack:3">
      <h2 class="fx:m:0 fx:text:xl">Fast by default</h2>
      <p class="fx:m:0 fx:fg:muted">
        Layered CSS, semantic variables, and no required runtime.
      </p>
    </article>
  </div>
</section>
```

## Table Of Contents

- [Official Website](#official-website)
- [Why Fluxara](#why-fluxara)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [The Mental Model](#the-mental-model)
- [Syntax](#syntax)
- [Cascade Layers](#cascade-layers)
- [Design Tokens](#design-tokens)
- [Theming](#theming)
- [Utility Reference](#utility-reference)
- [Variants](#variants)
- [Recipes](#recipes)
- [JavaScript API](#javascript-api)
- [CLI](#cli)
- [Building From Source](#building-from-source)
- [Publishing](#publishing)
- [Browser Support](#browser-support)
- [Project Structure](#project-structure)
- [Best Practices](#best-practices)
- [Roadmap Ideas](#roadmap-ideas)

## Official Website

Visit the Fluxara website for demos, examples, and project updates:

https://fluxara-css.github.io

## Why Fluxara

Fluxara gives you the speed of utility-first styling without forcing every
design decision into one huge generated stylesheet or one framework-specific
configuration format.

It is built around these principles:

- **CSS first:** the framework works by importing CSS. JavaScript is optional.
- **Semantic tokens:** colors, spacing, radius, shadows, motion, and type values
  are exposed as CSS custom properties.
- **Cascade layers:** reset, tokens, base styles, layout utilities, general
  utilities, variants, and recipes are ordered explicitly.
- **Logical properties:** sizing, spacing, and positioning use writing-mode-aware
  CSS where possible.
- **Readable syntax:** classes use a namespaced `fx:` grammar instead of
  Tailwind-compatible names.
- **Escape hatches:** several utilities support `$` forms that read from local
  CSS variables.
- **No required runtime:** most of Fluxara is just CSS. The JavaScript API helps
  with configuration and theme switching.

## Installation

Install Fluxara from npm:

```bash
npm install fluxara
```

Import the compiled CSS in your application entry:

```js
import "fluxara/css";
```

Or reference the compiled file directly:

```html
<link rel="stylesheet" href="./node_modules/fluxara/dist/fluxara.css">
```

If you want to inspect or extend the source CSS, import the source entry:

```js
import "fluxara/css/source";
```

## Quick Start

Create a simple page:

```html
<!doctype html>
<html lang="en" data-fx-theme="aurora">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./node_modules/fluxara/dist/fluxara.css">
    <title>Fluxara App</title>
  </head>
  <body>
    <main class="fx:container fx:p:6 fx:stack:6">
      <header class="fx:measure fx:stack:3">
        <p class="fx:m:0 fx:fg:brand fx:weight:700">Fluxara</p>
        <h1 class="fx:m:0 fx:text:4xl fx:balance">
          Build interfaces with CSS-native utilities.
        </h1>
        <p class="fx:m:0 fx:text:lg fx:fg:muted">
          Use semantic tokens, responsive variants, and small recipes.
        </p>
      </header>

      <section class="fx:grid fx:grid:cols:1 fx:md:grid:cols:3 fx:gap:4">
        <article class="fx:recipe:panel fx:p:5 fx:stack:3">
          <h2 class="fx:m:0 fx:text:xl">Tokens</h2>
          <p class="fx:m:0 fx:fg:muted">Theme values are CSS variables.</p>
        </article>
        <article class="fx:recipe:panel fx:p:5 fx:stack:3">
          <h2 class="fx:m:0 fx:text:xl">Layout</h2>
          <p class="fx:m:0 fx:fg:muted">Use grid, flex, sizing, and flow helpers.</p>
        </article>
        <article class="fx:recipe:panel fx:p:5 fx:stack:3">
          <h2 class="fx:m:0 fx:text:xl">Variants</h2>
          <p class="fx:m:0 fx:fg:muted">Use state, responsive, and container rules.</p>
        </article>
      </section>

      <button class="fx:recipe:button fx:bg:brand fx:fg:brand-ink fx:hover:lift">
        Get started
      </button>
    </main>
  </body>
</html>
```

You can also open `examples/index.html` in this repository after running:

```bash
npm run build
```

## The Mental Model

Fluxara has three layers of authoring:

1. **Tokens:** global or theme-scoped CSS variables such as `--fx-brand`,
   `--fx-space-4`, and `--fx-radius-2`.
2. **Utilities:** single-purpose classes such as `fx:grid`, `fx:p:4`,
   `fx:bg:brand`, and `fx:text:xl`.
3. **Recipes:** small composed patterns such as `fx:recipe:button`,
   `fx:recipe:panel`, and `fx:recipe:switch`.

The recommended workflow is:

1. Choose a theme with `data-fx-theme`.
2. Compose layout with `fx:container`, `fx:grid`, `fx:flex`, `fx:gap:*`,
   and responsive variants.
3. Apply color, type, radius, shadow, and interaction utilities.
4. Use recipes when the pattern is common enough to deserve a stable class.
5. Override specific values with CSS variables or your own layer.

## Syntax

Fluxara classes use a colon-separated namespace:

```txt
fx:category:value
```

Examples:

```txt
fx:p:4
fx:bg:brand
fx:grid:cols:3
fx:hover:lift
fx:md:grid:cols:4
fx:recipe:button
```

Because `:` has special meaning in CSS selectors, the source CSS escapes it:

```css
.fx\:p\:4 {
  padding: var(--fx-space-4);
}
```

In HTML you write the natural class name:

```html
<div class="fx:p:4"></div>
```

### Dynamic `$` Utilities

Some utilities include a `$` version. These read from a CSS variable instead of
a fixed Fluxara token:

```html
<div class="fx:p:$ fx:bg:$ fx:radius:3" style="--fx-p: 3.25rem; --fx-bg: #f4fbf8">
  Custom values without leaving the utility model.
</div>
```

Available dynamic utilities:

| Class | Reads From | CSS Property |
| --- | --- | --- |
| `fx:gap:$` | `--fx-gap` | `gap` |
| `fx:p:$` | `--fx-p` | `padding` |
| `fx:w:$` | `--fx-w` | `inline-size` |
| `fx:h:$` | `--fx-h` | `block-size` |
| `fx:ratio:$` | `--fx-ratio` | `aspect-ratio` |
| `fx:inset:$` | `--fx-inset` | `inset` |
| `fx:bg:$` | `--fx-bg` | `background` |
| `fx:fg:$` | `--fx-fg` | `color` |
| `fx:border:$` | `--fx-border` | `border-color` |

## Cascade Layers

Fluxara declares its layers in this order:

```css
@layer fluxara.reset,
  fluxara.tokens,
  fluxara.base,
  fluxara.layout,
  fluxara.utilities,
  fluxara.variants,
  fluxara.recipes;
```

Layer purpose:

| Layer | Purpose |
| --- | --- |
| `fluxara.reset` | Box sizing, media defaults, body margin reset, form font inheritance. |
| `fluxara.tokens` | Theme variables, scales, colors, shadows, motion values. |
| `fluxara.base` | Body defaults, anchor color, focus-visible ring. |
| `fluxara.layout` | Display, flex, grid, sizing, overflow, and positioning utilities. |
| `fluxara.utilities` | Spacing, typography, color, effects, interaction, and motion utilities. |
| `fluxara.variants` | Hover, focus, active, data-state, responsive, dark, and container variants. |
| `fluxara.recipes` | Reusable composed primitives such as buttons and panels. |

To override Fluxara predictably, create your own later layer:

```css
@import "fluxara/css";

@layer app {
  .product-card {
    --fx-bg: color-mix(in srgb, var(--fx-brand), white 92%);
  }
}
```

## Design Tokens

Fluxara tokens are CSS custom properties. They live on `:root` and
`[data-fx-theme="aurora"]` by default, with overrides for
`[data-fx-theme="midnight"]`.

### Typography Tokens

| Token | Default |
| --- | --- |
| `--fx-font-sans` | Inter, system UI stack |
| `--fx-font-mono` | SFMono/Consolas/Liberation Mono stack |
| `--fx-step--2` | `0.75rem` |
| `--fx-step--1` | `0.875rem` |
| `--fx-step-0` | `1rem` |
| `--fx-step-1` | `1.125rem` |
| `--fx-step-2` | `1.375rem` |
| `--fx-step-3` | `1.75rem` |
| `--fx-step-4` | `2.25rem` |
| `--fx-step-5` | `3rem` |

### Spacing Tokens

| Token | Default |
| --- | --- |
| `--fx-space-0` | `0` |
| `--fx-space-1` | `0.25rem` |
| `--fx-space-2` | `0.5rem` |
| `--fx-space-3` | `0.75rem` |
| `--fx-space-4` | `1rem` |
| `--fx-space-5` | `1.25rem` |
| `--fx-space-6` | `1.5rem` |
| `--fx-space-7` | `2rem` |
| `--fx-space-8` | `2.5rem` |
| `--fx-space-9` | `3rem` |
| `--fx-space-10` | `4rem` |
| `--fx-space-11` | `5rem` |
| `--fx-space-12` | `6rem` |

### Radius Tokens

| Token | Default |
| --- | --- |
| `--fx-radius-0` | `0` |
| `--fx-radius-1` | `0.25rem` |
| `--fx-radius-2` | `0.5rem` |
| `--fx-radius-3` | `0.75rem` |
| `--fx-radius-4` | `1rem` |
| `--fx-radius-pill` | `999rem` |

### Color Tokens

| Token | Purpose |
| --- | --- |
| `--fx-canvas` | App/page background |
| `--fx-surface` | Primary surface |
| `--fx-surface-2` | Secondary surface |
| `--fx-ink` | Primary text |
| `--fx-muted` | Secondary text |
| `--fx-line` | Borders and dividers |
| `--fx-brand` | Primary brand/action color |
| `--fx-brand-ink` | Text on brand background |
| `--fx-accent` | Secondary accent color |
| `--fx-accent-ink` | Text on accent background |
| `--fx-warn` | Warning semantic color |
| `--fx-danger` | Danger semantic color |
| `--fx-success` | Success semantic color |

### Effect And Motion Tokens

| Token | Purpose |
| --- | --- |
| `--fx-shadow-1` | Low elevation |
| `--fx-shadow-2` | Medium elevation |
| `--fx-shadow-3` | High elevation |
| `--fx-ring` | Focus ring |
| `--fx-ease` | Default easing curve |
| `--fx-fast` | Fast duration |
| `--fx-normal` | Normal duration |
| `--fx-measure` | Comfortable text measure |

## Theming

Fluxara ships with two theme scopes:

```html
<html data-fx-theme="aurora">
```

```html
<html data-fx-theme="midnight">
```

To create your own theme, override tokens under a `data-fx-theme` selector:

```css
@import "fluxara/css";

@layer app.theme {
  [data-fx-theme="studio"] {
    color-scheme: light;
    --fx-canvas: #fafafa;
    --fx-surface: #ffffff;
    --fx-surface-2: #eeeeee;
    --fx-ink: #171717;
    --fx-muted: #626262;
    --fx-line: #dddddd;
    --fx-brand: #2459ff;
    --fx-brand-ink: #ffffff;
    --fx-accent: #c026d3;
    --fx-accent-ink: #ffffff;
  }
}
```

Then apply it:

```html
<html data-fx-theme="studio">
```

For scoped theming, place the attribute on any ancestor:

```html
<section data-fx-theme="midnight" class="fx:bg:canvas fx:fg:ink fx:p:6">
  This section uses the midnight token values.
</section>
```

## Utility Reference

This reference documents the utilities currently shipped by Fluxara `0.1.0`.

### Display And Flex

| Class | Output |
| --- | --- |
| `fx:block` | `display: block` |
| `fx:inline` | `display: inline-flex` |
| `fx:flex` | `display: flex` |
| `fx:grid` | `display: grid` |
| `fx:contents` | `display: contents` |
| `fx:hidden` | `display: none` |
| `fx:row` | `flex-direction: row` |
| `fx:col` | `flex-direction: column` |
| `fx:wrap` | `flex-wrap: wrap` |
| `fx:nowrap` | `flex-wrap: nowrap` |
| `fx:items:start` | `align-items: start` |
| `fx:items:center` | `align-items: center` |
| `fx:items:end` | `align-items: end` |
| `fx:items:stretch` | `align-items: stretch` |
| `fx:justify:start` | `justify-content: start` |
| `fx:justify:center` | `justify-content: center` |
| `fx:justify:end` | `justify-content: end` |
| `fx:justify:between` | `justify-content: space-between` |
| `fx:place:center` | `place-items: center` |

### Grid

| Class | Output |
| --- | --- |
| `fx:grid:cols:1` | One equal column |
| `fx:grid:cols:2` | Two equal columns |
| `fx:grid:cols:3` | Three equal columns |
| `fx:grid:cols:4` | Four equal columns |
| `fx:grid:cols:5` | Five equal columns |
| `fx:grid:cols:6` | Six equal columns |
| `fx:grid:cols:12` | Twelve equal columns |
| `fx:grid:cols:auto` | Auto-fit columns using `--fx-col-min`, default `14rem` |
| `fx:grid:rows:auto` | Auto grid rows |
| `fx:grid:rows:equal` | Equal `1fr` auto rows |
| `fx:colspan:2` | Span two columns |
| `fx:colspan:3` | Span three columns |
| `fx:colspan:full` | Span the full grid |

Example:

```html
<div class="fx:grid fx:grid:cols:auto fx:gap:4" style="--fx-col-min: 18rem">
  <article class="fx:recipe:panel fx:p:4">A</article>
  <article class="fx:recipe:panel fx:p:4">B</article>
  <article class="fx:recipe:panel fx:p:4">C</article>
</div>
```

### Sizing

| Class | Output |
| --- | --- |
| `fx:w:full` | `inline-size: 100%` |
| `fx:w:screen` | `inline-size: 100vi` |
| `fx:w:fit` | `inline-size: fit-content` |
| `fx:w:max` | `inline-size: max-content` |
| `fx:w:$` | `inline-size: var(--fx-w)` |
| `fx:h:full` | `block-size: 100%` |
| `fx:h:screen` | `min-block-size: 100vb` |
| `fx:h:$` | `block-size: var(--fx-h)` |
| `fx:min:0` | `min-inline-size: 0; min-block-size: 0` |
| `fx:measure` | `max-inline-size: var(--fx-measure)` |
| `fx:container` | Centered container with responsive inline size |
| `fx:ratio:square` | `aspect-ratio: 1` |
| `fx:ratio:video` | `aspect-ratio: 16 / 9` |
| `fx:ratio:$` | `aspect-ratio: var(--fx-ratio)` |

### Overflow And Scroll

| Class | Output |
| --- | --- |
| `fx:clip` | `overflow: clip` |
| `fx:scroll` | `overflow: auto` |
| `fx:scroll:x` | `overflow-x: auto` |
| `fx:scroll:y` | `overflow-y: auto` |
| `fx:overscroll:contain` | `overscroll-behavior: contain` |
| `fx:snap:x` | Horizontal mandatory scroll snap |
| `fx:snap:y` | Vertical mandatory scroll snap |
| `fx:snap:start` | `scroll-snap-align: start` |

### Positioning

| Class | Output |
| --- | --- |
| `fx:relative` | `position: relative` |
| `fx:absolute` | `position: absolute` |
| `fx:fixed` | `position: fixed` |
| `fx:sticky` | `position: sticky` |
| `fx:inset:0` | `inset: 0` |
| `fx:inset:$` | `inset: var(--fx-inset)` |
| `fx:top:0` | `inset-block-start: 0` |
| `fx:bottom:0` | `inset-block-end: 0` |
| `fx:start:0` | `inset-inline-start: 0` |
| `fx:end:0` | `inset-inline-end: 0` |
| `fx:z:0` | `z-index: 0` |
| `fx:z:1` | `z-index: 1` |
| `fx:z:10` | `z-index: 10` |
| `fx:z:top` | Maximum practical z-index |

### Spacing

| Class | Output |
| --- | --- |
| `fx:gap:0` to `fx:gap:8` | `gap: var(--fx-space-*)` |
| `fx:gap:$` | `gap: var(--fx-gap)` |
| `fx:p:0`, `fx:p:1`, `fx:p:2`, `fx:p:3`, `fx:p:4`, `fx:p:5`, `fx:p:6`, `fx:p:8`, `fx:p:10` | `padding: var(--fx-space-*)` |
| `fx:p:$` | `padding: var(--fx-p)` |
| `fx:px:2` to `fx:px:6` | `padding-inline: var(--fx-space-*)` |
| `fx:py:1` to `fx:py:4` | `padding-block: var(--fx-space-*)` |
| `fx:m:0` | `margin: 0` |
| `fx:m:auto` | `margin: auto` |
| `fx:mx:auto` | `margin-inline: auto` |
| `fx:mt:4`, `fx:mt:6` | `margin-block-start` |
| `fx:mb:4`, `fx:mb:6` | `margin-block-end` |
| `fx:stack:2`, `fx:stack:3`, `fx:stack:4`, `fx:stack:6` | Adds vertical rhythm between direct children |

### Typography

| Class | Output |
| --- | --- |
| `fx:font:sans` | Sans font stack |
| `fx:font:mono` | Mono font stack |
| `fx:text:xs` | `--fx-step--2` |
| `fx:text:sm` | `--fx-step--1` |
| `fx:text:base` | `--fx-step-0` |
| `fx:text:lg` | `--fx-step-1` |
| `fx:text:xl` | `--fx-step-2` |
| `fx:text:2xl` | `--fx-step-3`, tight line-height |
| `fx:text:3xl` | `--fx-step-4`, tight line-height |
| `fx:text:4xl` | `--fx-step-5`, tight line-height |
| `fx:weight:400` | `font-weight: 400` |
| `fx:weight:500` | `font-weight: 500` |
| `fx:weight:600` | `font-weight: 600` |
| `fx:weight:700` | `font-weight: 700` |
| `fx:leading:tight` | `line-height: 1.1` |
| `fx:leading:normal` | `line-height: 1.5` |
| `fx:leading:loose` | `line-height: 1.75` |
| `fx:align:start` | `text-align: start` |
| `fx:align:center` | `text-align: center` |
| `fx:align:end` | `text-align: end` |
| `fx:balance` | `text-wrap: balance` |
| `fx:pretty` | `text-wrap: pretty` |
| `fx:truncate` | Single-line truncation |

### Color

| Class | Output |
| --- | --- |
| `fx:bg:canvas` | `background: var(--fx-canvas)` |
| `fx:bg:surface` | `background: var(--fx-surface)` |
| `fx:bg:surface-2` | `background: var(--fx-surface-2)` |
| `fx:bg:brand` | `background: var(--fx-brand)` |
| `fx:bg:accent` | `background: var(--fx-accent)` |
| `fx:bg:$` | `background: var(--fx-bg)` |
| `fx:fg:ink` | `color: var(--fx-ink)` |
| `fx:fg:muted` | `color: var(--fx-muted)` |
| `fx:fg:brand` | `color: var(--fx-brand)` |
| `fx:fg:brand-ink` | `color: var(--fx-brand-ink)` |
| `fx:fg:accent` | `color: var(--fx-accent)` |
| `fx:fg:accent-ink` | `color: var(--fx-accent-ink)` |
| `fx:fg:$` | `color: var(--fx-fg)` |
| `fx:border` | `border: 1px solid var(--fx-line)` |
| `fx:border:brand` | `border-color: var(--fx-brand)` |
| `fx:border:$` | `border-color: var(--fx-border)` |
| `fx:divide:y` | Adds top borders between direct children |

### Effects

| Class | Output |
| --- | --- |
| `fx:radius:0` to `fx:radius:4` | `border-radius: var(--fx-radius-*)` |
| `fx:radius:pill` | Pill radius |
| `fx:shadow:1` | Low elevation shadow |
| `fx:shadow:2` | Medium elevation shadow |
| `fx:shadow:3` | High elevation shadow |
| `fx:ring` | Focus ring shadow |
| `fx:blur:backdrop` | Backdrop blur using `--fx-blur`, default `14px` |
| `fx:opacity:0` | `opacity: 0` |
| `fx:opacity:50` | `opacity: 0.5` |
| `fx:opacity:100` | `opacity: 1` |

### Interactivity

| Class | Output |
| --- | --- |
| `fx:cursor:pointer` | Pointer cursor |
| `fx:cursor:disabled` | Not-allowed cursor |
| `fx:select:none` | Disable selection |
| `fx:events:none` | Disable pointer events |
| `fx:touch:pan-x` | `touch-action: pan-x` |
| `fx:touch:pan-y` | `touch-action: pan-y` |
| `fx:accent:brand` | `accent-color: var(--fx-brand)` |
| `fx:disabled` | Disabled opacity and cursor |

### Motion

| Class | Output |
| --- | --- |
| `fx:transition` | Normal duration and easing |
| `fx:transition:fast` | Fast duration and easing |
| `fx:animate:fade-in` | Fade-in animation |
| `fx:animate:rise-in` | Fade and rise animation |

Fluxara respects `prefers-reduced-motion: reduce` for the built-in transition
and animation utilities.

## Variants

Variants are written as Fluxara namespaced classes. They are regular CSS rules,
not generated at runtime.

### Interaction Variants

| Class | Behavior |
| --- | --- |
| `fx:hover:lift` | Adds transition and lifts on hover with shadow |
| `fx:hover:bright` | Brightens on hover |
| `fx:focus:ring` | Applies the Fluxara focus ring on focus-visible |
| `fx:active:press` | Moves down slightly while active |

Example:

```html
<button class="fx:recipe:button fx:bg:brand fx:fg:brand-ink fx:hover:lift fx:focus:ring">
  Save changes
</button>
```

### State Variants

| Class | Behavior |
| --- | --- |
| `fx:state:open:show` | Reverts display when `data-state="open"` |
| `fx:state:closed:hide` | Hides when `data-state="closed"` |

Example:

```html
<div data-state="closed" class="fx:state:closed:hide">
  Hidden when closed.
</div>
```

### Theme Variant

| Class | Behavior |
| --- | --- |
| `fx:dark:surface` | Uses surface background and ink text inside `data-fx-theme="midnight"` |

### Responsive Variants

Fluxara includes named breakpoints:

| Prefix | Query |
| --- | --- |
| `fx:sm:*` | `@media (min-width: 40rem)` |
| `fx:md:*` | `@media (min-width: 56rem)` |
| `fx:lg:*` | `@media (min-width: 72rem)` |

Available responsive utilities:

| Class | Output |
| --- | --- |
| `fx:sm:grid:cols:2` | Two columns at small screens and up |
| `fx:sm:row` | Row flex direction at small screens and up |
| `fx:sm:block` | Block display at small screens and up |
| `fx:md:grid:cols:2` | Two columns at medium screens and up |
| `fx:md:grid:cols:3` | Three columns at medium screens and up |
| `fx:md:grid:cols:4` | Four columns at medium screens and up |
| `fx:md:p:8` | Larger padding at medium screens and up |
| `fx:md:flex` | Flex display at medium screens and up |
| `fx:lg:grid:cols:4` | Four columns at large screens and up |
| `fx:lg:grid:cols:6` | Six columns at large screens and up |

### Container Variants

Container variants use CSS container queries:

| Class | Query | Output |
| --- | --- | --- |
| `fx:cq:grid:cols:2` | `@container (min-width: 32rem)` | Two columns |
| `fx:cq:row` | `@container (min-width: 32rem)` | Row direction |

To use them, define a container on an ancestor:

```css
.card-region {
  container-type: inline-size;
}
```

```html
<section class="card-region">
  <div class="fx:grid fx:grid:cols:1 fx:cq:grid:cols:2 fx:gap:4">
    <article class="fx:recipe:panel fx:p:4">A</article>
    <article class="fx:recipe:panel fx:p:4">B</article>
  </div>
</section>
```

## Recipes

Recipes are small, stable, composed classes for common UI patterns. They are
still CSS-first and can be combined with utilities.

### Button

```html
<button class="fx:recipe:button fx:bg:brand fx:fg:brand-ink fx:hover:lift">
  Save
</button>
```

`fx:recipe:button` provides layout, border radius, cursor, font weight, minimum
height, padding, and basic interaction transitions. You choose color with
utilities.

### Panel

```html
<article class="fx:recipe:panel fx:p:5 fx:stack:3">
  <h2 class="fx:m:0 fx:text:xl">Panel title</h2>
  <p class="fx:m:0 fx:fg:muted">Panel content.</p>
</article>
```

`fx:recipe:panel` provides a surface background, border, radius, and low
elevation shadow.

### Cluster

```html
<div class="fx:recipe:cluster">
  <button class="fx:recipe:button fx:bg:brand fx:fg:brand-ink">Save</button>
  <button class="fx:recipe:button fx:bg:surface fx:fg:ink fx:border">Cancel</button>
</div>
```

`fx:recipe:cluster` creates a wrapping inline group with a configurable gap.

### Switch

```html
<button class="fx:recipe:switch" role="switch" aria-checked="true">
  <span class="fx:hidden">Theme</span>
</button>
```

`fx:recipe:switch` uses `aria-checked="true"` to move the thumb and apply the
brand background.

## JavaScript API

Fluxara's JavaScript API is intentionally small.

```js
import {
  defaultTheme,
  defineFluxaraConfig,
  setFluxaraTheme,
  toggleFluxaraTheme,
  version
} from "fluxara";
```

### `version`

Current package version:

```js
console.log(version);
```

### `defaultTheme`

The default JavaScript representation of core semantic theme groups:

```js
console.log(defaultTheme.color.brand);
console.log(defaultTheme.space[4]);
```

### `defineFluxaraConfig(config)`

Creates a Fluxara config object with defaults:

```js
import { defineFluxaraConfig } from "fluxara";

export default defineFluxaraConfig({
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}"],
  output: "dist/fluxara.css"
});
```

Default config:

```js
{
  theme: defaultTheme,
  content: [],
  output: "dist/fluxara.css"
}
```

### `setFluxaraTheme(themeName, root?)`

Sets `data-fx-theme` on the provided root element. If no root is provided,
Fluxara uses `document.documentElement`.

```js
import { setFluxaraTheme } from "fluxara";

setFluxaraTheme("midnight");
```

### `toggleFluxaraTheme(a?, b?, root?)`

Toggles between two theme names. Defaults to `aurora` and `midnight`.

```js
import { toggleFluxaraTheme } from "fluxara";

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  toggleFluxaraTheme();
});
```

## CLI

Fluxara ships a small CLI:

```bash
npx fluxara --help
```

### Initialize A Config

```bash
npx fluxara init
```

This creates `fluxara.config.mjs`:

```js
import { defineFluxaraConfig } from "fluxara";

export default defineFluxaraConfig({
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}"],
  output: "dist/fluxara.css"
});
```

### Build CSS

```bash
npx fluxara build --out dist/fluxara.css
```

The CLI copies the compiled Fluxara stylesheet to your chosen output path.

### Print Tokens

```bash
npx fluxara tokens
```

This prints the CSS custom property names Fluxara defines.

## Building From Source

Build the compiled and minified CSS:

```bash
npm run build
```

Outputs:

```txt
dist/fluxara.css
dist/fluxara.min.css
```

Run the package integrity check:

```bash
npm run check
```

Run the same checks npm will run before packing:

```bash
npm run prepack
```

## Publishing

Fluxara is configured for public npm publishing:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

Before publishing:

```bash
npm run build
npm run check
npm pack --dry-run
```

Publish:

```bash
npm publish
```

The package includes:

- `dist/fluxara.css`
- `dist/fluxara.min.css`
- `src/css/**`
- `src/js/**`
- `bin/fluxara.mjs`
- `examples/**`
- `README.md`
- `LICENSE`

## Browser Support

Fluxara uses modern CSS features:

- CSS custom properties
- Cascade layers
- Logical properties
- `color-mix()`
- Container queries
- `text-wrap`
- `vi` and `vb` viewport units

For best results, target current versions of Chrome, Edge, Firefox, and Safari.
If you need older browser support, test the specific features you use and add
fallbacks in your app layer.

## Project Structure

```txt
fluxara/
  bin/
    fluxara.mjs
  dist/
    fluxara.css
    fluxara.min.css
  examples/
    index.html
  scripts/
    build.mjs
    check.mjs
  src/
    css/
      core/
        base.css
        layers.css
        reset.css
        tokens.css
      layout/
        display.css
        grid.css
        overflow.css
        positioning.css
        sizing.css
      utilities/
        color.css
        effects.css
        interactivity.css
        motion.css
        recipes.css
        spacing.css
        typography.css
        variants.css
      fluxara.css
    js/
      index.d.ts
      index.js
```

## Best Practices

Use semantic tokens first:

```html
<button class="fx:recipe:button fx:bg:brand fx:fg:brand-ink">
  Primary action
</button>
```

Use `$` utilities for one-off values:

```html
<div class="fx:w:$ fx:p:4" style="--fx-w: min(100%, 42rem)">
  Custom width.
</div>
```

Use recipes for repeated interface primitives:

```html
<article class="fx:recipe:panel fx:p:5 fx:stack:3">
  ...
</article>
```

Keep application-specific rules in your own layer:

```css
@layer app.components {
  .dashboard-shell {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

Prefer logical properties when extending Fluxara:

```css
@layer app.utilities {
  .app\:inset-header {
    padding-block-start: var(--fx-space-6);
  }
}
```

## Roadmap Ideas

Fluxara `0.1.0` is a CSS-first foundation. Strong next additions would be:

- A larger generated utility scale.
- Optional content scanning and CSS pruning.
- More responsive and container variants.
- Additional semantic recipes for form fields, navigation, menus, dialogs, and tables.
- First-class docs website.
- Theme generator for custom palettes.
- A plugin API for project-specific utility packs.

## License

MIT.