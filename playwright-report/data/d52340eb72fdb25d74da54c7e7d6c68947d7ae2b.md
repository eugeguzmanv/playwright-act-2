# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\act1.test.spec.ts >> Locators >> testing for getByTestId locator
- Location: tests\act1.test.spec.ts:50:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#cb1-edit') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "Mercado Libre - Donde comprar y vender de todo" [ref=e4] [cursor=pointer]:
      - /url: https://www.mercadolibre.com/
  - main [ref=e5]:
    - generic [ref=e8]:
      - heading "Hubo un error accediendo a esta pagina..." [level=4] [ref=e9]
      - link "Ir a la página principal" [ref=e11] [cursor=pointer]:
        - /url: https://mercadolibre.com/
```

# Test source

```ts
  1  | //Activity 1: Locators in Mercado Libre
  2  | //Eugenio Guzman A01621984
  3  | //Victor Laureano A01638979
  4  | 
  5  | import { test, expect } from '@playwright/test';
  6  | 
  7  | // Setup (playwright can't the main mercadolibre.com.mx)
  8  | 
  9  | test.describe('Locators', () => {
  10 |   test.beforeEach(async ({ page }) => {
  11 |     // Try the Mexico landing route, detect site error, and fall back to the global entry page if needed.
  12 |     const navigate = async () => {
  13 |       await page.goto('https://www.mercadolibre.com.mx/#from=homecom', { waitUntil: 'domcontentloaded', timeout: 60000 });
  14 |     };
  15 | 
  16 |     try {
  17 |       await navigate();
  18 |       const searchInput = page.locator('#cb1-edit');
  19 |       try {
  20 |         await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  21 |       } catch {
  22 |         // retry the original route once more and wait for the exact search input
  23 |         await navigate();
> 24 |         await searchInput.waitFor({ state: 'visible', timeout: 10000 });
     |                           ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  25 |       }
  26 |     } catch (err) {
  27 |       // last-resort: reload and attempt the Mexico landing route once more
  28 |       try {
  29 |         await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  30 |         await navigate();
  31 |         await page.locator('#cb1-edit').waitFor({ state: 'visible', timeout: 10000 });
  32 |       } catch (e) {
  33 |         throw err;
  34 |       }
  35 |     }
  36 |   });
  37 | 
  38 |   //Tests
  39 | 
  40 |   //getByRole
  41 |   test('testing for getByRole locator', async ({ page }) => {
  42 |     const accountLink = page.getByRole('link', { name: /Crea tu cuenta/i })
  43 |     await expect(accountLink).toBeVisible();
  44 | 
  45 |     await expect(page.locator('#cb1-edit')).toBeVisible();
  46 | 
  47 |   });
  48 | 
  49 |   //getByTestId
  50 |   test('testing for getByTestId locator', async ({ page }) => {
  51 |     await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VRXW_CMAz8L5H2RigtH0WVpml7Hr8hMq1bDE4TkkBBiP8-h2kPe3POd7bv8lDsBhpNuntUjRpxgERXNClA31OrZsozpN4Fa6gTgmWBIiX8e9pMgQAWE4aomkceOGD3hSLKI3vgiEKCSzqYnt0k2GunYBQN3kQ3ApsJ91fC3P2nCHi-YBSONGi8AlNnXvtEPjgBDyn52BTFNE1zi6GFzjHtA85bZ-f2VkRMukNt4XwhZjjmstWju4IeGKwGZh0ThKhPlLQPrsdITi7Se9mrIzKLMR1cTMFpd3RR3zXDnlwsfLH73m2qclWv6uWH77zpiXMO7x0Cvy0_pV2uN-VisdWlHBxwoOwFc5QpXFA9Z2I3ppx3e1LNy7pk5T1TKz_hxt-cN9V2sairupZiva626vkD7tHpvLkBAAA/user', { waitUntil: 'domcontentloaded', timeout: 60000 })
  52 |     const emailField = page.getByTestId('user_id');
  53 |     await expect(emailField).toBeVisible();
  54 | 
  55 |   });
  56 |     //getByLabel
  57 |   test('testing for getByLabel locator', async ({ page }) => {
  58 |       await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VPzW7CMAx-F59RiypBUY97kci0brHmNFnikk6Id58D4rCb_f3aD5Cw8Or0NxIMQHsUHlnhAFFQ55C848kILwZlVvqsvkowoSellGF41KCFpi8yU42aUTKZCDe9uVlCMezVZRhnR7v5VhRX6Hpnquw_R6KfjbJpjOD1jsKTe_WZfQkG3lRjHtq2lNJ4SiNOQfiaqBmDb_zewvNgiVmdJhy_YdC0kV0T64OoHNb3J-fucjz2Xd_bcDp1F3j-ASYpPp4TAQAA/user', { waitUntil: 'domcontentloaded', timeout: 60000 })
  59 |     const emailLabel = page.getByLabel('E-mail o teléfono');
  60 |     await expect(emailLabel).toBeVisible();
  61 |     
  62 | 
  63 |   });
  64 | 
  65 |   //getByPlaceHolder
  66 |   test('testing for getByPlaceholder locator', async ({ page }) => {
  67 |     const searchHolder = page.getByPlaceholder('Buscar productos, marcas y más…');
  68 |     await expect(searchHolder).toBeVisible();
  69 | 
  70 |   });
  71 | 
  72 |   //getByTitle
  73 |   test('testing for getByTitle locator', async ({ page }) => {
  74 |     await page.goto('https://www.mercadolibre.com.mx/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  75 |      const cartTitle = page.getByTitle('Carrito');
  76 |      await expect(cartTitle).toBeVisible();
  77 | 
  78 |   });
  79 | 
  80 |   //getByAltText
  81 |   test('testing for getByAltText locator', async ({ page }) => {
  82 |     const logo = page.getByAltText('MLM FSNB');
  83 |     await expect(logo).toBeVisible();
  84 |     
  85 |     
  86 | 
  87 |   });
  88 | 
  89 |   //getByText
  90 |   test('testing for getByText locator', async ({ page }) => {
  91 |     const cuponLink = page.getByText('Cupones');
  92 |     await expect(cuponLink).toBeVisible();
  93 |     
  94 | 
  95 |   });
  96 | 
  97 | });
```