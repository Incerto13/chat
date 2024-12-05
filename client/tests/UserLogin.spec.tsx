import { test, expect } from '@playwright/test';

test('UserLogin should store user in localStorage on login', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Find the input element and the login button
  const usernameInput = await page.locator('input[type="text"]');
  const loginButton = await page.locator('button');

  await usernameInput.fill('John Doe');

  await loginButton.click();

  await page.waitForFunction(() => localStorage.getItem('user') === 'John Doe');

  // Check if the localStorage item 'user' has been set correctly
  const user = await page.evaluate(() => localStorage.getItem('user'));
  expect(user).toBe('John Doe');

  // Optionally, check the avatar URL
  const avatar = await page.evaluate(() => localStorage.getItem('avatar'));
  expect(avatar).toMatch(/^https:\/\/picsum.photos\/id\/\d+\/200\/300$/);
});
