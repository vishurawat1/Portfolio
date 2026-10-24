<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:hallmark-anti-slop-rules -->
# Anti-AI-Slop Frontend Design (Hallmark)

Refer to `.agents/skills/hallmark/SKILL.md` for full design guidelines, 57 slop-test gates, 21 themes, and macrostructures.

### Core Disciplines:
1. **Pre-emit self-critique**: Before emitting UI, critique on Hierarchy, Execution, Specificity, Restraint, and Variety.
2. **Honest copy — no fabricated content**: Never invent fake metrics (e.g. "+47% conversion", "trusted by 50,000+ teams"), fake logos, or fake testimonials.
3. **Locked tokens — no mid-render improvisation**: Always use design tokens (`var(--...)` or defined Tailwind theme variables) instead of random inline hex / OKLCH / RGB values.
4. **No re-drawn UI chrome**: Do not build mock browser windows with traffic light dots, fake phone bezels, or mock title bars.
5. **Strict Mobile Responsiveness**: Ensure no horizontal overflow (`overflow-x: clip`), no wrapped 2-line button text, and proper wrapping.
6. **Typography purity**: Display headings must be roman (`font-style: normal`). No italic emphasis inside headings.
<!-- END:hallmark-anti-slop-rules -->

