const fs = require('fs');

const report = JSON.parse(
  fs.readFileSync('security/reports/zap-report.json', 'utf8')
);

let high = 0;
let medium = 0;
let low = 0;
let info = 0;

report.site?.forEach(site => {
  site.alerts?.forEach(alert => {
    const riskCode = Number(alert.riskcode);

    switch (riskCode) {
      case 3:
        high++;
        break;
      case 2:
        medium++;
        break;
      case 1:
        low++;
        break;
      default:
        info++;
    }
  });
});

console.log('\n=================================');
console.log(' OWASP ZAP Security Summary');
console.log('=================================');
console.log(`High Findings      : ${high}`);
console.log(`Medium Findings    : ${medium}`);
console.log(`Low Findings       : ${low}`);
console.log(`Informational      : ${info}`);
console.log('=================================');

if (high > 0) {
  console.log('Security Status    : FAILED');
  process.exit(1);
}

console.log('Security Status    : PASSED');