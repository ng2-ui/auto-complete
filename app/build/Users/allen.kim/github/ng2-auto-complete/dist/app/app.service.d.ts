import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
export declare class AppSvc {
    private _http;
    marvelBase: string;
    marvelPublicKey: string;
    constructor(_http: Http);
    /**
     * Find heroe by name
     *
     * @param {string} startsWith, the starting characters of the heroe name
     *
     * @memberOf AppSvc
     */
    findHeroes: (startsWith: string) => Observable<any[]>;
}
