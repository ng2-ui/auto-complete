# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Angular version numbers](https://angular.dev/reference/releases) (major version = supported Angular major version).

---

## [Unreleased]

### Changed
- Replaced `UntypedFormControl` / `UntypedFormGroup` with typed `FormControl` / `FormGroup`
- Fixed `ngOnDestroy` subscription teardown: replaced invalid `EventEmitter.unsubscribe()` calls with proper `Subscription` management
- Replaced deprecated `karma-coverage-istanbul-reporter` with `karma-coverage`
- Removed unused `@types/jasminewd2` (Protractor artefact)
- Pinned `cypress` to a specific version instead of `"latest"`
- Removed broken `ct` Cypress component-test target from the library `angular.json` entry
- Fixed root `.eslintrc.json` referencing non-existent `e2e/tsconfig.json`
- Fixed `angular.json` demo `prefix` from `docs` to `app`

### Added
- Angular Material toolbar in demo app with library title and links
- Demo examples use `<mat-card>` layout in a responsive CSS grid
- Collapsible "View Template" code panels (using `mat-expansion-panel`) per demo example
- `MatToolbarModule`, `MatCardModule`, `MatExpansionModule`, `MatButtonModule` added to demo module
- Revamped `styles.scss` with global typography, dark code-block theme, and responsive grid
- Restructured README: badges, proper API reference table, version-compatibility table, updated dev instructions

---

## [18.0.0] — 2024-09-xx

### Changed
- Upgraded to Angular 18
- Migrated deprecated `Observable<T>` constructor params to modern pipe-based patterns
- Replaced deprecated Protractor e2e tests with Cypress

---

## [17.0.0] — 2023-11-xx

### Changed
- Upgraded to Angular 17

---

## [16.0.0] — 2023-05-xx

### Changed
- Upgraded to Angular 16

---

## [15.0.0] — 2022-11-xx

### Changed
- Upgraded to Angular 15
- Removed deprecated modules and services
- Refactored: split SCSS and HTML into separate files for library component

---

## [14.0.0] — 2022-06-xx

### Changed
- Upgraded to Angular 14
- Added GitHub Pages docs URL

---

## [13.0.0] — 2021-11-xx

### Changed
- Upgraded to Angular 13
- Versioning now matches the supported Angular major version
- Migrated from TSLint to ESLint
- Target changed from ES5 to ES2020

### Fixed
- Possible fix for `accept-user-input` issues (#372)
- Possible fix for `getFormattedListItem(...).toLowerCase is not a function` (#375)

---

## [4.0.0]

### Changed
- Upgraded to Angular 12

---

## [3.0.0]

### Changed
- Upgraded to Angular 9
- Migrated boilerplate to `@angular/cli`

---

## [2.0.0]

### Changed
- Upgraded to Angular 6 and RxJS 6

### Added
- New property `ignore-accents` (default `true`)

---

## [1.0.2]

### Fixed
- Build and publish issues

---

## [1.0.0]

### Changed
- Published latest changes from community PRs
- Supports Angular 5; may contain breaking changes

---

## [0.14.1]

### Added
- New property `select-on-blur`

---

## [0.14.0]

### Changed
- Upgraded to Angular 4

---

## [0.13.0]

### Changed
- Renamed module to `@ngui/auto-complete`

---

## [0.12.0]

### Added
- New property `match-formatted`

---

## [0.11.0]

### Added
- New property `value-formatter`
