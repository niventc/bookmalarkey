import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { BookmarkStore, BookmarkTreeNode } from "./bookmarks/bookmark.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public bookmarks: Observable<BookmarkTreeNode[]>;

  constructor(
    private _bookmarkStore: BookmarkStore
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

}
