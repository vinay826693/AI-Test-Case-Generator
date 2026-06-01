import { test, expect } from '@playwright/test';

test.describe('Keyboard Accessibility Tests', () => {
    test('@accessibility Keyboard Navigation - Dashboard Page', async ({ page }) => {
        await page.goto('/dashboard');
        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
    });

    test('@accessibility Sidebar Keyboard Navigation', async ({ page }) => {
        await page.goto('/dashboard');
        const dashboardLink = page.getByRole('link', { name: /dashboard/i });
        const historyLink = page.getByRole('link', { name: /history/i });
        const settingsLink = page.getByRole('link', { name: /settings/i });
        await dashboardLink.focus();
        await expect(dashboardLink).toBeFocused();
        await historyLink.focus();
        await expect(historyLink).toBeFocused();
        await settingsLink.focus();
        await expect(settingsLink).toBeFocused();
    });

    test('@accessibility Enter Key Navigation To History', async ({ page }) => {
        await page.goto('/dashboard');
        const historyLink = page.getByRole('link', { name: /history/i });
        await historyLink.focus();
        await expect(historyLink).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(/history/);
    });

    test('@accessibility Enter Key Navigation To Settings', async ({ page }) => {
        await page.goto('/dashboard');
        const settingsLink = page.getByRole('link', { name: /settings/i });
        await settingsLink.focus();
        await expect(settingsLink).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(/settings/);
    });
});