import test from "../fixtures/pageObjects";

test.describe("Dashboard Test Cases", () => {
  test.beforeEach(async ({ dashboard }) => {
    await dashboard.navigateToDashboard();
  });

  test("@security Verify test case generation", async ({ dashboard }) => {
    await dashboard.generateTestCases("Login page with email and password");
    await dashboard.verifyTestCaseGenerated();
  });
});
