# @ngui/auto-complete

[![CI](https://github.com/ng2-ui/auto-complete/actions/workflows/ci.yml/badge.svg)](https://github.com/ng2-ui/auto-complete/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@ngui/auto-complete.svg)](https://www.npmjs.com/package/@ngui/auto-complete)
[![npm downloads](https://img.shields.io/npm/dt/@ngui/auto-complete.svg)](https://www.npmjs.com/package/@ngui/auto-complete)
[![npm license](https://img.shields.io/npm/l/@ngui/auto-complete.svg)](https://www.npmjs.com/package/@ngui/auto-complete)
[![GitHub issues](https://img.shields.io/github/issues/ng2-ui/auto-complete.svg)](https://github.com/ng2-ui/auto-complete/issues)

A versatile Angular autocomplete library that works as both a **directive** (attached to any input) and a **standalone component**.

**[Live Demo](https://ng2-ui.github.io/auto-complete/)**

---

## Installation

```bash
npm install @ngui/auto-complete
```

## Setup

### Standalone (Angular 21+)

The component and directive are **standalone**. Import them directly into your standalone component
(or NgModule) `imports`:

```typescript
import { NguiAutoCompleteComponent, NguiAutoCompleteDirective } from '@ngui/auto-complete';

@Component({
  // ...
  imports: [FormsModule, NguiAutoCompleteComponent, NguiAutoCompleteDirective],
})
export class MyComponent {}
```

### NgModule (Angular 20 and below)

`NguiAutoCompleteModule` was **removed in v21** — import the standalone component/directive shown above
instead. If your app still relies on the NgModule, install the matching major and import the module as
before:

- **Angular 20** → `npm install @ngui/auto-complete@20` (standalone, but `NguiAutoCompleteModule` is still
  re-exported for back-compat).
- **Angular 19 and older** → `npm install @ngui/auto-complete@19`.

```typescript
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@NgModule({
  imports: [BrowserModule, FormsModule, NguiAutoCompleteModule],
})
export class AppModule {}
```

---

## Usage

### As a Directive

Attach to any element containing an `input`. The directive is a `ControlValueAccessor`, so it binds with
`[(ngModel)]` like any form control:

```html
<!-- Directly on an input -->
<input ngui-auto-complete [(ngModel)]="myValue" [source]="myArray" />

<!-- On a wrapping div: put the value binding on the host element -->
<div ngui-auto-complete [(ngModel)]="myValue" [source]="myArray">
  <input />
</div>
```

### Reactive forms

Because the directive is a `ControlValueAccessor`, `[formControl]` and `formControlName` work directly:

```html
<input ngui-auto-complete [formControl]="cityControl" [source]="cities" />

<form [formGroup]="form">
  <input ngui-auto-complete formControlName="city" [source]="cities" />
</form>
```

### As a Component

Use `<ngui-auto-complete>` directly, control its visibility with `@if`:

```html
<input [(ngModel)]="myValue" (focus)="show = true" (blur)="show = false" />
@if (show) {
  <ngui-auto-complete
    [source]="myArray"
    [show-input-tag]="false"
    [show-dropdown-on-init]="true"
    [(value)]="myValue">
  </ngui-auto-complete>
}
```

### Remote / Observable Source

```html
<input ngui-auto-complete
  [(ngModel)]="address"
  [source]="searchFn"
  path-to-data="results"
  list-formatter="formatted_address"
  min-chars="2" />
```

```typescript
searchFn = (keyword: string): Observable<any> => {
  return this.http.get(`https://api.example.com/search?q=${keyword}`);
};
```

### Custom dropdown templates

Instead of the string-based `list-formatter` / `header-item-template`, you can pass Angular
`ng-template`s. `itemTemplate` receives the item as `$implicit` and the row index as `index`; it
works on both the component and the directive:

```html
<input ngui-auto-complete [(ngModel)]="myValue" [source]="myArray"
  [itemTemplate]="row" [headerTemplate]="head" />

<ng-template #head>Suggestions</ng-template>
<ng-template #row let-item let-i="index">
  <strong>{{ i + 1 }}.</strong> {{ item.name }} — <em>{{ item.country }}</em>
</ng-template>
```

---

## API Reference

### Directive Inputs (`[ngui-auto-complete]`)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `source` | `any[] \| string \| Function` | — | **Required.** Array, URL string, or function returning `Observable` |
| `path-to-data` | `string` | — | Dot-path to array in HTTP response, e.g. `data.results` |
| `min-chars` | `number` | `0` | Minimum characters before fetching remote data |
| `max-num-list` | `number` | unlimited | Maximum suggestions to show |
| `display-with` | `string \| ((item) => string)` | `value` | Text to show in the input after selecting an object — a property name (`display-with="name"`) or a function (`[display-with]="fn"`) |
| `select-value-of` | `string` | — | Return this key's value on selection instead of the full object |
| `list-formatter` | `string \| Function` | — | Format each dropdown item. String pattern `(key) name` or function `(item) => string` |
| `itemTemplate` | `TemplateRef` | — | `ng-template` for each dropdown row (context: `$implicit` = item, `index` = row index). Takes precedence over `list-formatter` |
| `headerTemplate` | `TemplateRef` | — | `ng-template` for the non-selectable header row. Takes precedence over `header-item-template` |
| `blank-option-text` | `string` | — | Adds an empty first option with this label |
| `no-match-found-text` | `string` | — | Text shown when no results match. Set to `""` to suppress the row entirely |
| `loading-text` | `string` | `'Loading'` | Text shown while fetching remote data |
| `loading-template` | `string` | — | HTML string shown while loading |
| `header-item-template` | `string` | — | Non-selectable header row above results (HTML string) |
| `accept-user-input` | `boolean` | `true` | Allow values not in the list |
| `auto-select-first-item` | `boolean` | `false` | Pre-highlight the first suggestion |
| `open-on-focus` | `boolean` | `true` | Open dropdown on input focus |
| `close-on-focusout` | `boolean` | `true` | Close dropdown on focusout |
| `select-on-blur` | `boolean` | `false` | Select highlighted item on blur |
| `tab-to-select` | `boolean` | `true` | Select highlighted item on Tab key |
| `re-focus-after-select` | `boolean` | `true` | Return focus to input after a selection |
| `match-formatted` | `boolean` | `false` | Match keyword against formatted values instead of raw data |
| `ignore-accents` | `boolean` | `true` | Treat accented characters as their base characters during matching |
| `autocomplete` | `boolean` | `false` | Set `autocomplete="off"` on the input (`false` = off) |
| `is-rtl` | `boolean` | `false` | Right-to-left dropdown positioning |
| `open-direction` | `'auto' \| 'up' \| 'down'` | `'auto'` | Force the dropdown above (`up`) or below (`down`) the input. `auto` opens below unless the input is near the bottom of the viewport |
| `z-index` | `string` | `'1'` | CSS z-index of the dropdown |

### Directive value binding & outputs

The selected value flows through Angular forms (the directive is a `ControlValueAccessor`): bind it with
`[(ngModel)]`, `[formControl]` or `formControlName`. `(ngModelChange)` / the control's `valueChanges` fire
on every accepted value.

| Output | Payload | Description |
|--------|---------|-------------|
| `(valueSelected)` | `NguiAutoCompleteSelection` | Fires when a value is committed — see the payload below. Use `fromSource` to tell a list pick from a typed value |
| `(noMatchFound)` | `void` | Fires when the filtered list is empty and `min-chars` threshold is met — use it to show an "Add new…" affordance |

The `(valueSelected)` payload:

```typescript
interface NguiAutoCompleteSelection<T = any> {
  value: T;          // the committed value (same as [(ngModel)] / [(value)])
  item: T;           // the full picked object (or the typed text)
  index: number;     // row in the shown list; -1 when typed (fromSource = false)
  fromSource: boolean; // true = picked from [source]; false = typed by the user
}
```

### Component Inputs (`<ngui-auto-complete>`)

All directive inputs are supported plus:

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `any` | — | Two-way bindable selected value: `[(value)]="myValue"` |
| `show-input-tag` | `boolean` | `true` | Render an `<input>` inside the component |
| `show-dropdown-on-init` | `boolean` | `false` | Open dropdown immediately when component appears |
| `placeholder` | `string` | — | Placeholder text for the internal input |

> **Note:** for the standalone component, `open-direction="up"` renders the dropdown above the input via
> CSS; `auto`/`down` keep it below. The viewport-aware `auto` flip applies to the directive usage.

### Component Outputs

Same as the directive: `(valueSelected)` emits `NguiAutoCompleteSelection` (see above) and `(noMatchFound)`
emits `void`. For just the value, prefer `[(value)]`.

---

## Angular Version Compatibility

This library follows Angular's versioning: **`@ngui/auto-complete@N.x` supports Angular N**.
Install the version matching your Angular major (e.g. Angular 21 → `npm install @ngui/auto-complete@21`).

---

## Development

### Quick start

```bash
git clone https://github.com/ng2-ui/auto-complete.git
cd auto-complete
npm install

# Build library in watch mode, then in a second terminal start the demo app
npm run build-lib:watch
npm start
```

### Available scripts

| Script | Description |
|--------|-------------|
| `npm start` | Serve the demo app on port 4200 |
| `npm test` | Run unit tests (Karma/Jasmine) |
| `npm run lint` | Lint all TypeScript and HTML |
| `npm run build-lib:watch` | Build library in watch mode (for demo development) |
| `npm run build-lib:prod` | Production library build |
| `npm run build-docs` | Build demo app for GitHub Pages deployment |
| `npm run cypress:open` | Open Cypress e2e test runner |
| `npm run cypress:run` | Run Cypress e2e tests headlessly |

### Publish a new version

```bash
# 1. Update version in projects/auto-complete/package.json
# 2. Build the library and copy README/CHANGELOG/LICENSE into dist/
npm run build-lib:prod

# 3. Move into the built output — do NOT run npm publish from the project root
#    (the root package.json is private and will fail)
cd dist
npm publish --access public
```

---

## Contributing — help wanted!

This library is maintained by a small team with limited time — every contribution genuinely helps keep it alive and improving. If you use it and find it useful, here are easy ways to give back:

- **Found a bug?** Open an issue with a clear description and a minimal reproduction
- **Have an idea?** Check the [open issues](https://github.com/ng2-ui/auto-complete/issues) first, then open a new one if needed
- **Want to fix something?** Pull requests are always welcome — small focused PRs are easiest to review
- **Using it at work?** A GitHub star goes a long way for visibility

Issues and pull requests: [github.com/ng2-ui/auto-complete](https://github.com/ng2-ui/auto-complete).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history of changes.

## License

[MIT](LICENSE.md)
