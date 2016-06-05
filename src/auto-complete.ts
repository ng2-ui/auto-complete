import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';

/**
 * provides auto-complete related utility functions
 */
@Injectable()
export class AutoComplete {

  public source: string;
  public pathToData: string;

  constructor(private http: Http) {
    // ...
  }

  filter(list: any[], keyword: string) {
    return list.filter(
      el => {
        return !!JSON.stringify(el).match(new RegExp(keyword, 'i'));
      }
    );
  }

  /**
   * return remote data from the given source and options, and data path
   */
  getRemoteData(options: any): Observable<Response> {
  
    let keyValues: any[] = [];
    let url = "";
    for (var key in options) { // replace all keyword to value
      let regexp: RegExp = new RegExp(':'+key, 'g');
      url = this.source;
      if (url.match(regexp)) {
        url = url.replace(regexp, options[key]);
      } else {
        keyValues.push(key + "=" + options[key]);
      }
    }
    
    if (keyValues.length) {
      var qs = keyValues.join("&");
      url += url.match(/\?[a-z]/i) ? qs : ('?' + qs);
    }
    
    return this.http.get(url)
      .map( resp => resp.json())
      .map( resp => {
        var list = resp.data  || resp;
        if (this.pathToData) {
          var paths = this.pathToData.split('.');
          paths.forEach(function(el) {
            list = list[el];
          });
        }
        return list;
      });
  };
}

