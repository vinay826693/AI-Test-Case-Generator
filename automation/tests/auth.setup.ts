import { test as setup } from "@playwright/test";
const authFile = 'auth/user.json';

setup('authenticate', async ({ page }) => {
await page.goto('/');
await page.fill('input[type="email"]', process.env.EMAIL!);
await page.fill('input[type="password"]', process.env.PASSWORD!);
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForURL(/dashboard/);
await page.context().storageState({path: authFile,});
});