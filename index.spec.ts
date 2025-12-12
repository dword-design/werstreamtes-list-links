import dotenv from '@dword-design/dotenv-json-extended';
import { expect } from '@playwright/test';
import delay from 'delay';
import { execaCommand } from 'execa';

import { test } from './fixtures/extension';

dotenv.config();
const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;

test.beforeAll(() =>
  execaCommand('base build', { env: { NODE_ENV: '' }, stdio: 'inherit' }),
);

test('works', async ({ page }) => {
  await page.goto('https://werstreamt.es');
  const cookieButton = page.locator('#cmpbox .cmptxt_btn_yes');
  await cookieButton.click();

  const loginLink = page
    .getByRole('navigation')
    .getByRole('link', { name: 'Login' });

  await loginLink.click();
  await page.locator('input[type=email]').fill(userEmail);
  await page.locator('input[type=password]').fill(userPassword);
  await page.locator('input[name=action_doLogin]').click();
  const loginMenu = page.locator('li.login');
  await loginMenu.hover();
  const listsDropdown = loginMenu.locator('.has-dropdown');
  await listsDropdown.hover();
  await listsDropdown.getByRole('link', { name: 'Watchlist' }).click();

  await expect(page).toHaveURL(
    'https://www.werstreamt.es/filme-serien/liste-604612/',
  );

  const images = page.locator('.results img');

  const accountLink = page
    .getByRole('navigation')
    .getByRole('link', { name: 'Account' });

  await Promise.all([
    expect(images.first()).toBeVisible(),
    expect(accountLink).toBeVisible(),
  ]);

  const ad = page
    .locator('.content')
    .getByRole('listitem')
    .first()
    .locator('iframe');

  await ad.evaluate(el => el.remove());
  await expect(page).toHaveScreenshot();
  await page.locator('.werstreamtes-list-links-edit').click();

  await expect(page).toHaveURL(
    'https://www.werstreamt.es/listen/bearbeiten/604612/',
  );

  const imagesFromEditList = page
    .locator('.content-list-container')
    .getByRole('img');

  await expect(imagesFromEditList.first()).toBeVisible();
  await delay(500); // There is a strange animation going on and in CI the screenshot had the banner at the bottom duplicated
  await expect(page).toHaveScreenshot();

  await expect(page.locator('.werstreamtes-list-links-view')).toHaveAttribute(
    'href',
    '/filme-serien/liste-604612',
  );
});
