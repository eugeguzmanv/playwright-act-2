//Activity 1: Locators in Mercado Libre
//Eugenio Guzman A01621984
//Victor Laureano A01638979

import { test, expect } from '@playwright/test';

const loginUrl = 'https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VPzW7CMAx-F59RiypBUY97kci0brHmNFnikk6Id58D4rCb_f3aD5Cw8Or0NxIMQHsUHlnhAFFQ55C848kILwZlVvqsvkowoSellGF41KCFpi8yU42aUTKZCDe9uVlCMezVZRhnR7v5VhRX6Hpnquw_R6KfjbJpjOD1jsKTe_WZfQkG3lRjHtq2lNJ4SiNOQfiaqBmDb_zewvNgiVmdJhy_YdC0kV0T64OoHNb3J-fucjz2Xd_bcDp1F3j-ASYpPp4TAQAA/user';
const googleUrl = 'https://www.google.com';
const pythonUrl = 'https://www.python.org';

test.describe('Locators', () => {
  //Tests

  //getByRole
  test('testing for getByRole locator', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const accountLink = page.getByRole('link', { name: /Crear cuenta/i })
    await expect(accountLink).toBeVisible();

    await expect(page.getByRole('button', { name: /Continuar/i })).toBeVisible();

  });

  //getByTestId
  test('testing for getByTestId locator', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const emailField = page.getByTestId('user_id');
    await expect(emailField).toBeVisible();

  });
    //getByLabel
  test('testing for getByLabel locator', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const emailLabel = page.getByLabel('E-mail o teléfono');
    await expect(emailLabel).toBeVisible();
    

  });

  //getByPlaceHolder
  test('testing for getByPlaceholder locator', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const searchHolder = page.getByPlaceholder('');
    await expect(searchHolder).toBeVisible();

  });

  //getByTitle
  test('testing for getByTitle locator', async ({ page }) => {
    await page.goto(googleUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const googleTitle = page.getByTitle('Buscar');
    await expect(googleTitle).toBeVisible();

  });

  //getByAltText
  test('testing for getByAltText locator', async ({ page }) => {
    await page.goto(pythonUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const logo = page.getByAltText('python™');
    await expect(logo).toBeVisible();
    
    

  });

  //getByText
  test('testing for getByText locator', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const createAccount = page.getByText('Crear cuenta');
    await expect(createAccount).toBeVisible();
    

  });

});