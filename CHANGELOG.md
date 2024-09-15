## [13.0.0] Major Update

- Upgraded to support Angular 13
- Possible fix for issues in `accept-user-input` #372
- Possible fix for getFormattedListItem(...).toLowerCase is not a function #375
- Versioning now match the latest supported Angular version
- TSLint to ESLint migration
- ES version now is ES2020
- Demo fix for observable (still not perfect)

## [4.0.0] Major Update

- Upgraded to support Angular 12

## [3.0.0] Major Update

- Upgraded to support Angular 9 and migrate boilerplate to `@angular/cli`

## [2.0.0] Major Update

- Upgraded to Angular 6 and RxJS 6
- Added new property `ignore-accents`, default is `true`

### [1.0.2]

- Fix build and publish issues.

###### [1.0.1] - _BROKEN!_

- Fix bug of directive when select an item causes "cannot read property 'renderValue' of undefined"

## [1.0.0] Major Update

- This version publish latest changes from PRs and support Angular 5 and may have some breaking changes.

### [0.14.2]

- return keyword if no items were selected

### [0.14.1]

- add a new property `select-on-blur`

### [0.14.0]

- Upgraded to Angular 4

### [0.13.4]

- now the first item on the suggestion dropdown will not be auto-selected until we press the arrow down key

### [0.13.0]

- renamed module to @ngui/auto-complete

### [0.12.0]

- added a new property `match-formatted`

### [0.11.0]

- added a new property `value-formatter`

### [0.10.10]

- fixed `accept-user-input`, fixed tests

### [0.10.9]

- bug fix on list formatter not applying and dropdown positioning
- fixed (undefined) display when source is list of number or boolean

### [0.10.8]

- fixed (undefined) display when source is list of number or boolean

### [0.10.7]

- introduced `select-valule-of`
- removed `value-property-name`
- list-formatter now accepts string e.g. `(id) value`

### [0.10.6]

- testing with initial focus

### [0.10.5]

- more checking before set value
