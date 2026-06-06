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

Pass Angular `ng-template`s for custom rendering: `itemTemplate` (each row — receives the item as
`$implicit` and the row index as `index`), `headerTemplate` (a header row), and `loadingTemplate` (shown
while remote data loads). They work on both the component and the directive:

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

One reference for both surfaces. The **Applies to** column says whether each option works on the directive
(`[ngui-auto-complete]`), the component (`<ngui-auto-complete>`), or both. Every option keeps its
kebab-case attribute name; numeric/boolean inputs accept both the attribute form (`min-chars="2"`) and the
bound form (`[min-chars]="2"`).

### Value & forms

How the selected value is read and written.

| Option | Type | Default | Applies to | Description |
|--------|------|---------|------------|-------------|
| `[(ngModel)]` / `[formControl]` / `formControlName` | `T` | — | Directive | The directive is a `ControlValueAccessor`, so the value flows through Angular forms. `(ngModelChange)` / the control's `valueChanges` fire on every accepted value |
| `[(value)]` | `T` | — | Component | Two-way bindable selected value on the standalone component |
| `select-value-of` | `string` | — | Directive | Commit this property's value on selection instead of the whole object |

### Data & filtering

Where suggestions come from and how the keyword is matched.

| Option | Type | Default | Applies to | Description |
|--------|------|---------|------------|-------------|
| `source` | `T[] \| string \| ((keyword) => Observable<T[]>)` | — | Both | **Required.** Local array, URL string, or a function returning an `Observable` |
| `path-to-data` | `string` | — | Both | Dot-path to the array in an HTTP response, e.g. `data.results` |
| `min-chars` | `number` | `0` | Both | Minimum characters before fetching/filtering |
| `max-num-list` | `number` | unlimited | Both | Maximum number of suggestions to show |
| `match-formatted` | `boolean` | `false` | Both | Match the keyword against formatted values instead of the raw data |
| `ignore-accents` | `boolean` | `true` | Both | Treat accented characters as their base characters when matching |

### Display & formatting

How rows and the selected value are rendered.

| Option | Type | Default | Applies to | Description |
|--------|------|---------|------------|-------------|
| `display-with` | `string \| ((item) => string)` | item's `value` | Directive | Text shown in the input after selecting an object — a property name (`display-with="name"`) or a function (`[display-with]="fn"`) |
| `list-formatter` | `string \| ((item) => string)` | — | Both | Format each dropdown row. String pattern `(key) name` or a function |
| `itemTemplate` | `TemplateRef` | — | Both | `ng-template` for each dropdown row (context: `$implicit` = item, `index` = row index). Takes precedence over `list-formatter` |
| `headerTemplate` | `TemplateRef` | — | Both | `ng-template` for a non-selectable header row |
| `loadingTemplate` | `TemplateRef` | — | Both | `ng-template` shown while remote data loads (falls back to `loading-text`) |
| `loading-text` | `string` | `'Loading'` | Both | Text shown while fetching remote data |
| `blank-option-text` | `string` | — | Both | Adds an empty first option with this label |
| `no-match-found-text` | `string` | — | Both | Text shown when nothing matches. Set to `""` to suppress the row entirely |
| `placeholder` | `string` | — | Component | Placeholder for the component's internal input |
| `auto-complete-placeholder` | `string` | — | Directive | Placeholder for the dropdown's (normally hidden) internal input |

### Behavior

Interaction and selection behavior.

| Option | Type | Default | Applies to | Description |
|--------|------|---------|------------|-------------|
| `accept-user-input` | `boolean` | `true` | Both | Allow values that are not in the list |
| `auto-select-first-item` | `boolean` | `false` | Both | Pre-highlight the first suggestion |
| `select-on-blur` | `boolean` | `false` | Both | Select the highlighted item on blur |
| `tab-to-select` | `boolean` | `true` | Both | Select the highlighted item on the Tab key |
| `re-focus-after-select` | `boolean` | `true` | Both | Return focus to the input after a selection |
| `autocomplete` | `boolean` | `false` | Both | When `false`, sets the native `autocomplete="off"` on the input |
| `open-on-focus` | `boolean` | `true` | Directive | Open the dropdown when the input gains focus |
| `close-on-focusout` | `boolean` | `true` | Directive | Close the dropdown on focusout |
| `show-input-tag` | `boolean` | `true` | Component | Render an `<input>` inside the component |
| `show-dropdown-on-init` | `boolean` | `false` | Component | Open the dropdown as soon as the component appears |

### Layout & positioning

| Option | Type | Default | Applies to | Description |
|--------|------|---------|------------|-------------|
| `open-direction` | `'auto' \| 'up' \| 'down'` | `'auto'` | Both | Force the dropdown above (`up`) or below (`down`). For the directive, `auto` opens below unless the input is near the bottom of the viewport; for the component, `up` renders above via CSS and `auto`/`down` keep it below |
| `z-index` | `number` | `1` | Directive | CSS `z-index` of the dropdown |

> **RTL:** there is no RTL input — the dropdown anchors via logical CSS (`inset-inline-start`), so an
> ancestor `dir="rtl"` (or the document direction) positions it correctly on its own.

### Events

Both surfaces emit the same two outputs.

| Output | Payload | Applies to | Description |
|--------|---------|------------|-------------|
| `(valueSelected)` | `NguiAutoCompleteSelection` | Both | Fires when a value is committed. Use `fromSource` to tell a list pick from a typed value |
| `(noMatchFound)` | `void` | Both | Fires when the filtered list is empty and the `min-chars` threshold is met — use it to show an "Add new…" affordance |

The `(valueSelected)` payload:

```typescript
interface NguiAutoCompleteSelection<T = any> {
  value: T;          // the committed value (same as [(ngModel)] / [(value)])
  item: T;           // the full picked object (or the typed text)
  index: number;     // row in the shown list; -1 when typed (fromSource = false)
  fromSource: boolean; // true = picked from [source]; false = typed by the user
}
```

### Type inference

`NguiAutoCompleteComponent<T = any>` is generic. Bind a typed `[source]` (a typed array or a function
returning `Observable<T[]>`) and Angular infers the item type — `[(value)]`, `(valueSelected)`
(`NguiAutoCompleteSelection<T>`) and the `itemTemplate` context are then all typed with no extra
annotation:

```html
<ngui-auto-complete [source]="cities" [(value)]="city" (valueSelected)="onPick($event)"></ngui-auto-complete>
```

```typescript
cities: City[] = [/* … */];
city?: City;
onPick(e: NguiAutoCompleteSelection<City>) { /* e.item is City */ }
```

It defaults to `any`, so existing templates are unaffected. The directive (`[ngui-auto-complete]`) stays
loosely typed — Angular can't infer a generic for an attribute directive in templates, so its
`(valueSelected)` payload is `NguiAutoCompleteSelection<any>`.

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
