import { test, expect } from '@playwright/test';

test('@visual History UI Validation', async ({ page }) => {
await page.goto('/history');
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('history-page.png',{fullPage: true, maxDiffPixels: 100});
});