import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AppSvc } from "./app.service";
export declare class AppComponent {
    appSvc: AppSvc;
    private _sanitizer;
    arrayOfNumbers: number[];
    arrayOfStrings: string[];
    arrayOfKeyValues: any[];
    arrayOfKeyValues2: any[];
    googleGeoCode: string;
    model1: string;
    model2: {
        id: number;
        value: string;
    };
    model3: {
        key: number;
        name: string;
    };
    constructor(appSvc: AppSvc, _sanitizer: DomSanitizer);
    myCallback(newVal: any): void;
    renderHero: (data: any) => SafeHtml;
    rightAligned: (data: any) => SafeHtml;
    json(obj: any): string;
}
