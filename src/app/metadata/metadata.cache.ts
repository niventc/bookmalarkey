import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { Metadata } from "./metadata.provider";

@Injectable()
export class MetadataCache {

    constructor() {
    }

    public get(url: string, subject: Subject<Metadata>) {
        subject.next(this.fetchFromCache(url));
    }

    private fetchFromCache(url: string): Metadata {
        let value = localStorage.getItem(`metadata.${url}`);
        return value && JSON.parse(value);
    }

    public set(url: string, metadata: Metadata): void {
        localStorage.setItem(`metadata.${url}`, JSON.stringify(metadata));
    }
}
