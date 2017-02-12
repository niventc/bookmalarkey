import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs"; 

import { MetadataProvider } from "./metadata.provider";

@Component({
    selector: "metadata-status",
    templateUrl: "./metadata-status.html"
})
export class MetadataStatusComponent implements OnInit {

    public outstandingRequestCount: Observable<number>;

    constructor(
        private _metadataProvider: MetadataProvider
    ) {

    }

    public ngOnInit(): void {
        this.outstandingRequestCount = this._metadataProvider.queueLength;
    }

}