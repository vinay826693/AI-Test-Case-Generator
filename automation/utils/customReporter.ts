import fs from 'fs';
import path from 'path';

import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult
} from '@playwright/test/reporter';

import {
  saveExecutionHistory,
  compareExecution
} from './executionHistory';

import { generateDashboard } from './generateReportDashboard';

class CustomReporter implements Reporter {

  private passed = 0;
  private failed = 0;
  private skipped = 0;

  onTestEnd(
    test: TestCase,
    result: TestResult
  ) {

    switch (result.status) {

      case 'passed':
        this.passed++;
        break;

      case 'failed':
        this.failed++;
        break;

      case 'skipped':
        this.skipped++;
        break;
    }
  }

  onEnd(result: FullResult) {

    const currentRun = {

      runDate: new Date().toISOString(),

      projectName: 'AI_TEST_CASE_GENERATOR',

      passed: this.passed,

      failed: this.failed,

      skipped: this.skipped,

      duration: `${(result.duration / 1000).toFixed(2)}s`
    };

    const comparison =
      compareExecution(currentRun);

    saveExecutionHistory(currentRun);

    if (comparison) {

      const getArrow = (value:number) => {

        if (value > 0) return '↑';

        if (value < 0) return '↓';

        return '→';
      };

      console.log('\n===== Execution Comparison =====');

      console.log(
        `Passed: ${getArrow(
          comparison.passedDiff
        )} ${Math.abs(
          comparison.passedDiff
        )}`
      );

      console.log(
        `Failed: ${getArrow(
          comparison.failedDiff
        )} ${Math.abs(
          comparison.failedDiff
        )}`
      );

      console.log(
        `Skipped: ${getArrow(
          comparison.skippedDiff
        )} ${Math.abs(
          comparison.skippedDiff
        )}`
      );
    }

    const reportData = {

      projectName: currentRun.projectName,

      currentRun,

      previousRun:
        comparison?.previous || null,

      comparison
    };

    const reportPath = path.join(
      process.cwd(),
      'test-data',
      'comparison-data.json'
    );

    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        reportData,
        null,
        2
      )
    );

    console.log(
      'Comparison report generated'
    );

    generateDashboard();

    console.log(
      'Execution dashboard generated'
    );
  }
}

export default CustomReporter;