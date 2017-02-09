# Book Malarkey

Make Chrome bookmarks great again!

## Building

1. Checkout this repo
2. `npm install`
3. `npm run build`
4. Open Chrome and goto `chrome://extensions`
5. Click `Load unpacked extension...`
6. Navigate to the `dist` folder inside of the checkout
7. Maybe `Developer mode` needs to be ticked?
8. Click icon that appears in the navbar
9. ???
10. Profit

## Todo

* ~~Flatten bookmarks~~
* ~~Filter recent on toolbar~~
* More toolbar?
* Fetch metadata, SEO, keywords etc (requires a proxy CORS :()
* Cache metadata
* Refresh metadata
* Search bookmarks
* Archive bookmark
* Delete bookmark
* Edit bookmark
* Create bookmark?
* Multi select (for delete?)
* ~~Filtering by name~~
* Better filtering (using metadata, url, etc)
* Ordering
* Youtube cleverness
* Amazon cleverness
* 9gag/imgur cleverness
* icon
* Actual extension popup window
* AOT!
* Animations

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
