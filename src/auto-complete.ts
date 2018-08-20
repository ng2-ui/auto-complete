import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoCompleteFilter } from './auto-complete.filter';

/**
 * provides auto-complete related utility functions
 */
@Injectable()
export class NguiAutoComplete {

    public source: string;
    public pathToData: string;
    public listFormatter: (arg: any) => string;

    constructor(@Optional() private http: HttpClient) {
        // ...
    }

    public filter(list: any[], keyword: string, matchFormatted: boolean, accentInsensitive: boolean, filters: AutoCompleteFilter[]) {
        return list.filter(
            (el) => {
                const objStr = matchFormatted ? this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();

                let filtered = true;
                if (filters) {
                    for (const filter of filters) {
                        if (filter.enabled) {
                            filtered = filtered
                                && (filter.filterBy instanceof Function)
                                && filter.filterBy(el);
                        }
                    }
                }

                if (accentInsensitive) {
                    return objStr.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .indexOf(keyword.normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')) !== -1 && filtered;
                } else {
                    return objStr.indexOf(keyword) !== -1 && filtered;
                }
            }
        );
    }

    public getFormattedListItem(data: any) {
        let formatted;
        const formatter = this.listFormatter || '(id) value';
        if (typeof formatter === 'function') {
            formatted = formatter.apply(this, [data]);
        } else if (typeof data !== 'object') {
            formatted = data;
        } else if (typeof formatter === 'string') {
            formatted = formatter;
            const matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
            if (matches && typeof data !== 'string') {
                matches.forEach((key) => {
                    formatted = formatted.replace(key, data[key]);
                });
            }
        }
        return formatted;
    }

    /**
     * return remote data from the given source and options, and data path
     */
    public getRemoteData(keyword: string): Observable<any[]> {
        if (typeof this.source !== 'string') {
            throw new TypeError('Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword');
        } else if (!this.http) {
            throw new Error('Http is required.');
        }

        const matches = this.source.match(/:[a-zA-Z_]+/);
        if (matches === null) {
            throw new Error('Replacement word is missing.');
        }

        const replacementWord = matches[0];
        const url = this.source.replace(replacementWord, keyword);

        return this.http.get<any[]>(url)
            .pipe(
                map((list) => {

                    if (this.pathToData) {
                        const paths = this.pathToData.split('.');
                        paths.forEach((prop) => list = list[prop]);
                    }

                    return list;
                })
            );
    }
}
