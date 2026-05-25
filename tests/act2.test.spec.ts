//Activity 1: Assertions and Locators in Playright Demo
//Eugenio Guzman A01621984
//Victor Laureano A01638979


import { test, expect } from '@playwright/test';

test.describe("Playwright ToDo Demo Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test("Testing item addition", async ({ page }) => {
    test.slow();
    const todoInput = page.getByPlaceholder('What needs to be done?');

    await todoInput.fill('Finish Pepes testing activity');
    await todoInput.press('Enter');
    
    //Assertions: 
    const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Finish Pepes testing activity' });
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toContainText('Finish Pepes testing activity');

    await expect(page.getByText('Finish Pepes testing activity')).toBeVisible();
    // soft assertion
    await expect.soft(todoItem).toHaveCount(1);
    await page.screenshot({ path: "./ss/taskAddition.png" });

  });

  test("Testing task compleition", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Vectorize db');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // get by label and role  
    const todoCheckbox = page.getByTestId('todo-item').filter({ hasText: 'Vectorize db' }).getByRole('checkbox');
    const toggleLabel = page.getByLabel('Toggle Todo');
    await expect(toggleLabel).toBeVisible();
    await todoCheckbox.check();
    const completeTodo = page.getByTestId('todo-item').filter({ hasText: 'Vectorize db' });

    await expect(completeTodo).toHaveClass(/completed/);
    expect(await todoCheckbox.isChecked()).toBeTruthy();
    await page.screenshot({ path: "./ss/taskCompleition.png" });

  });
    test("Testing completed tasks clearing", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Raise money for startup');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Buy a farm and disappear into the mountains');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByTestId('todo-item').filter({ hasText: 'Raise money for startup' }).getByRole('checkbox').check();
    await page.getByTestId('todo-item').filter({ hasText: 'Buy a farm and disappear into the mountains' }).getByRole('checkbox').check();

    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
    await page.screenshot({ path: "./ss/completedClear.png" });

  });

  test("Testing task deleition", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Task to delete');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.screenshot({ path: "./ss/taskToDelete.png" });

    const todo = page.getByTestId('todo-item').filter({ hasText: 'Task to delete' });

    await todo.hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.screenshot({ path: "./ss/deletedTask.png" });
    // Negative assertion
    await expect(todo).not.toBeVisible();

  });

  test("Testing completed task filtering", async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Raise money for startup');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Buy a farm and disappear into the mountains');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByTestId('todo-item').filter({ hasText: 'Buy a farm and disappear into the mountains' }).getByRole('checkbox').check();

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByText('Double-click to edit a todo')).toBeVisible();
    await page.screenshot({ path: "./ss/completedFilter.png" });

  });



});