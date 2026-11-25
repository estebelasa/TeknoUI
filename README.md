# TeknoUI

Angular component library — standalone components, signals, zoneless-ready, design tokens with light/dark themes.

The package lives in [`projects/teknoui`](projects/teknoui) and is named **`@estebelasa/teknoui`** (distributed as GitHub Release assets, not on a registry). Its [README](projects/teknoui/README.md) explains how to use it; [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) explains how it is built.

TeknoUI started inside the author's portfolio website and was moved here with its full git history.

## Development

Requirements: Node.js 22 (see `.nvmrc`) and npm.

```bash
npm ci
npm run typecheck      # library + specs
npm run check:tokens   # every var(--tk-*) used is defined
npm test               # Vitest via the Angular unit-test builder
npm run build          # ng-packagr → dist/teknoui
```

CI (`.github/workflows/ci.yml`) runs the same steps on every pull request and push to `main`. `main` is protected: every change goes through a pull request with green CI.

## Releasing

1. In a pull request, bump `version` in `projects/teknoui/package.json` and merge it.
2. Tag the merged commit and push the tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.
3. `.github/workflows/release.yml` checks that the tag matches the version and is on `main`, builds, packs and attaches `estebelasa-teknoui-X.Y.Z.tgz` to a GitHub Release.

## Repository layout

```
projects/teknoui/
  src/
    components/   tk-card, tk-tag, tk-icon, tk-sidebar (+ sub-components)
    foundation/   design tokens (SCSS → CSS custom properties) and themes
    public-api.ts the only entry point applications import from
docs/             architecture notes
scripts/          repository checks used locally and in CI
```

## License

[MIT](LICENSE) © 2026 Estebe Lasa
