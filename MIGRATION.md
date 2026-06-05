# Migration Guide

Upgrade notes for breaking changes between major versions of `@ngui/auto-complete`. The major version
tracks the supported Angular major (`@ngui/auto-complete@N` ⇒ Angular `N`).

---

## v20 → v21

### Requires Angular 21

Update Angular to 21 first. Angular 20 and older projects must stay on `@ngui/auto-complete@20`.

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

`(customSelected)` (custom, not-in-list value) and `(noMatchFound)` are unchanged.

### Removed: `(textEntered)` output on `NguiAutoCompleteComponent`

It was never emitted, so it had no effect. Use `(valueSelected)` / `[(value)]` (see below) and
`(customSelected)`.

### New: `[(value)]` on `NguiAutoCompleteComponent` (optional)

The standalone component gained a two-way `value` model. `(valueSelected)` still fires, so this is opt-in:

```html
<ngui-auto-complete [source]="myArray" [show-input-tag]="false" [(value)]="myValue"></ngui-auto-complete>
```

### Note: signal-based inputs (only affects programmatic access)

All inputs are now signal `input()`s. Template bindings and their names/aliases are unchanged. Only code
that reads an input off a component/directive **instance** is affected — call it as a signal:

```diff
- const n = autoCompleteRef.minChars;
+ const n = autoCompleteRef.minChars();
```
