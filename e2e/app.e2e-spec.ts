import { ObscuraPage } from './app.po';

describe('obscura App', () => {
  let page: ObscuraPage;

  beforeEach(() => {
    page = new ObscuraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
