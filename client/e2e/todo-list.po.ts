import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeAOwner(owner: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(owner);
  }

  typeABody(body: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
  }

  typeACategory(category: string) {
    let input = element(by.id('todoCategory'));
    input.click();
    input.sendKeys(category);
  }

  typeAStatus(status: string) {
    let input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(status);
  }

  getUniqueTodo(_id:string) {
    let todo = element(by.id(_id)).getText();
    this.highlightElement(by.id(_id));

    return todo;
  }
}
