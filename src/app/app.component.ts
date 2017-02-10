import { Component, OnInit } from '@angular/core';
import { NgModel } from "@angular/forms";
import { Observable, Subject } from "rxjs";

import * as moment from "moment";

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

  public doFilterRecent: boolean = false;
  public filterRecent: Subject<boolean>;
  public filteredRecentBookmarks: Observable<BookmarkTreeNode[]>;

  constructor(
    private _bookmarkStore: BookmarkStore,
    private _metadataProvider: MetadataProvider
  ) {
    
  }

  public ngOnInit(): void {
    this.bookmarks = this._bookmarkStore.bookmarks;
    this.searchTerm = new Subject<string>();
    this.filterRecent = new Subject<boolean>();

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
      });

      this.filteredRecentBookmarks = this.filterRecent
        .startWith(false)
        .combineLatest(this.filteredBookmarks)
        .map(x => {
          return x[1].filter(y => {
            if(x[0]) {
              let recent = moment().add(-2, "weeks");
              return moment(y.dateAdded).isAfter(recent);
            }
            return true;
          })
        })
      .publish()
      .refCount();
  }

}
