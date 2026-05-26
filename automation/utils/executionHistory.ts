import fs from 'fs';
import path from 'path';

interface ExecutionHistory {
  runDate: string;
  projectName: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: string;
}

const historyPath = path.join(
  process.cwd(),
  'test-data',
  'execution-history.json'
);

export function getHistory(): ExecutionHistory[] {

  if (
    !fs.existsSync(historyPath)
  ) {

    return [];
  }

  const data =
    fs.readFileSync(
      historyPath,
      'utf-8'
    ).trim();

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveExecutionHistory(
  executionData: ExecutionHistory
) {

  const history =
    getHistory();

  history.push(
    executionData
  );

  fs.writeFileSync(
    historyPath,
    JSON.stringify(
      history,
      null,
      2
    )
  );

  console.log(
    'Execution history saved'
  );
}

export function compareExecution(
  current: ExecutionHistory
) {

  const history =
    getHistory();

  // No previous run exists
  if (
    history.length === 0
  ) {

    return null;
  }

  // Always use last completed execution
  const previous =
    history[
      history.length - 1
    ];

  return {

    previous,

    passedDiff:
      current.passed -
      previous.passed,

    failedDiff:
      current.failed -
      previous.failed,

    skippedDiff:
      current.skipped -
      previous.skipped
  };
}