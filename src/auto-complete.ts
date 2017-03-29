import { Injectable, Optional } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

/**
 * provides auto-complete related utility functions
 */
@Injectable()
export class NguiAutoComplete {

  public source: string;
  public pathToData: string;
  public listFormatter: (arg: any) => string;

  constructor(@Optional() private http: Http) {
    // ...
  }

  filter(list: any[], keyword: string, matchFormatted: boolean) {
    return list.filter(
      el => {
        let objStr = matchFormatted ? this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
        keyword = keyword.toLowerCase();
        //console.log(objStr, keyword, objStr.indexOf(keyword) !== -1);
        return objStr.indexOf(keyword) !== -1;
      }
    );
  }

  getFormattedListItem(data: any) {
    let formatted;
    let formatter = this.listFormatter || '(id) value';
    if (typeof formatter === 'function') {
      formatted = formatter.apply(this, [data]);
    } else if (typeof data !== 'object') {
      formatted = data;
    } else if (typeof formatter === 'string') {
      formatted = formatter;
      let matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
      if (matches && typeof data !== 'string') {
        matches.forEach(key => {
          formatted = formatted.replace(key, data[key]);
        });
      }
    }
    return formatted;
  }

  /**
   * return remote data from the given source and options, and data path
   */
  getRemoteData(keyword: string): Observable<Response> {
    if (typeof this.source !== 'string') {
      throw "Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword";
    } else if (!this.http) {
      throw "Http is required.";
    }

    let matches = this.source.match(/:[a-zA-Z_]+/);
    if (matches === null) {
      throw "Replacement word is missing.";
    }

    let replacementWord = matches[0];
    let url = this.source.replace(replacementWord, keyword);

    return this.http.get(url)
      .map(resp => resp.json())
      .map(resp => {
        let list = resp.data || resp;

        if (this.pathToData) {
          let paths = this.pathToData.split(".");
          paths.forEach(prop => list = list[prop]);
        }

        return list;
      });
  };
}

