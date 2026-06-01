// import test from "../fixtures/pageObjects";
// test.describe("Dashboard Test Cases",()=>{
// test.beforeEach(
// async({login,dashboard})=>{
// await login.navigateToLogin();
// await login.loginIntoApplication();
// await login.verifySuccessfulLogin();
// await dashboard.navigateToDashboard();
// });

// test("Verify test case generation",async({dashboard})=>{
// await dashboard.generateTestCases("Login page with email and password");
// await dashboard.verifyTestCaseGenerated();
// });

// });

import test from "../fixtures/pageObjects";

test.describe("Dashboard Test Cases", () => {

  test.beforeEach(async ({ dashboard }) => {

    await dashboard.navigateToDashboard();

  });

  test("Verify test case generation", async ({ dashboard }) => {

    await dashboard.generateTestCases(
      "Login page with email and password"
    );

    await dashboard.verifyTestCaseGenerated();

  });

});