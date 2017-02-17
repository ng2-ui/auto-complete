# ng2-auto-complete

[![Build Status](https://travis-ci.org/ng2-ui/ng2-auto-complete.svg?branch=master)](https://travis-ci.org/ng2-ui/ng2-auto-complete)
[![Join the chat at https://gitter.im/ng2-ui/ng2-auto-complete](https://badges.gitter.im/ng2-ui/ng2-auto-complete.svg)](https://gitter.im/ng2-ui/ng2-auto-complete?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Angular2 Auto Complete


<a href="https://rawgit.com/ng2-ui/ng2-auto-complete/master/app/index.html">
  <img src="http://i.imgur.com/dAmheg0.png" />
</a>

Below are plunks for different scenarios:

**`Template Driven Forms`**

_ngModel_ http://plnkr.co/edit/3pB1Gx?p=preview
  
**`Reactive Forms`**

 _FormGroup_  http://plnkr.co/edit/2XRrck2cWVWcvbJnj6z5?p=preview
  [issue #49](https://github.com/ng2-ui/ng2-auto-complete/issues/49)

_FormControl_ http://plnkr.co/edit/WfgdcHLc8KDvsI2G2tHw?p=preview
  [issue #100](https://github.com/ng2-ui/ng2-auto-complete/issues/100)


**`Material Design`**

   http://plnkr.co/edit/2YLDjX?p=preview&open=app/app.component.ts

**`Obervable Source`**

  http://plnkr.co/edit/0C7vGDnhCKuMC5k2m2lR?p=preview&open=app%2Fapp.component.ts

**`List Formatter Example`**

  http://plnkr.co/edit/T5K1faYzb0LeSD9IttxE&open=app/app.component.ts
  http://plnkr.co/edit/0QFYFHMmCAFmhbYAGQl7?p=preview (With custom css)

## Install

1. install ng2-auto-complete

        $ npm install ng2-auto-complete --save

2. add `map` and `packages` to your `systemjs.config.js` unless you are using `webpack`

        map['ng2-auto-complete'] = 'node_modules/ng2-auto-complete/dist';
        packages['ng2-auto-complete'] = { main: 'ng2-auto-complete.umd.js', defaultExtension: 'js' }
        
3. import Ng2AutoCompleteModule to your AppModule

        import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
        
        @NgModule({
          imports: [BrowserModule, FormsModule, Ng2AutoCompleteModule],
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

As a contributor, it's NOT required to be skilled in Javascript nor Angular2. 
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
  * **`list-formatter`**, function variable name, custom list formatting function. e.g. 'myListFormatter', not 'myListFormatter()'. 
  
           myListFormatter(data: any): string {
              let html: string = "";
              html += data[this.valuePropertyName] ? `<b>(${data[this.valuePropertyName]})</b>` : "";
              html += data[this.displayPropertyName] ? `<span>${data[this.displayPropertyName]}</span>` : data;
              return html;
            }
  
  * **`path-to-data`**, string, e.g., `data.myList`, path to array data in http response
  * **`min-chars, number`**, when source is remote data, the number of character to see dropdown list
  * **`display-property-name`**, string, key name of text to show. default is `value`
  * **`select-value-of`**, string, when selected, return the value of this key as a selected item
  * **`blank-option-text`**, string, guide text to allow empty value to be selected as in empty value of `option` tag.
  * **`no-match-found-text`**, string, guide text to show no result found.
  * **`valueChanged`** / **`ngModelChange`**, callback function that is executed when a new dropdown is selected.
     e.g. `(valueChanged)="myCallback($event)"`
  * **`loading-text`**, text to be displayed when loading. Default, "Loading"
  * <del>**`accept-user-input`** boolean, if `false` and does not match to source given, it goes back to the original value selected.</del>, please use `readonly="readonly"` to force user to select only from list.
  * **`max-num-list`** number, maximun number of drop down list items. Default, unlimited
  
## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-auto-complete.git
    $ cd ng2-auto-complete
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
