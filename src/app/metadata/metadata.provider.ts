import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable, Subject } from "rxjs";

import * as _ from "lodash";

export interface Metadata {
    keywords: string[];
    imageUrls: string[];
}

interface MetadataRequest {
    url: string;
    returnSubject: Subject<Metadata>;
}

@Injectable()
export class MetadataProvider {

    private _corsHeader: any = {
        "name": "Access-Control-Allow-Origin",
        "value": "*"
    };

    private _worker: Observable<number>;

    private _queue: MetadataRequest[] = [];
    private _cache: { [url: string]: Metadata } = {};

    public inflightRequestCount: number = 0;
    public queueLength: Subject<number>;

    constructor(
        private _http: Http
    ) {
        this.queueLength = new Subject<number>();

        // TODO this is poor, be ashamed
        // we should have multiple works pulling from a job queue
        // blocking queues in javascript?!
        this._worker = Observable.timer(0, 2 * 1000)
            .do(() => {
                let requests = _(this._queue).take(5).value();

                this._queue  = _(this._queue).without(...requests).value();

                return _(requests).forEach((x: MetadataRequest) => {
                    this.inflightRequestCount++;
                    this.getRemoteMetadata(x.url)
                        .subscribe(result => {                            
                            x.returnSubject.next(result);                            
                        }, () => {},
                        () => {
                            this.queueLength.next(this.inflightRequestCount-- + this._queue.length);
                        });
                });
            });

        this._worker.subscribe();
    }

    public getMetadata(url: string, skipCache?: boolean): Observable<Metadata> {
        if (this._cache[url] && !skipCache) {
            return Observable.of(this._cache[url]);
        }

        let subject = new Subject<Metadata>();

        this._queue.push({
            url: url,
            returnSubject: subject
        });

        return subject;
    }

    private getRemoteMetadata(url: string): Observable<Metadata> {        
        return this._http.get(url)
            .map(x => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(x.text(), "text/html");
                let metaElements = doc.getElementsByTagName("meta");

                let keywords = this.getKeywords(metaElements);
                let imageUrls = this.getImageUrls(metaElements);

                return <Metadata>{
                    keywords: keywords,
                    imageUrls: imageUrls
                };
            })
            .catch(error => {
                return Observable.of(<Metadata>{
                    keywords: [],
                    imageUrls: []
                });
            })
            .do(x => this._cache[url] = x);
    }

    private getImageUrls(elements: NodeListOf<HTMLMetaElement>): string[] {
        const metaTagNames: string[] = [
            "og:image",
            "twitter:image:src"
        ];
        let imageUrls: string[] = [];
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            let key = this.getMetaKey(element);
            if (key && _(metaTagNames).includes(key)) {
                let content = element.attributes.getNamedItem("content");
                if (content) {
                    imageUrls.push(content.value);
                }
            }
        }
        return imageUrls;
    }

    private getMetaKey(element: HTMLMetaElement): string {
        let name = element.attributes.getNamedItem("name");
        if (name) {
            return name.value;
        }

        let property = element.attributes.getNamedItem("property");
        if (property) {
            return property.value;
        }

        return null;
    }

    private getKeywords(elements: NodeListOf<HTMLMetaElement>): string[] {
        let keywords: string[] = [];
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            let key = this.getMetaKey(element);
            if (key && key === "keywords") {
                let content = element.attributes.getNamedItem("content");
                if (content) {
                    content.value.split(",")
                        .forEach(x => {
                            keywords.push(x.trim());
                        });
                }
            }
        }
        return keywords;
    }


}