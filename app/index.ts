import { BookmarkStore } from "./bookmark.store.ts";

function component() {
    var element = document.createElement("div");

    element.innerHTML = "hi";

    var bookmarkStore = new BookmarkStore();

    bookmarkStore.bookmarks.forEach(bookmark => {
        var bookmarkElement = document.createElement("div");

        bookmarkElement.innerHTML = bookmark.title;

        element.appendChild(bookmarkElement);
    })

    return element;
}

document.body.appendChild(component());
