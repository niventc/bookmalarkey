import { BookmalarkeyPage } from './app.po';

describe('bookmalarkey App', function() {
  let page: BookmalarkeyPage;

  beforeEach(() => {
    page = new BookmalarkeyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
