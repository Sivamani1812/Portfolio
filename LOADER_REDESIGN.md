# Loader Redesign

## Understanding Summary

- Restore the normal browser cursor across desktop and mobile.
- Replace the current long matrix loader with a fast, coding-themed GSAP intro.
- Assemble a `<SIVA />` wordmark with a short stagger animation.
- Show a compact progress line and percentage before revealing the page.
- Reveal the homepage by splitting two loader panels in opposite directions.
- Keep the complete intro close to 1.8 seconds.
- Support mobile, missing-GSAP, and reduced-motion fallbacks.

## Assumptions

- The loader runs on each full page refresh.
- Existing portfolio colors and typography remain unchanged.
- The implementation stays within `index.html`, `style.css`, and `script.js`.
- No data, security, traffic-scale, or privacy concerns are introduced.
- The loader remains maintainable without additional dependencies beyond the existing GSAP CDN.

## Final Design

The loader opens on a dark full-screen surface with two background panels. A centered `<SIVA />` mark assembles character by character, followed by a slim progress track and a percentage counter. At completion, a cyan scan line crosses the viewport and the two panels move in opposite directions to expose the homepage. The GSAP timeline completes in approximately 1.8 seconds.

When GSAP is unavailable, a short CSS fallback removes the loader. When reduced motion is requested, the sequence becomes a quick fade. The existing hero typing animation begins as soon as the loader finishes.

The custom cursor markup, tracking JavaScript, and `cursor: none` rules are removed. Interactive elements use standard browser pointer behavior.

## Decision Log

- Chosen: Code-Boot Split Reveal for a clear developer identity and strong first impression.
- Rejected: Terminal Loader because it adds too much text and reading time.
- Rejected: Logo Scan because it has less visual impact.
- Duration: Approximately 1.8 seconds to balance speed and presentation.
- Reliability: Include missing-GSAP and reduced-motion fallbacks.
