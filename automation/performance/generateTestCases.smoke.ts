// Purpose:- Verify API is working
// checking: API works?
import http from 'k6/http';
import { check } from 'k6';
import { handlePerformanceSummary } from './utils/performanceSummary';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function (): void {

  const response = http.post(
    'http://localhost:5000/api/testcases/generate',
    JSON.stringify({
      requirement:
        'Login page with email and password'
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
    'Smoke Test'
  );

  return {};
}
