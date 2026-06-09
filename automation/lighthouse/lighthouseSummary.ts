import fs from 'fs';

function getScores(filePath: string) {

  const report = JSON.parse(
    fs.readFileSync(filePath, 'utf-8')
  );

  return {
    performance:
      Math.round(
        report.categories.performance.score * 100
      ),

    accessibility:
      Math.round(
        report.categories.accessibility.score * 100
      ),

    bestPractices:
      Math.round(
        report.categories['best-practices'].score * 100
      ),

    seo:
      Math.round(
        report.categories.seo.score * 100
      )
  };
}

function generateSummary() {

  const dashboard =
    getScores(
      'lighthouse/reports/dashboard-report.json'
    );

  const history =
    getScores(
      'lighthouse/reports/history-report.json'
    );

  const settings =
    getScores(
      'lighthouse/reports/settings-report.json'
    );

  console.log('');
  console.log('======================================');
  console.log('LIGHTHOUSE MULTI PAGE SUMMARY');
  console.log('======================================');

  console.log('\nDashboard');
  console.log(`Performance    : ${dashboard.performance}`);
  console.log(`Accessibility  : ${dashboard.accessibility}`);
  console.log(`Best Practices : ${dashboard.bestPractices}`);
  console.log(`SEO            : ${dashboard.seo}`);

  console.log('\nHistory');
  console.log(`Performance    : ${history.performance}`);
  console.log(`Accessibility  : ${history.accessibility}`);
  console.log(`Best Practices : ${history.bestPractices}`);
  console.log(`SEO            : ${history.seo}`);

  console.log('\nSettings');
  console.log(`Performance    : ${settings.performance}`);
  console.log(`Accessibility  : ${settings.accessibility}`);
  console.log(`Best Practices : ${settings.bestPractices}`);
  console.log(`SEO            : ${settings.seo}`);

  console.log('\n======================================');
}

generateSummary();