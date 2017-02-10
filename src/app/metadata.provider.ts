import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import * as _ from "lodash";

export interface chrome {
    webRequest: WebRequestService;
}

export interface WebRequestService {
    onHeadersReceived: OnHeadersReceivedEvent;
}

export interface OnHeadersReceivedEvent {
    addListener(callback: (details: HeadersReceivedEvent) => void): void;
}

export interface HeadersReceivedEvent {
    requestId: string;
    url: string;
    method: string;
    frameId: number;
    parentFrameId: number;
    tabId: number;
    type: string; // ResourceType enum
    timeStamp: number;
    statusLine: string;
    responseHeaders: any[]; // HttpHeaders
    statusCode: number;

}

var chrome: chrome = (<any>window).chrome;

export interface Metadata {
    keywords: string[];
    imageUrls: string[];
}

@Injectable()
export class MetadataProvider {

    private corsHeader: any = {
        "name": "Access-Control-Allow-Origin",
        "value": "*"
    };

    constructor(
        private _http: Http
    ) {
        
    }

    public getMetadata(url: string): Observable<Metadata> {
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
                        });
    }

    private getImageUrls(elements: NodeListOf<HTMLMetaElement>): string[] {
        const metaTagNames: string[] = [
            "og:image",
            "twitter:image:src"
        ];
        let imageUrls: string[] = [];
        for(let i = 0; i < elements.length; i++) {
            let element = elements[i];

            let key = this.getMetaKey(element);
            if(key && _(metaTagNames).includes(key)) {
                let content = element.attributes.getNamedItem("content");
                if(content) {
                    imageUrls.push(content.value);
                }
            }
        }
        return imageUrls;
    }

    private getMetaKey(element: HTMLMetaElement): string {        
        let name = element.attributes.getNamedItem("name");
        if(name) {
            return name.value;
        }

        let property = element.attributes.getNamedItem("property");
        if(property) {
            return property.value;
        }

        return null;
    }

    private getKeywords(elements: NodeListOf<HTMLMetaElement>): string[] {
        let keywords: string[] = [];        
        for(let i = 0; i < elements.length; i++) {
            let element = elements[i];

            let key = this.getMetaKey(element);
            if(key && key === "keywords") {
                let content = element.attributes.getNamedItem("content");
                if(content) {
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