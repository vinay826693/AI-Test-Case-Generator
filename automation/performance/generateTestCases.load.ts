// Purpose: Normal expected load
// Check: Normal user traffic?
import http from 'k6/http';
import { check } from 'k6';
import { handlePerformanceSummary } from './utils/performanceSummary';

export const options = {
  vus: 5,
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function (): void {

  const response = http.post(
    'http://localhost:5000/api/testcases/generate',
    JSON.stringify({
      requirement:
        'As a user I should be able to login successfully'
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 5 sec': (r) =>
      r.timings.duration < 5000,
  });

}

export function handleSummary(data: any) {
   handlePerformanceSummary(
    data,
    'Load Test'
  );
  return {};
}