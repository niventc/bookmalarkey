
export = chrome;
export as namespace chrome;

declare var chrome: chrome.ChromeService;

declare namespace chrome {

    interface ChromeService {
        bookmarks: bookmarks.BookmarkService;        
        webRequest: webRequests.WebRequestService;
    }
    
    namespace bookmarks {
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

        interface BookmarkTreeNode {
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
    }

    namespace webRequests {
        interface WebRequestService {
            onHeadersReceived: OnHeadersReceivedEvent;
        }

        interface OnHeadersReceivedEvent {
            addListener(callback: (details: HeadersReceivedEvent) => void): void;
        }

        interface HeadersReceivedEvent {
            requestId: string;
            url: string;
            method: string;
            frameId: number;
            parentFrameId: number;
            tabId: number;
            type: string; // ResourceType enum
            timeStamp: number;
            statusLine: string;
            responseHeaders: any[]; // HttpHeaders
            statusCode: number;

        }
    }

}


