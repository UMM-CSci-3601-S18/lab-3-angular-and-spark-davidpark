import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.typeAOwner("Blanche");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.typeABody("ea");
    expect(page.getUniqueTodo("58895985186754887e0381f5")).toEqual("Blanche");
  });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.typeACategory("software design");
    expect(page.getUniqueTodo("58895985186754887e0381f5")).toEqual("Blanche");
  });

  it('should type something in filter status box and check that it returned correct element', () => {
    page.typeAStatus("incomplete");
    expect(page.getUniqueTodo("588959850eb5fcf813bbeea3")).toEqual("Blanche");
  });

    expect(page.getUniqueTodo("588959850eb5fcf813bbeea3")).toEqual("Blanche");
  });
