import test from "../fixtures/pageObjects";

test.describe("History Test Cases", () => {
  const requirement = "Login page with email and password";

  test.beforeEach(async ({ dashboard }) => {
    await dashboard.navigateToDashboard();
    await dashboard.generateTestCases(requirement);
  });

  test("@security Verify generated data saved in history", async ({ history }) => {
    await history.navigateToHistory();
    await history.verifyRequirementExists(requirement);
  });
});
