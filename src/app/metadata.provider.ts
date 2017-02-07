import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class MetadataProvider {

    constructor(
        private _http: Http
    ) {
    }

    public getMetadata(url: string): Observable<string[]> {
        return this._http.get(url)
                        .map(x => {
                            console.log(x);
                            return [];
                        });
    }
}