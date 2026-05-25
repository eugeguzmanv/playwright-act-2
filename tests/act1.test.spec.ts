//Activity 1: Locators in Mercado Libre
//Eugenio Guzman A01621984
//Victor Laureano A01638979

import { test, expect } from '@playwright/test';

// Setup (playwright can't the main mercadolibre.com.mx)

test.describe('Locators', () => {
  test.beforeEach(async ({ page }) => {
    // Try the Mexico landing route, detect site error, and fall back to the global entry page if needed.
    const navigate = async () => {
      await page.goto('https://www.mercadolibre.com.mx/#from=homecom', { waitUntil: 'domcontentloaded', timeout: 60000 });
    };

    try {
      await navigate();
      const searchInput = page.locator('#cb1-edit');
      try {
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
      } catch {
        // retry the original route once more and wait for the exact search input
        await navigate();
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
      }
    } catch (err) {
      // last-resort: reload and attempt the Mexico landing route once more
      try {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
        await navigate();
        await page.locator('#cb1-edit').waitFor({ state: 'visible', timeout: 10000 });
      } catch (e) {
        throw err;
      }
    }
  });

  //Tests

  //getByRole
  test('testing for getByRole locator', async ({ page }) => {
    const accountLink = page.getByRole('link', { name: /Crea tu cuenta/i })
    await expect(accountLink).toBeVisible();

    await expect(page.locator('#cb1-edit')).toBeVisible();

  });

  //getByTestId
  test('testing for getByTestId locator', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VRXW_CMAz8L5H2RigtH0WVpml7Hr8hMq1bDE4TkkBBiP8-h2kPe3POd7bv8lDsBhpNuntUjRpxgERXNClA31OrZsozpN4Fa6gTgmWBIiX8e9pMgQAWE4aomkceOGD3hSLKI3vgiEKCSzqYnt0k2GunYBQN3kQ3ApsJ91fC3P2nCHi-YBSONGi8AlNnXvtEPjgBDyn52BTFNE1zi6GFzjHtA85bZ-f2VkRMukNt4XwhZjjmstWju4IeGKwGZh0ThKhPlLQPrsdITi7Se9mrIzKLMR1cTMFpd3RR3zXDnlwsfLH73m2qclWv6uWH77zpiXMO7x0Cvy0_pV2uN-VisdWlHBxwoOwFc5QpXFA9Z2I3ppx3e1LNy7pk5T1TKz_hxt-cN9V2sairupZiva626vkD7tHpvLkBAAA/user', { waitUntil: 'domcontentloaded', timeout: 60000 })
    const emailField = page.getByTestId('user_id');
    await expect(emailField).toBeVisible();

  });
    //getByLabel
  test('testing for getByLabel locator', async ({ page }) => {
      await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VPzW7CMAx-F59RiypBUY97kci0brHmNFnikk6Id58D4rCb_f3aD5Cw8Or0NxIMQHsUHlnhAFFQ55C848kILwZlVvqsvkowoSellGF41KCFpi8yU42aUTKZCDe9uVlCMezVZRhnR7v5VhRX6Hpnquw_R6KfjbJpjOD1jsKTe_WZfQkG3lRjHtq2lNJ4SiNOQfiaqBmDb_zewvNgiVmdJhy_YdC0kV0T64OoHNb3J-fucjz2Xd_bcDp1F3j-ASYpPp4TAQAA/user', { waitUntil: 'domcontentloaded', timeout: 60000 })
    const emailLabel = page.getByLabel('E-mail o teléfono');
    await expect(emailLabel).toBeVisible();
    

  });

  //getByPlaceHolder
  test('testing for getByPlaceholder locator', async ({ page }) => {
    const searchHolder = page.getByPlaceholder('Buscar productos, marcas y más…');
    await expect(searchHolder).toBeVisible();

  });

  //getByTitle
  test('testing for getByTitle locator', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.mx/', { waitUntil: 'domcontentloaded', timeout: 60000 })
     const cartTitle = page.getByTitle('Carrito');
     await expect(cartTitle).toBeVisible();

  });

  //getByAltText
  test('testing for getByAltText locator', async ({ page }) => {
    const logo = page.getByAltText('MLM FSNB');
    await expect(logo).toBeVisible();
    
    

  });

  //getByText
  test('testing for getByText locator', async ({ page }) => {
    const cuponLink = page.getByText('Cupones');
    await expect(cuponLink).toBeVisible();
    

  });

});