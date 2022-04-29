
const URL_TEST = 'http://localhost:5000/';

Feature('TodoList');

Scenario('Test Create a todo and verification todo exist on list', async ({ I }) => {
    I.amOnPage(URL_TEST);

    const todo = 'todo-' + new Date().getTime();

    I.fillField('#newTODO', todo);
    I.click('#create-todo');

    await I.see(todo, 'td.text-left');
});


Scenario('Test Create a todo and verification todo exist on list and Done Todo and verification if exist in Completed List', async ({ I }) => {
    I.amOnPage(URL_TEST);

    const todo = 'todo-' + new Date().getTime();

    I.fillField('#newTODO', todo);
    I.click('#create-todo');

    await I.see(todo, 'td.text-left');

    I.click("//tr[last()]/td/button");

    await I.see(todo, '#done-body');
});
