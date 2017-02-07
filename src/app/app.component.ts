import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BookmarkStore, BookmarkTreeNode } from "./bookmarks/bookmark.store";
import { MetadataProvider } from "./metadata.provider";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public bookmarks: Observable<BookmarkTreeNode[]>;

  constructor(
    private _bookmarkStore: BookmarkStore,
    private _metadataProvider: MetadataProvider
  ) {

  }

  public ngOnInit(): void {
    this.bookmarks = this._bookmarkStore.bookmarks;
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
