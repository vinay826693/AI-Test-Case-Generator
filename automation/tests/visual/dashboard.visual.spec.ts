import { test, expect } from '@playwright/test';

test('@visual Dashboard UI Validation', async ({ page }) => {
await page.goto('/dashboard');
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('dashboard-page.png',{fullPage: true, maxDiffPixels: 100});
});