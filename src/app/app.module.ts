import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { BookmarkStore } from "./bookmarks/bookmark.store";
import { BookmarkComponent } from "./bookmarks/bookmark.component";

import { MetadataProvider } from "./metadata/metadata.provider";
import { MetadataStatusComponent } from "./metadata/metadata-status.component";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    MetadataStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    BookmarkStore,
    MetadataProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
