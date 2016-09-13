import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class AppSvc {

    marvelBase: string = "http://gateway.marvel.com:80/v1/public/";
    marvelPublicKey: string = "5c579505fa7a2edf1012092308ad2d27";

    constructor(private _http: Http) {
        console.info("AppSvc created");
    }

    /**
     * Find heroe by name
     * 
     * @param {string} startsWith, the starting characters of the heroe name
     * 
     * @memberOf AppSvc
     */
    findHeroes = (startsWith: string): Observable<any[]> => {
        return this._http.get(`${this.marvelBase}characters?nameStartsWith=${startsWith}&apikey=${this.marvelPublicKey}`)
        .map(h => h.json())
        .catch(e => console.error(e));
    } 
}