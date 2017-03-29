import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
/**
 * provides auto-complete related utility functions
 */
export declare class NguiAutoComplete {
    private http;
    source: string;
    pathToData: string;
    listFormatter: (arg: any) => string;
    constructor(http: Http);
    filter(list: any[], keyword: string, matchFormatted: boolean): any[];
    getFormattedListItem(data: any): any;
    /**
     * return remote data from the given source and options, and data path
     */
    getRemoteData(keyword: string): Observable<Response>;
}
