# matahho.github.io

Personal site of **Mahdi Haji**: an Apple-style scrollytelling portfolio with a
neural-network hero: your data goes in, the bio comes out. Built with **Next.js**, **Canvas 2D**, and
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

All copy lives in **`lib/content.ts`**: network inputs, the decoded bio, research, work, papers, and socials.
Edit that one file; the components render from it. No HTML changes needed for text updates.

## Structure

```
app/                 # layout, page, global styles
components/sections/  # NeuralHero, Research, Work, Fun, Contact
components/ui/        # Nav, ScrollProgress, Reveal, SectionHeading
lib/                 # content.ts (all copy)
public/              # CV, images, favicons, .nojekyll
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the static
export and publishes it via GitHub Pages.

> **One-time setup:** in the repo, go to **Settings -> Pages -> Build and deployment ->
> Source** and select **GitHub Actions** (instead of the legacy Jekyll branch build).
