import { Component, OnInit } from '@angular/core';
import { NgModel } from "@angular/forms";
import { Observable, Subject } from "rxjs";

import { BookmarkStore, BookmarkTreeNode } from "./bookmarks/bookmark.store";
import { MetadataProvider } from "./metadata.provider";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public bookmarks: Observable<BookmarkTreeNode[]>;

  public searchTerm: Subject<string>;

  public filteredBookmarks: Observable<BookmarkTreeNode[]>;

  constructor(
    private _bookmarkStore: BookmarkStore,
    private _metadataProvider: MetadataProvider
  ) {
    
  }

  public ngOnInit(): void {
    this.bookmarks = this._bookmarkStore.bookmarks;
    this.searchTerm = new Subject<string>();

    this.filteredBookmarks = this.searchTerm
      .startWith("")
      .debounceTime(300)
      .distinctUntilChanged()
      .combineLatest(this.bookmarks)
      .map(x => {
        if(x[0] === "") {
          return x[1];
        }

        return x[1].filter(y => y.title.toLowerCase().indexOf(x[0].toLowerCase()) > -1);
      })
      .publish()
      .refCount();
  }

  public isImage(bookmark: BookmarkTreeNode): boolean {
    return bookmark.url.endsWith(".png") ||
           bookmark.url.endsWith(".gif") ||
           bookmark.url.endsWith(".jpg") ||
           bookmark.url.endsWith(".jpeg");
  }

  public getMetadata(bookmark: BookmarkTreeNode): void{
    this._metadataProvider.getMetadata(bookmark.url)
      .subscribe(x => {

      });
  }

}
