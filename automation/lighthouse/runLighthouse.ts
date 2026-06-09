console.log('MULTI PAGE LIGHTHOUSE RUNNING');
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'fs';

async function runLighthouse() {

  const chrome = await launch({
    chromeFlags: ['--headless']
  });

  fs.mkdirSync(
    'lighthouse/reports',
    { recursive: true }
  );

  const pages = [
    {
      name: 'dashboard',
      url: 'http://localhost:5173/dashboard'
    },
    {
      name: 'history',
      url: 'http://localhost:5173/history'
    },
    {
      name: 'settings',
      url: 'http://localhost:5173/settings'
    }
  ];

  for (const page of pages) {
    console.log(`Auditing: ${page.url}`);

    const result = await lighthouse(
      page.url,
      {
        port: chrome.port,
        output: 'json'
      }
    );

    fs.writeFileSync(
      `lighthouse/reports/${page.name}-report.json`,
      result.report as string
    );

    console.log(
      `${page.name} report generated`
    );
  }

  await chrome.kill();
}

runLighthouse();
