// performance/generateTestCases.smoke.ts
import http from "k6/http";
import { check } from "k6";

// performance/utils/performanceSummary.ts
function handlePerformanceSummary(data, testType) {
  const totalRequests = data.metrics.http_reqs?.values?.count || 0;
  const avgResponseTime = data.metrics.http_req_duration?.values?.avg || 0;
  const failureRate = (data.metrics.http_req_failed?.values?.rate || 0) * 100;
  const failedRequests = Math.round(
    totalRequests * (failureRate / 100)
  );
  const passedRequests = totalRequests - failedRequests;
  let status = "";
  let summary = "";
  let recommendation = "";
  if (failureRate === 0) {
    status = "Passed";
    summary = "Application is responding correctly. No performance issues detected.";
    recommendation = "No action required.";
  } else if (avgResponseTime > 5e3) {
    status = "Warning";
    summary = "Application is responding slower than expected.";
    recommendation = "Review backend processing and optimize API response times.";
  } else {
    status = "Failed";
    summary = "Some requests failed during execution.";
    recommendation = "Investigate failed requests and review server logs.";
  }
  console.log("\n");
  console.log("========================================");
  console.log("PERFORMANCE TEST RESULT");
  console.log("========================================");
  console.log(`Test Type         : ${testType}`);
  console.log(`Status            : ${status}`);
  console.log(`Total Requests    : ${totalRequests}`);
  console.log(`Passed Requests   : ${passedRequests}`);
  console.log(`Failed Requests   : ${failedRequests}`);
  console.log(`Average Response  : ${avgResponseTime.toFixed(2)} ms`);
  console.log("");
  console.log(`Summary           : ${summary}`);
  console.log(`Recommendation    : ${recommendation}`);
  console.log("========================================");
  return {
    testType,
    status,
    summary,
    totalRequests,
    passedRequests,
    failedRequests,
    averageResponseTimeMs: Number(avgResponseTime.toFixed(2)),
    recommendation
  };
}

// performance/generateTestCases.smoke.ts
var options = {
  vus: 1,
  iterations: 1
};
function generateTestCases_smoke_default() {
  const response = http.post(
    "http://localhost:5000/api/testcases/generate",
    JSON.stringify({
      requirement: "Login page with email and password"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  check(response, {
    "status is 200": (r) => r.status === 200
  });
}
function handleSummary(data) {
  handlePerformanceSummary(
    data,
    "Smoke Test"
  );
  return {};
}
export {
  generateTestCases_smoke_default as default,
  handleSummary,
  options
};
