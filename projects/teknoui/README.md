# @estebelasa/teknoui

Angular component library: standalone, zoneless-ready components built with signals, plus a design-token foundation (CSS custom properties) with light and dark themes.

> Status: early development (`0.x`). Not published to a registry yet.

## Requirements

- Angular `^22.1`

## Components

| Component | Selector | Description |
|---|---|---|
| Card | `tk-card` | Surface container with `variant` and `padding` options and header/content/footer slots. |
| Tag | `tk-tag` | Small label with variants and sizes. |
| Icon | `tk-icon` | Inline line icons (`TkIconName`), always decorative (`aria-hidden`). |
| Sidebar | `tk-sidebar` | Collapsible navigation sidebar with profile, brand slots and a mobile drawer (focus trap, Escape, backdrop). |

Each component has its own README next to its source in `src/components/`.

## Usage

Import components from the package root only:

```ts
import { TkCardComponent, TkTagComponent } from '@estebelasa/teknoui';
```

Load the foundation (tokens + themes) once, in the application's global styles:

```scss
@use '@estebelasa/teknoui/styles';
```

The light theme is the default; set `data-theme="dark"` (or `"light"`) on `<html>` to choose one explicitly.

## Architecture

See [docs/ARCHITECTURE.md](https://github.com/estebelasa/TeknoUI/blob/main/docs/ARCHITECTURE.md).
