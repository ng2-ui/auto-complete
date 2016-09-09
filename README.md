# ng2-auto-complete
Angular2 Auto Complete

<a href="https://ng2-ui.github.io/#/auto-complete">
  <img src="http://i.imgur.com/dAmheg0.png" />
</a>

Plunker Example: https://plnkr.co/edit/1N4onb


## Install

1. install ng2-auto-complete

        $ npm install ng2-auto-complete --save

2. add `map` and `packages` to your `systemjs.config.js`

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
  * **`placeholder`**,  string, input guide text
  * **`list-formatter`**, function variable name, custom list formatting function.e.g. 'myListFormatter', not 'myListFormatter()'
  * **`path-to-data`**, string, e.g., `data.myList`, path to array data in http response
  * **`min-chars, number`**, when source is remote data, the number of character to see dropdown list
  * **`value-property-name`**, string, key name of value. default is `id`
  * **`display-property-name`**, string, key name of text to show. default is `value`

  * **`value-changed`**, callback function that is executed when a new dropdown is selected.
     e.g. `(value-changed)="myCallback($event)"`
     
## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-map.git
    $ cd ng2-popup
    $ npm install
    $ npm start
    $ npm run build # to build `dist` directory

