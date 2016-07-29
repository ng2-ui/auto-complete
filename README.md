# ng2-auto-complete
Angular2 Auto Complete

<a href="http://embed.plnkr.co/32syXF/">
  <img src="http://i.imgur.com/dAmheg0.png" />
</a>


## Install

1. install ng2-auto-complete

        $ npm install ng2-auto-complete --save

2. add `map` and `packages` to your `systemjs.config.js`

        map['auto-complete'] = 'node_modules/ng2-auto-complete';
        // map['auto-complete'] = 'https://npmcdn.com/ng2-auto-complete'; // without npm installation
        packages['auto-complete'] = { main: 'dist/index.js', defaultExtension: 'js' }

## Usage it in your code

1. import and add directive in your component

        import {AutoCompleteDirective} from "auto-complete";
        import {HTTP_PROVIDERS} from "@angular/http";
        ...
        @Component({
          directives: [AutoCompleteDirective],
          providers: [HTTP_PROVIDERS],
          ..
        });

2. You are ready. use it in your template

        <input auto-complete [(ngModel)]="myData" [source]="mySource" />
        
## attributes
  All options are optional except ngModel and source

  * **`ngModel`**, any, variable that autocomplete result is assigned to
  * **`source`**, array or string, required. data source for dropdown list
  * **`placeholder`**,  string, input guide text
  * **`list-formatter`**, function variable name, custom list formatting function.e.g. 'myListFormatter', not 'myListFormatter()'
  * **`value-changed`**, function variable name, callback function that is executed when dropdown is selected. e.g. `myCallback`, not `myCallback`
  * **`path-to-data`**, string, e.g., `data.myList`, path to array data in http response
  * **`min-chars, number`**, when source is remote data, the number of character to see dropdown list
  * **`value-property-name`**, string, key name of value. default is `id`
  * **`display-property-name`**, string, key name of text to show. default is `value`

## For Developers

### To start

    $ git clone https://github.com/ng2-ui/ng2-map.git
    $ cd ng2-popup
    $ npm install
    $ npm start


