// spec.js
describe('Maple app', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8080');

    expect(browser.getTitle()).toEqual('Maple');
  });
});

