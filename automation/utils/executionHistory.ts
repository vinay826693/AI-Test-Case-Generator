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
  if (!fs.existsSync(historyPath)) {
    return [];
  }

  const data = fs.readFileSync(
    historyPath,
    'utf-8'
  ).trim();

  return data ? JSON.parse(data) : [];
}

export function saveExecutionHistory(
  executionData: ExecutionHistory
) {
  const history = getHistory();

  history.push(executionData);

  fs.writeFileSync(
    historyPath,
    JSON.stringify(history, null, 2)
  );

  console.log('Execution history saved');
}

export function compareExecution(
  current: ExecutionHistory
) {
  const history = getHistory();

  // Last saved run before current one
  const previous =
    history.length > 0
      ? history[history.length - 1]
      : null;

  if (!previous) {
    return null;
  }

  return {
    previous,

    passedDiff:
      current.passed - previous.passed,

    failedDiff:
      current.failed - previous.failed,

    skippedDiff:
      current.skipped - previous.skipped
  };
}