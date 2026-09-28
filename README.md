# matahho.github.io

Personal site of **Mahdi Haji** — an Apple-style scrollytelling portfolio with a
3D distributed-cluster hero. Built with **Next.js**, **React Three Fiber**, and
**GSAP ScrollTrigger**, statically exported to **GitHub Pages**.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # emits ./out  (includes .nojekyll)
```

## Editing content

All copy lives in **`lib/content.ts`** — bio, research, work, papers, and socials.
Edit that one file; the components render from it. No HTML changes needed for text updates.

## Structure

```
app/                 # layout, page, global styles
components/scene/     # R3F Canvas + ClusterGraph (the 3D hero)
components/sections/  # Hero, About, Research, Work, Contact
components/ui/        # Nav, ScrollProgress, Reveal, SectionHeading
lib/                 # content.ts (text) + scroll.ts (GSAP <-> R3F bridge)
public/              # CV, images, favicons, .nojekyll
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the static
export and publishes it via GitHub Pages.

> **One-time setup:** in the repo, go to **Settings -> Pages -> Build and deployment ->
> Source** and select **GitHub Actions** (instead of the legacy Jekyll branch build).
