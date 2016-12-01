import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/Rx";

/**
 * provides auto-complete related utility functions
 */
@Injectable()
export class Ng2AutoComplete {

  public source: string;
  public pathToData: string;

  constructor(private http: Http) {
    // ...
  }

  filter(list: any[], keyword: string) {
    return list.filter(
      el => {
        return !!JSON.stringify(el).match(new RegExp(keyword, "i"));
      }
    );
  }

  /**
   * return remote data from the given source and options, and data path
   */
  getRemoteData(keyword: string): Observable<Response> {
    if (typeof this.source !== 'string') {
      throw "Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword";
    }

    let matches = this.source.match(/:[a-zA-Z_]+/);
    let replacementWord = matches[0];
    let url = this.source.replace(replacementWord, keyword);

    return this.http.get(url)
      .map(resp => resp.json())
      .map(resp => {
        var list = resp.data || resp;

        if (this.pathToData) {
          var paths = this.pathToData.split(".");
          paths.forEach(prop => list = list[prop]);
        }

        return list;
      });
  };
}

