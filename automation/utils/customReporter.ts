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

import {
  generateDashboard
} from './generateReportDashboard';

class CustomReporter implements Reporter {

  private passed = 0;
  private failed = 0;
  private skipped = 0;

  private processedTests =
    new Set<string>();


  onTestEnd(
    test: TestCase,
    result: TestResult
  ) {

    // Unique id for each test
    const testId =
      test.titlePath().join(' > ');

    // Ignore retries
    if (
      this.processedTests.has(
        testId
      )
    ) {
      return;
    }

    // Count only final result
    if (
      result.retry <
      test.retries
    ) {
      return;
    }

    this.processedTests.add(
      testId
    );

    switch (
      result.status
    ) {

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

  onEnd(
    result: FullResult
  ) {

    const currentRun = {

      runDate:
        new Date()
        .toISOString(),

      projectName:
        'AI_TEST_CASE_GENERATOR',

      passed:
        this.passed,

      failed:
        this.failed,

      skipped:
        this.skipped,

      duration:
        `${(
          result.duration /
          1000
        ).toFixed(2)}s`
    };

    const comparison =
      compareExecution(
        currentRun
      );

    saveExecutionHistory(
      currentRun
    );

    const reportData = {

      projectName:
        currentRun.projectName,

      currentRun,

      previousRun:
        comparison?.previous ||
        null,

      comparison
    };

    const reportPath =
      path.join(
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

    generateDashboard();

    console.log(
      '\n===== Dashboard Summary ====='
    );

    console.log(
      `Passed: ${this.passed}`
    );

    console.log(
      `Failed: ${this.failed}`
    );

    console.log(
      `Skipped: ${this.skipped}`
    );

    console.log(
      'Execution dashboard generated'
    );
  }
}

export default CustomReporter;