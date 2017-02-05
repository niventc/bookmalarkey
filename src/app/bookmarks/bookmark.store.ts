import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

export interface chrome {

    bookmarks: BookmarkService;

}

interface BookmarkService {

    get(idOrIdList: string | string[], callback: (results: BookmarkTreeNode[]) => void);

    getChildren(id: string, callback: (results: BookmarkTreeNode[]) => void);

    getRecent(numberOfItem: number, callback: (results: BookmarkTreeNode[]) => void);

    getTree(callback: (results: BookmarkTreeNode[]) => void);

    getSubTree(id: string, callback: (results: BookmarkTreeNode[]) => void);

    search(query: string | any, callback: (results: BookmarkTreeNode[]) => void);

    create(bookmark: any, callback: (results: BookmarkTreeNode) => void);

    move(id: string, destination: any, callback: (results: BookmarkTreeNode) => void);

    update(id: string, changes: any, callback: (results: BookmarkTreeNode) => void);

    remove(id: string, callback: () => void);

    removeTree(id: string, callback: () => void);
}

export interface BookmarkTreeNode {
    id: string;
    parentId?: string;
    index?: number;
    url?: string;
    title: string;
    dateAdded?: number;
    dateGroupModified?: number;
    unmodifiable: boolean; // BookmarkTreeNodeUnmodifiable
    children?: BookmarkTreeNode[];
}

var chrome: chrome = (<any>window).chrome;

@Injectable()
export class BookmarkStore {

    public bookmarks: Observable<BookmarkTreeNode[]>;

    constructor(
        private _zone: NgZone
    ) {
        this.bookmarks = Observable
            .timer(0, 120 * 1000)
            .flatMap((v, i) => {
                let obs = Observable.bindCallback(this.getBookmarks);
                return obs();
            })
            .publishBehavior([])
            .refCount();

        this.getBookmarks = this.getBookmarks.bind(this);
    }

    private getBookmarks(cb: (bookmarks: BookmarkTreeNode[]) => void): void {
        chrome.bookmarks.getTree((x) => {
            this._zone.run(() => {                
                cb(x);
            });
        })
    }
}

