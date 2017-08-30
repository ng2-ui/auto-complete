import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class AppSvc {

  marvelBase: string = "http://gateway.marvel.com:80/v1/public/";
  marvelPublicKey: string = "b9ced31de3874eb2c065a5bce26f8c59";

  constructor(private _http: HttpClient) { }

  /**
   * Find heroe by name
   *
   * @param {string} startsWith, the starting characters of the heroe name
   *
   * @memberOf AppSvc
   */
  findHeroes = (startsWith: string): Observable<any[]> => {
    return this._http.get<any[]>(`${this.marvelBase}characters?nameStartsWith=${startsWith}&apikey=${this.marvelPublicKey}`);
  }
}