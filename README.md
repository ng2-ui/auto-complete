# auto-complete

[![Build Status](https://travis-ci.org/ng2-ui/auto-complete.svg?branch=master)](https://travis-ci.org/ng2-ui/auto-complete)
[![Join the chat at https://gitter.im/ng2-ui/auto-complete](https://badges.gitter.im/ng2-ui/auto-complete.svg)](https://gitter.im/ng2-ui/auto-complete?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## IMPORTANT NOTICE

After 0.13.0 or higher, ng2-auto-complete has been changed to @ngui/auto-complete. Here are the changes;

  * Module `ng2-auto-complete` is moved to `@ngui/auto-complete`.
  * Directive `ng2-auto-complete` is moved to `ngui-auto-complete`.
  * Class name `Ng2AutoComplete` is moved to `NguiAutoComplete`.

<a href="https://rawgit.com/ng2-ui/auto-complete/master/app/index.html">
  <img src="http://i.imgur.com/dAmheg0.png" />
</a>

Below are plunks for different scenarios:

**`Template Driven Forms`**

_ngModel_ http://plnkr.co/edit/3pB1Gx?p=preview
  
**`Reactive Forms`**

 _FormGroup_  http://plnkr.co/edit/2osUq6?p=preview
  [issue #49](https://github.com/ng2-ui/auto-complete/issues/49)

_FormControl_ http://plnkr.co/edit/A5CW2e?p=preview
  [issue #100](https://github.com/ng2-ui/auto-complete/issues/100)


**`Material Design`**

   http://plnkr.co/edit/2YLDjX?p=preview&open=app/app.component.ts

**`Obervable Source`**

  http://plnkr.co/edit/ExzNSh?p=preview

**`List Formatter Example`**

  http://plnkr.co/edit/F9nrWp?p=preview  
  http://plnkr.co/edit/0QFYFHMmCAFmhbYAGQl7?p=preview (With custom css)

## Install

1. install @ngui/auto-complete

        $ npm install @ngui/auto-complete --save

2. add `map` and `packages` to your `systemjs.config.js` unless you are using `webpack`

        map['@ngui/auto-complete'] = 'node_modules/@ngui/auto-complete/dist/auto-complete.umd.js';
        
3. import NguiAutoCompleteModule to your AppModule

        import { NguiAutoCompleteModule } from '@ngui/auto-complete';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, NguiAutoCompleteModule],
          declarations: [AppComponent],
          providers: [HTTP_PROVIDERS],
          bootstrap: [ AppComponent ]
        })
        export class AppModule { }

## Usage it in your code

        <input auto-complete [(ngModel)]="myData" [source]="mySource" />
        
For full example, please check `test` directory to see the example of;

  - `systemjs.config.js`
  - `app.module.ts`
  -  and `app.component.ts`.


## Contributors are welcomed

This module is only improved and maintained by contributors like you;

As a contributor, it's NOT required to be skilled in Javascript nor Angular. 
You can contribute to the following;

  * Updating README.md
  * Making more and clearer comments
  * Answering issues and building FAQ
  * Documentation
  * Translation

In result of your active contribution, you will be listed as a core contributor
on https://ng2-ui.github.io, and a member of ng2-ui too.

If you are interested in becoming a contributor and/or a member of ng-ui,
please send me email to `allenhwkim AT gmail.com` with your github id. 

## attributes
  All options are optional except ngModel and source

  * **`ngModel`**, any, variable that autocomplete result is assigned to
  * **`source`**, array or string, required. data source for dropdown list
  * **`auto-complete-placeholder`**,  string, autocomplete input guide text
  * **`value-formatter`**, string or function variable name, custom value formatting function. e.g. '(id) value', 'myValueFormatter'. 
  
           myValueFormatter(data: any): string {
              return `(${data[id]}) ${data[value]}`;
            }
  * **`list-formatter`**, string or function variable name, custom list formatting function. e.g.  '(key) name', 'myListFormatter'. 
  
           myListFormatter(data: any): string {
              return `(${data[key]}) ${data[name]}`;
            }
  
  * **`path-to-data`**, string, e.g., `data.myList`, path to array data in http response
  * **`min-chars, number`**, when source is remote data, the number of character to see drop-down list
  * **`display-property-name`**, string, key name of text to show. default is `value`
  * **`select-value-of`**, string, when selected, return the value of this key as a selected item
  * **`blank-option-text`**, string, guide text to allow empty value to be selected as in empty value of `option` tag.
  * **`no-match-found-text`**, string, guide text to show no result found.
  * **`valueChanged`** / **`ngModelChange`**, callback function that is executed when a new drop-down is selected.
     e.g. `(valueChanged)="myCallback($event)"`  
  * **`customSelected`** callback function that is executed when a value selected not included in drop-down, so it will return the keyword used.
     e.g. `(customSelected)="customCallback($event)"`
  * **`loading-text`**, text to be displayed when loading. Default, "Loading"
  * **`loading-template`**, html markup that is to be rendered when loading. Default, null
  * **`accept-user-input`** boolean, if `false` and does not match to source given, it goes back to the original value selected., If you don't event want user to type any, please use `readonly="readonly"` to force user to select only from list. Default is `true`
  * **`max-num-list`** number, maximum number of drop down list items. Default, unlimited
  * **`tab-to-select`** boolean, if `true`, pressing <kbd>Tab</kbd> will set the value from the selected item before focus leaves the control. Default is `true`
  * **`select-on-blur`** boolean, if `true`, `blur` event will set the value from the selected item before focus leaves the control. Default is `false`
  * **`match-formatted`** boolean, if `true`, keyword will be matched against list values formatted with `list-formatter`, instead of raw objects. Default is `false`
  * **`auto-select-first-item`**, boolean, if `true`, the first item of the list is automatically selected, if `false`, user must select manually an item. Default is `false`
  
## For Developers

### To start

    $ git clone https://github.com/ng2-ui/auto-complete.git
    $ cd auto-complete
    $ npm install
    $ npm start
 
### List of available npm tasks

  * `npm run` : List all available tasks
  * `npm start`: Run `app` directory for development using `webpack-dev-server` with port 9001
  * `npm run clean`: Remove dist folder
  * `npm run lint`: Lint TypeScript code
  * `npm run build:ngc`: build ES module
  * `npm run build:umd`: Build UMD module `ng2-map.umd.js`
  * `npm run build:app`: Build `app/build/app.js` for runnable examples
  * `npm run build`: Build all(clean, build:ngc, build:umc, and build:app)
