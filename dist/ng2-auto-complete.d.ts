import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/Rx";
/**
 * provides auto-complete related utility functions
 */
export declare class Ng2AutoComplete {
    private http;
    source: string;
    pathToData: string;
    constructor(http: Http);
    filter(list: any[], keyword: string): any[];
    /**
     * return remote data from the given source and options, and data path
     *
     * @param {*} options is an object containing the query paramters for the GET call
     * @returns {Observable<Response>}
     *
     * @memberOf AutoComplete
     */
    getRemoteData(options: any): Observable<Response>;
}
