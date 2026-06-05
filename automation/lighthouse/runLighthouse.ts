import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'fs';
import { generateSummary } from './lighthouseSummary';

async function runLighthouse() {

  const chrome = await launch({
    chromeFlags: ['--headless']
  });

  const result = await lighthouse(
    'http://localhost:5173',
    {
      port: chrome.port,
      output: 'json'
    }
  );

  fs.mkdirSync(
    'lighthouse/reports',
    { recursive: true }
  );

  fs.writeFileSync(
    'lighthouse/reports/report.json',
    result.report as string
  );

  console.log('Lighthouse report generated');

  await chrome.kill();
}

runLighthouse();
