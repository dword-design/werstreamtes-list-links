import dotenv from '@dword-design/dotenv-json-extended';
import { expect } from '@playwright/test';
import { execaCommand } from 'execa';

import { test } from './fixtures/extension';

dotenv.config();
const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;
test.beforeAll(() => execaCommand('base prepublishOnly'));

test('works', async ({ page }) => {
  await page.goto('https://werstreamt.es');
  const cookieButton = page.locator('#cmpbox .cmptxt_btn_yes');
  await cookieButton.click();
  const loginLink = page.locator('li.login a');
  await loginLink.click();
  await page.locator('input[type=email]').fill(userEmail);
  await page.locator('input[type=password]').fill(userPassword);
  await page.locator('input[name=action_dologin]').click();
  const loginMenu = page.locator('li.login');
  await loginMenu.hover();
  const listsDropdown = loginMenu.locator('.has-dropdown');
  await listsDropdown.hover();
  await listsDropdown.getByRole('link', { name: 'Watchlist' }).click();

  await expect(page).toHaveURL(
    'https://www.werstreamt.es/filme-serien/liste-604612',
  );

  const images = page.locator('.results img');
  await expect(images).toBeVisible();

  await images.evaluateAll(images => {
    for (const image of images) {
      image.removeAttribute('src');
    }
  });

  await expect(page).toHaveScreenshot();
  await page.locator('.werstreamtes-list-links-edit').click();

  await expect(page).toHaveURL(
    'https://www.werstreamt.es/listen/bearbeiten/604612',
  );

  const imagesFromEditList = page.locator('.results img');
  await expect(imagesFromEditList).toBeVisible();

  await imagesFromEditList.evaluateAll(images => {
    for (const image of images) {
      image.removeAttribute('src');
    }
  });

  await expect(page).toHaveScreenshot();

  await expect(page.locator('.werstreamtes-list-links-view')).toHaveAttribute(
    'href',
    'https://www.werstreamt.es/filme-serien/liste-604612',
  );
});
