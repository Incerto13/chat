import { test, expect } from '@playwright/test';



test.describe('ChatContainer Component', () => {
  test.beforeEach(async ({ page }) => {
    // Mock localStorage.setItem and set a user and avatar in localStorage
    await page.goto('http://localhost:5173');

    // Set mock localStorage data to simulate a logged-in user
    await page.evaluate(() => {
      localStorage.setItem('user', 'Ricky Bobby');
      localStorage.setItem('avatar', 'https://picsum.photos/id/1/200/300');
    });

    await page.reload();
  });

  test('should logout the user when the logout button is clicked', async ({ page }) => {
    const logoutButton = await page.locator('.chats_logout');
    await logoutButton.click();

    // Ensure the user is logged out by checking that the UserLogin component is visible
    const userLogin = await page.locator('input[type="text"]');
    await expect(userLogin).toBeVisible();
    
    // Verify that the username is removed from localStorage
    const username = await page.evaluate(() => localStorage.getItem('user'));
    expect(username).toBeNull();
  });
});
