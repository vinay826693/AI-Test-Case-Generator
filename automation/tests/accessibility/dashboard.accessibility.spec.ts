import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import { getBlockingViolations } from '../../utils/accessibilityQualityGate';

test('@accessibility Dashboard Accessibility Scan', async ({ page }) => {
    await page.goto('/dashboard');
    const results = await new AxeBuilder({ page }).analyze();
    console.log(JSON.stringify(results.violations, null, 2));
    fs.writeFileSync('test-results/dashboard-accessibility-report.json',
    JSON.stringify(results.violations, null, 2));
    const blockingViolations = getBlockingViolations(results.violations);
    console.log('Blocking Violations:', JSON.stringify(blockingViolations, null, 2));
    console.log(`Blocking Violations: ${blockingViolations.length}`);
    expect(blockingViolations.length).toBe(0);
});