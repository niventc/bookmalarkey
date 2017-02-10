import { Component, Input } from "@angular/core";

import { BookmarkTreeNode } from "./bookmark.store";
import { MetadataProvider, Metadata } from "../metadata.provider";

import * as moment from "moment";

@Component({
    selector: "bookmark",
    templateUrl: "./bookmark.html"
})
export class BookmarkComponent {

  @Input() public bookmark: BookmarkTreeNode;

  public metadata: Metadata;

  constructor(
      private _metadataProvider: MetadataProvider
  ) {

  }

  public getMetadata(): void{
    this._metadataProvider.getMetadata(this.bookmark.url)
      .subscribe(x => {
        this.metadata = x;
      });
  }

  public isImage(bookmark: BookmarkTreeNode): boolean {
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