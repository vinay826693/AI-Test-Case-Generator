import fs from 'fs';

export function generateSummary() {

  const report = JSON.parse(
    fs.readFileSync(
      'lighthouse/reports/report.json',
      'utf-8'
    )
  );

  const performance =
    Math.round(
      report.categories.performance.score * 100
    );

  const accessibility =
    Math.round(
      report.categories.accessibility.score * 100
    );

  const bestPractices =
    Math.round(
      report.categories['best-practices'].score * 100
    );

  const seo =
    Math.round(
      report.categories.seo.score * 100
    );

  let status = 'Passed';

  if (
    performance < 80 ||
    accessibility < 80
  ) {
    status = 'Warning';
  }

  console.log('\n');
  console.log('================================');
  console.log('LIGHTHOUSE AUDIT RESULT');
  console.log('================================');
  console.log(`Performance     : ${performance}`);
  console.log(`Accessibility   : ${accessibility}`);
  console.log(`Best Practices  : ${bestPractices}`);
  console.log(`SEO             : ${seo}`);
  console.log('');
  console.log(`Status          : ${status}`);
  console.log('');

  if (status === 'Passed') {
    console.log(
      'Summary: Application meets Lighthouse quality standards.'
    );
  } else {
    console.log(
      'Summary: Improvements recommended in performance or accessibility.'
    );
  }

  console.log('================================');
}
generateSummary();