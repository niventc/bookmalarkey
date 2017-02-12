import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

import * as _ from "lodash";

@Injectable()
export class BookmarkStore {

    public bookmarks: Observable<chrome.bookmarks.BookmarkTreeNode[]>;

    constructor(
        private _zone: NgZone
    ) {
        this.bookmarks = Observable
            .timer(0, 120 * 1000)
            .flatMap((v, i) => {
                let obs = Observable.bindCallback(this.getBookmarks);
                return obs();
            })
            .map(bk => {
                let flattened = this.flatten(bk[0]);
                return flattened.filter(x => x.url.indexOf("chrome://") < 0);
            })
            .publishBehavior([])
            .refCount();

        this.getBookmarks = this.getBookmarks.bind(this);
    }

    private flatten(tree: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] {
        // No children just return self
        if(!tree.children || tree.children.length === 0) {
            return [tree];
        }        
        return _(tree.children).flatMap(x => this.flatten(x)).value();
    }

    private getBookmarks(cb: (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.getTree((x) => {
            this._zone.run(() => {                
                cb(x);
            });
        })
    }
}

