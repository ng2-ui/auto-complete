# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Angular version numbers](https://angular.dev/reference/releases) (major version = supported Angular major version).

---

## [19.0.0] — 2026-06-04

### Changed
- **Upgraded to Angular 19** (`@angular/*` 19.2.x). `peerDependencies` now require `@angular/common`
  and `@angular/core` `^19.0.0`. Install `@ngui/auto-complete@19` for Angular 19 projects.
- Migrated the library template to Angular's built-in control flow syntax (`@if` / `@for` in place of
  `*ngIf` / `*ngFor`).

### Internal (development tooling only — no impact on consumers)
- Migrated ESLint from `.eslintrc.json` to flat config (`eslint.config.js`); upgraded ESLint 8 → 9 and
  switched to the unified `angular-eslint` and `typescript-eslint` packages.
- Bumped dev dependencies to the newest versions compatible with Angular 19: `cypress` 13 → 15,
  `@cypress/schematic` 2 → 4.3, `eslint-plugin-cypress` 3 → 6, `jasmine-core` + `@types/jasmine` 5 → 6,
  `@types/node` 22 → 24, `karma-jasmine-html-reporter` 2.1 → 2.2 (reduces `npm audit` from 52 to 9).
- Added unit specs for the library component and service, and replaced the stale Angular CLI boilerplate
  demo specs with working `TestBed` setups.

### Notes
- The library remains NgModule-based in this release; the standalone migration is planned for the
  Angular 20 release.
- ESLint 10, `@cypress/schematic` 5, and the standalone migration are deferred to the Angular 20 release
  (they require Angular 20 / angular-eslint 20).

---

## [18.6.0] — 2026-06-04

### Fixed
- `select-value-of` now correctly extracts falsy property values (`0`, `null`, `false`, `''`) from the
  selected object — previously the truthiness check caused the raw item to be emitted instead of the
  extracted property (fixes #373)

### Added
- `no-match-found-text=""` (empty string) now fully suppresses the "No Result Found" row — previously
  the empty string fell through to the default text (fixes #307, #292, #198)
- `(noMatchFound)` output on both `<ngui-auto-complete>` component and `[ngui-auto-complete]` directive —
  fires whenever the filtered list is empty and `min-chars` threshold has been met, enabling consumers
  to render an "Add new…" affordance

---

## [18.5.0] — 2026-06-03

### Fixed
- Scoped `NguiAutoCompleteService` per-component instance (was a module singleton — multiple simultaneous
  `<ngui-auto-complete>` components overwrote each other's `source` property causing a runtime crash)
- `isLoading` no longer stays stuck `true` after a failed HTTP request — `error` handler now resets it
- `ngOnDestroy` subscription teardown: replaced invalid `EventEmitter.unsubscribe()` calls with proper
  RxJS `Subscription` management via `dropdownSubs`
- Replaced `UntypedFormControl` / `UntypedFormGroup` with typed `FormControl` / `FormGroup`
- Root `.eslintrc.json` referenced non-existent `e2e/tsconfig.json` — removed
- Project ESLint configs used file-relative tsconfig paths — changed to workspace-root-relative
- `demo:prefix` in `angular.json` was `docs` instead of `app`
- Removed broken `ct` Cypress component-test target from the library `angular.json` entry
  (referenced non-existent `auto-complete:serve` target)
- `auto-select-first-item` demo was missing `[auto-select-first-item]="true"` — feature was never active

### Changed
- Replaced deprecated `karma-coverage-istanbul-reporter` with `karma-coverage`
- Removed unused `@types/jasminewd2` (Protractor artefact, not needed with Cypress)
- Pinned `cypress` to `^13.0.0` instead of `"latest"`
- Demo Observable source example replaced from Marvel API (broken auth) to Open Library (free, no key)
- Demo HTTP source examples replaced from Google Maps (requires key) to Nominatim/OpenStreetMap (free, no key)
- RTL demo updated to use Arabic city names with `dir="rtl"` scoped to the demo area only

### Added
- Angular Material toolbar in demo app with library title and links to GitHub / npm
- Demo examples use `<mat-card>` layout in a responsive CSS grid (2-column desktop, 1-column mobile)
- Collapsible "View Template" expansion panel per demo example
- `MatToolbarModule`, `MatCardModule`, `MatExpansionModule`, `MatButtonModule` added to demo module
- Revamped `styles.scss`: indigo-pink Material theme, global typography, dark code-block styling
- Descriptive subtitles and usage hints on all directive and component demo examples
- Restructured README: badges, API reference table, version-compatibility table, updated dev instructions

---

## [18.0.0] — 2024-09-16

### Changed
- Upgraded to Angular 18
- Migrated deprecated `Observable<T>` constructor params to modern pipe-based patterns
- Replaced deprecated Protractor e2e tests with Cypress

---

## [17.0.0] — 2024-09-16

### Changed
- Upgraded to Angular 17

---

## [16.0.0] — 2024-09-16

### Changed
- Upgraded to Angular 16

---

## [15.0.0] — 2024-09-16

### Changed
- Upgraded to Angular 15
- Removed deprecated modules and services
- Refactored: split SCSS and HTML into separate files for library component

---

## [14.0.0] — 2024-09-16

### Changed
- Upgraded to Angular 14
- Added GitHub Pages docs URL

---

## [13.0.0] — 2024-09-15

### Changed
- Upgraded to Angular 13
- Versioning now matches the supported Angular major version
- Migrated from TSLint to ESLint
- Target changed from ES5 to ES2020

### Fixed
- Possible fix for `accept-user-input` issues (#372)
- Possible fix for `getFormattedListItem(...).toLowerCase is not a function` (#375)

---

## [4.0.0] — 2024-09-15

### Changed
- Upgraded to Angular 12

---

## [3.0.0] — 2020-03-11

### Changed
- Upgraded to Angular 9
- Migrated boilerplate to `@angular/cli`

---

## [2.0.0] — 2018-07-08

### Changed
- Upgraded to Angular 6 and RxJS 6

### Added
- New property `ignore-accents` (default `true`)

---

## [1.0.2] — 2018-03-25

### Fixed
- Build and publish issues

---

## [1.0.0] — 2018-03-24

### Changed
- Published latest changes from community PRs
- Supports Angular 5; may contain breaking changes

---

## [0.14.1] — 2017-09-08

### Added
- New property `select-on-blur`

---

## [0.14.0] — 2017-08-29

### Changed
- Upgraded to Angular 4

---

## [0.13.0] — 2017-03-29

### Changed
- Renamed module to `@ngui/auto-complete`

---

## [0.12.0] — 2017-03-22

### Added
- New property `match-formatted`

---

## [0.11.0] — 2017-03-08

### Added
- New property `value-formatter`
