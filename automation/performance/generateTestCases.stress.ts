// Purpose: Find application breaking point
// Checking: When does the system start failing?
import http from 'k6/http';
import { check } from 'k6';
import { handlePerformanceSummary } from './utils/performanceSummary';

export const options = {
  vus: 20,
  duration: '60s',

  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.10'],
  },
};

export default function (): void {

  const response = http.post(
    'http://localhost:5000/api/testcases/generate',
    JSON.stringify({
      requirement:
        'Generate comprehensive login test cases'
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

}

export function handleSummary(data: any) {
   handlePerformanceSummary(
    data,
    'Stress Test'
  );
  return {};
}