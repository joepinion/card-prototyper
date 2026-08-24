# Repository Guidelines

## Project Overview

Card Prototyper is a React component library for generating prototype cards for tabletop games. Consumers import the package, define custom card templates by extending base classes, and render sheets that can be downloaded as PNG or exported to PDF.

## Project Structure & Module Organization

- `src/main.js` — Library entry point. Exports the unified `CardPrototyper` object with `cards`, `sheets`, and `utils` namespaces.
- `src/CardTemplates/CardTemplateBase.jsx` — Abstract base class for all card templates. Subclasses override `getContent()`, `static getWidth()`, `static getHeight()`, and optionally `getClass()`.
- `src/SheetTemplates/SheetTemplateBase.jsx` — Abstract base for sheet layouts. Accepts a `cardInfo` prop with either inline `data` or a `data_url` (CSV). Calls `makeCardsFromData()` to instantiate card components.
- `src/SheetTemplates/PrintableSheet.jsx` — Extends `SheetTemplateBase`. Renders multiple pages and exports them as a multi-page PDF via jsPDF.
- `src/SheetTemplates/GridSheet.jsx` — Extends `SheetTemplateBase` with a grid-based layout.
- `src/utils.jsx` — Core helpers: CSV loading (`loadCsvDataFromUrl`), image capture (`getDomImageBlob`, `getDomImageData`, `downloadDomImage`), card instantiation (`makeCardsFromData`), text processing (`getTextProcessor`), and back-template factory (`genericBackTemplate`).
- `src/gameIcons.jsx` — `<GameIcon>` component wrapping SVGs from the local `game_icons/` directory.
- `game_icons/` — Local copy of the game-icons.net SVG library (thousands of SVGs organized by artist). Do not edit these files manually; regenerate with `npm run put-icons`.
- `game-icons.mjs` — Script that processes the cloned game icons repo into the format used by `gameIcons.jsx`.

### Key constants (in `src/utils.jsx`)

- `PX_PER_INCH = 92` — used for PDF sizing
- `IMAGE_SCALE = 3` — default render scale for PNG export

### Text processor syntax

`getTextProcessor()` returns a function that converts bracket tokens in card text to inline icons:

- `[fas-<name>]` → Font Awesome Solid
- `[fa-<name>]` → Font Awesome Regular
- `[fab-<name>]` → Font Awesome Brands
- `[gi-<artist>/<icon-name>]` → Game Icon SVG
- `[>]` or newline → paragraph break

## Build, Test, and Development Commands

No `dev` or `build` scripts are defined — this project is used as an importable library, not a standalone app.

```bash
npm run tailwind-watch   # compile Tailwind CSS (src/main.css → src/output.css) in watch mode
npm run game-icons       # process game icon SVGs into gameIcons.jsx format
npm run put-icons        # clone game-icons/icons repo, then run game-icons script
npx eslint .             # lint JS/JSX files
```

There is no test suite configured.

## Coding Style & Naming Conventions

- **Class-based React components** throughout — do not introduce functional components or hooks unless the existing pattern changes.
- **Plain JavaScript (JSX)** — no TypeScript.
- **Tailwind utility classes** written inline in JSX; per-component SCSS files (`CardTemplate.scss`, `SheetTemplate.scss`) for structural styles.
- **ESLint** (`eslint.config.js`): `@eslint/js` recommended + `eslint-plugin-react-hooks` recommended + `eslint-plugin-react-refresh`. Unused vars with names matching `/^[A-Z_]/` are allowed (uppercase constants pattern).
- No explicit formatter config (no Prettier). Match surrounding style.

## Commit Guidelines

Commits in this repo use short, informal messages with no conventional-commit prefix (e.g., `page numbs`, `card width fix`). Follow the same low-ceremony style.
