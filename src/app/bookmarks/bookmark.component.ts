import { Component, Input, OnInit } from "@angular/core";

import { MetadataProvider, Metadata } from "../metadata/metadata.provider";

import * as moment from "moment";

@Component({
    selector: "bookmark",
    templateUrl: "./bookmark.html"
})
export class BookmarkComponent implements OnInit {

  @Input() public bookmark: chrome.bookmarks.BookmarkTreeNode;

  public metadata: Metadata;

  constructor(
      private _metadataProvider: MetadataProvider
  ) {

  }

  public ngOnInit(): void {
      this.getMetadata();
  }

  public getMetadata(): void{
    this._metadataProvider.getMetadata(this.bookmark.url)
      .subscribe(x => {
        this.metadata = x;
      });
  }

  public refreshMetadata(): void {
    this._metadataProvider.getMetadata(this.bookmark.url, true)
      .subscribe(x => {
        this.metadata = x;
      });      
  }

  public isImage(bookmark: chrome.bookmarks.BookmarkTreeNode): boolean {
    return this.bookmark.url.endsWith(".png") ||
           this.bookmark.url.endsWith(".gif") ||
           this.bookmark.url.endsWith(".jpg") ||
           this.bookmark.url.endsWith(".jpeg");
  }

  public getAdded(): string {
    return moment(this.bookmark.dateAdded).fromNow();
  }

  public hasMetadataImage(): boolean {
    return this.metadata && this.metadata.imageUrls.length > 0;
  }

  public getMetadataImage(): string {
      return this.metadata.imageUrls[0];
  }

}