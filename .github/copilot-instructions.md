# GitHub Copilot instructions

Repository custom instructions for `@ngui/auto-complete`. (A fuller agent guide lives in
[`CLAUDE.md`](../CLAUDE.md) at the repo root.)

## What this is

An Angular autocomplete usable as a **directive** (`[ngui-auto-complete]`) or a standalone **component**
(`<ngui-auto-complete>`). CLI monorepo:

- `projects/auto-complete` — the published library.
- `projects/demo` — demo app, built to `docs/` for GitHub Pages. **It consumes the built library from
  `dist/`**, so rebuild the library before the demo reflects library changes.

The library major version tracks the supported Angular major (`@ngui/auto-complete@N` ⇒ Angular `N`).

## Conventions

- **Conventional Commits**; mark breaking changes with `!` and a `BREAKING CHANGE:` footer.
- **Small, single-concern PRs.** Branch from `master`, open a PR, and let a maintainer merge.
- **Prettier-enforced** (`.prettierrc.json`: printWidth 140, **tabs**, single quotes, trailing commas) via
  a husky + lint-staged pre-commit hook. Markdown is git-ignored by Prettier.
- **ESLint flat config** (`eslint.config.js`).
- Update **CHANGELOG.md** for any user-facing change, **README.md** when the public API changes, and add a
  **MIGRATION.md** entry for breaking changes.
- Don't commit the generated `projects/demo/src/app/build-info.ts` timestamp — it's a placeholder.

## Validation gate (must pass before a PR)

```bash
npm run build-lib:prod   # build library first (demo consumes dist/)
npm run build-docs
npm run lint
npx ng test auto-complete --watch=false --browsers=ChromeHeadless
npx ng test demo --watch=false --browsers=ChromeHeadless
npm run format:check
```

## Coding guidance for this library

- Prefer modern Angular: standalone APIs, `inject()`, signal `input()` / `output()` / `viewChild()`,
  `@if`/`@for` control flow.
- **Signal `input()`s are read-only.** Set them in tests and from the directive via
  `ComponentRef.setInput('<public-alias>', value)` — never assign `component.x = …`.
- Keep public inputs' **kebab-case aliases** (`min-chars`, `list-formatter`, …). Use `numberAttribute` /
  `booleanAttribute` transforms so string-attribute and bound forms both work.
- `output()` is `<void>` by default — use `output<T>()` for events with a payload.
- Angular 21 is zoneless by default: when a test mutates a child's fields out of band, call `markForCheck()`
  before `detectChanges()` to avoid a false `NG0100`.
- When discovering a durable, non-obvious lesson, add it to the _Lessons learned_ section of `CLAUDE.md`.
