# Migration Guide

Upgrade notes for breaking changes between major versions of `@ngui/auto-complete`. The major version
tracks the supported Angular major (`@ngui/auto-complete@N` ⇒ Angular `N`).

---

## v21 → v22

A framework-only major — there are **no public API changes**. Upgrading is just bumping Angular.

### Requires Angular 22

Update Angular (and `@angular/cdk`) to 22 first, then install the matching library major. Angular 21 and
older projects must stay on `@ngui/auto-complete@21`.

```bash
ng update @angular/core@22 @angular/cli@22 @angular/cdk@22
npm install @ngui/auto-complete@22
```

Inputs, outputs, templates and the CDK overlay setup from v21 are unchanged. The only consumer-visible
behaviour change is a fix: the **standalone `<ngui-auto-complete>` dropdown now floats over the content
below it** instead of pushing it down (matching the directive and the existing drop-up). The float layer
uses `z-index: var(--ngui-ac-z-index, 10)` — override the new `--ngui-ac-z-index` theming variable if it
collides with other stacked UI.

### Zoneless apps are fully supported

Angular 22 is zoneless by default. The library is built on signals and `OnPush` and never depended on
`zone.js`, so it works as-is whether your app uses `provideZonelessChangeDetection()` or keeps `zone.js`.
No action needed.

---

## v20 → v21

### Requires Angular 21

Update Angular to 21 first. Angular 20 and older projects must stay on `@ngui/auto-complete@20`.

### New `@angular/cdk` peer dependency + CDK overlay styles

The directive now positions its dropdown with the CDK Overlay, so install `@angular/cdk` and include the
CDK overlay styles **once** in your global stylesheet. If you already use Angular Material's theme, the
overlay styles are bundled and you only need the package.

```bash
npm install @angular/cdk
```

```scss
/* styles.scss — only if you are NOT importing an Angular Material theme */
@import '@angular/cdk/overlay-prebuilt.css';
```

Without these styles the dropdown still works but won't be positioned. In return, the dropdown now escapes
ancestor clipping/stacking (e.g. inside a `mat-form-field`) and flips on overflow on its own.

### `NguiAutoCompleteModule` was removed

Import the standalone component/directive directly.

```diff
- import { NguiAutoCompleteModule } from '@ngui/auto-complete';
- @NgModule({ imports: [NguiAutoCompleteModule] })
+ import { NguiAutoCompleteComponent, NguiAutoCompleteDirective } from '@ngui/auto-complete';
+ @Component({ imports: [NguiAutoCompleteComponent, NguiAutoCompleteDirective] })
```

Apps that still need the NgModule can stay on `@ngui/auto-complete@20`, which retained it.

### The directive is now a `ControlValueAccessor`

`NguiAutoCompleteDirective` integrates with Angular forms instead of exposing its own value input/outputs.
`[(ngModel)]`, `[formControl]` and `formControlName` now drive it through the standard forms machinery
(with proper `valueChanges`, `touched`/`dirty` state).

**Direct-input `[(ngModel)]` usage is unchanged:**

```html
<input ngui-auto-complete [(ngModel)]="myValue" [source]="myArray" />
```

**Wrapper-`<div>` usage:** move the value binding onto the host element (it used to sit on a separate inner
`<input>` with `(ngModelChange)` on the `<div>`):

```diff
- <div ngui-auto-complete [source]="myArray" (ngModelChange)="onSelect($event)">
-   <input [(ngModel)]="myValue" />
- </div>
+ <div ngui-auto-complete [source]="myArray" [(ngModel)]="myValue">
+   <input />
+ </div>
```

**Reactive forms** now work with the standard directives (same syntax, full integration):

```html
<input ngui-auto-complete [formControl]="cityControl" [source]="cities" />
<input ngui-auto-complete formControlName="city" [source]="cities" />
```

### Removed: `(valueChanged)` output

It duplicated `(ngModelChange)`. Use `(ngModelChange)` or, for reactive forms, the control's `valueChanges`.

```diff
- <input ngui-auto-complete [(ngModel)]="v" (valueChanged)="onChange($event)" [source]="s" />
+ <input ngui-auto-complete [(ngModel)]="v" (ngModelChange)="onChange($event)" [source]="s" />
```

### Outputs merged: `valueSelected` + `customSelected` → one `(valueSelected)`

The two selection outputs are now a single `(valueSelected)` carrying
`NguiAutoCompleteSelection { value, item, index, fromSource }`. `(customSelected)` and the never-emitted
`(textEntered)` are removed; `(noMatchFound)` is unchanged.

```diff
- <input ngui-auto-complete (valueSelected)="onPick($event)" (customSelected)="onCustom($event)" [source]="s" [(ngModel)]="v" />
+ <input ngui-auto-complete (valueSelected)="onSelect($event)" [source]="s" [(ngModel)]="v" />
```

```ts
onSelect(e: NguiAutoCompleteSelection) {
  if (e.fromSource) {
    // picked e.item from the list
  } else {
    // user typed a custom value: e.value
  }
}
```

The payload of `(valueSelected)` also changed from the bare value to that object, so a plain
`(valueSelected)="x = $event"` becomes `(valueSelected)="x = $event.value"` (or use `[(ngModel)]` / `[(value)]`).

### Display formatting: `display-property-name` + `value-formatter` → `display-with`

The selected-value display is now controlled by one input, `display-with`, which takes either a property
name or a function. (`list-formatter` still formats the dropdown rows.)

```diff
- <input ngui-auto-complete display-property-name="name" [source]="s" [(ngModel)]="v" />
+ <input ngui-auto-complete display-with="name" [source]="s" [(ngModel)]="v" />
```

```diff
- <input ngui-auto-complete value-formatter="(key) name" [source]="s" [(ngModel)]="v" />
+ <input ngui-auto-complete [display-with]="formatKeyName" [source]="s" [(ngModel)]="v" />
  // component: formatKeyName = (item) => `(${item.key}) ${item.name}`;
```

### Removed: `is-rtl` input — RTL is auto-detected

Direction now follows the input's computed direction, so put `dir="rtl"` on the element or any ancestor
(or set the document direction) and the dropdown anchors correctly on its own.

```diff
- <input ngui-auto-complete [is-rtl]="true" [source]="s" [(ngModel)]="v" />
+ <div dir="rtl">
+   <input ngui-auto-complete [source]="s" [(ngModel)]="v" />
+ </div>
```

### String templates → `TemplateRef`s: `loading-template` & `header-item-template`

The `innerHTML` string inputs are replaced by `ng-template`s: use the existing `headerTemplate` and the
new `loadingTemplate`. (`loading-text` still covers the plain-text loading case.)

```diff
- <input ngui-auto-complete loading-template="<i>Loading…</i>" header-item-template="<b>Results</b>" [source]="s" [(ngModel)]="v" />
+ <input ngui-auto-complete [loadingTemplate]="loadingTpl" [headerTemplate]="headerTpl" [source]="s" [(ngModel)]="v" />
+ <ng-template #loadingTpl><i>Loading…</i></ng-template>
+ <ng-template #headerTpl><b>Results</b></ng-template>
```

### New: `[(value)]` on `NguiAutoCompleteComponent` (optional)

The standalone component gained a two-way `value` model. `(valueSelected)` still fires, so this is opt-in:

```html
<ngui-auto-complete [source]="myArray" [show-input-tag]="false" [(value)]="myValue"></ngui-auto-complete>
```

### `source` is now required

`source` is declared with `input.required` on both the directive and component. It was always required in
practice, but omitting it used to fail silently; now it is a compile-time error (strict templates) or a
runtime error. The fix is simply to provide `[source]` everywhere — no change is needed if you already do.

```diff
- <input ngui-auto-complete [(ngModel)]="v" />
+ <input ngui-auto-complete [(ngModel)]="v" [source]="mySource" />
```

### Note: signal-based inputs (only affects programmatic access)

All inputs are now signal `input()`s. Template bindings and their names/aliases are unchanged. Only code
that reads an input off a component/directive **instance** is affected — call it as a signal:

```diff
- const n = autoCompleteRef.minChars;
+ const n = autoCompleteRef.minChars();
```
