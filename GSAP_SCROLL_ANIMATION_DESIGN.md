# GSAP Scroll Animation Design

## Understanding Summary

- Add smooth, professional scroll-triggered animation to the existing portfolio.
- Use GSAP and ScrollTrigger while retaining native browser scrolling.
- Animate section headings, content groups, cards, project media, skill bars, and counters.
- Preserve the loader, navigation, mobile menu, hover effects, and project-card tilt.
- Keep motion lighter on small screens and respect reduced-motion preferences.
- Keep the implementation suitable for a static portfolio without backend changes.

## Assumptions

- A medium motion intensity is preferred over a flashy or parallax-heavy experience.
- GSAP and ScrollTrigger can be loaded from a public CDN.
- Existing CSS reveal behavior should remain as a fallback if the CDN is unavailable.
- Animations should run once per page visit for readability and performance.
- The portfolio is maintained as a small static site by its owner.

## Final Design

- Load GSAP core and ScrollTrigger before `script.js`.
- Detect reduced-motion preferences before creating scroll animations.
- Use grouped, staggered reveal animations for headings and repeated cards.
- Apply directional motion to major two-column content and subtle vertical media movement.
- Keep the existing IntersectionObserver reveal system as a no-GSAP fallback.
- Use mobile-specific distances and durations through `gsap.matchMedia()`.
- Avoid animating project-card transforms after reveal so pointer tilt remains in control.

## Reliability And Performance

- No user data or security-sensitive behavior is introduced.
- ScrollTrigger instances are created only when GSAP is available.
- Transform and opacity animations are GPU-friendly.
- Reduced-motion users receive immediately visible content without animated transforms.
- CDN failure falls back to the existing reveal implementation.

## Decision Log

1. Use native scrolling with GSAP ScrollTrigger instead of a scroll-smoothing dependency.
   - Alternative: a ScrollSmoother-style experience.
   - Reason: fewer dependencies, lower conflict risk, and better mobile behavior.
2. Use one-time entrance animations.
   - Alternative: replay animations whenever sections re-enter the viewport.
   - Reason: reduced distraction and less runtime work.
3. Preserve the existing reveal observer as fallback behavior.
   - Alternative: remove the observer completely.
   - Reason: content remains usable if CDN scripts fail.
4. Respect `prefers-reduced-motion`.
   - Alternative: always run the same animations.
   - Reason: accessibility and user comfort.

## Verification

- Confirm the page loads when GSAP is available and when it is blocked.
- Verify desktop and mobile section/card reveals.
- Verify project-card hover tilt still works after reveal.
- Verify navigation, counters, skill bars, and loader behavior remain intact.
