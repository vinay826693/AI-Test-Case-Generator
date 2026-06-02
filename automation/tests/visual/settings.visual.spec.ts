import { test, expect } from '@playwright/test';

test('@visual Settings UI Validation', async ({ page }) => {
await page.goto('/settings');
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('settings-page.png',{fullPage: true, maxDiffPixels: 10});
});