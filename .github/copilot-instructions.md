# GitHub Copilot instructions

Custom instructions for **GitHub Copilot** in the `@ngui/auto-complete` repository. Self-contained; scope
is code authoring and review. Stay in your lane — do not edit other agents' instruction files (e.g.
`CLAUDE.md`).

## Project

Angular autocomplete published as a library (`projects/auto-complete`) with a demo app (`projects/demo`,
built to `docs/`). The demo consumes the **built** library from `dist/`, so library source changes aren't
visible to the demo until it's rebuilt. The library's major version tracks the supported Angular major.

## Writing code in this repo

- Use modern Angular: standalone components/directives, `inject()`, signal
  `input()` / `output()` / `viewChild()`, and `@if` / `@for` control flow. Don't add
  `@Input()` / `@Output()` / `@ViewChild` decorators in new code.
- Signal `input()`s are **read-only** — set them in tests and from the directive via
  `ComponentRef.setInput('<public-alias>', value)`; never assign `component.x = …`.
- Keep public inputs' **kebab-case aliases** (`min-chars`, `list-formatter`, …). Use `numberAttribute` /
  `booleanAttribute` transforms so attribute and bound forms both work.
- `output()` defaults to `<void>` — use `output<T>()` for events that carry a payload.
- Match the existing style: **tabs**, single quotes, printWidth 140 (Prettier-enforced). Use Conventional
  Commit messages; mark breaking changes with `!` and a `BREAKING CHANGE:` footer.

## Reviewing changes

Flag a change that:

- adds a user-facing change without a **CHANGELOG.md** entry, changes the public API without a
  **README.md** update, or introduces a breaking change without a **MIGRATION.md** entry;
- commits a non-empty timestamp in `projects/demo/src/app/build-info.ts` (it must stay a placeholder);
- assigns to a signal input (`component.x = …`) instead of using `ComponentRef.setInput()`;
- uses `@Input()` / `@Output()` / `@ViewChild` where a signal API fits.

## Recording lessons

When you learn a durable, Copilot-relevant convention for this repo, propose adding it to **this file**.
Keep instructions short and specific — shorter files are applied more reliably.
