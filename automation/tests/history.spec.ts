import test from "../fixtures/pageObjects";

test.describe("History Test Cases",()=>{
const requirement="Login page with email and password";
test.beforeEach(async({login,dashboard})=>{
await login.navigateToLogin();
await login.loginIntoApplication();
await dashboard.generateTestCases(requirement);
});

test.skip("Verify generated data saved in history",async({history})=>{
await history.navigateToHistory();
await history.verifyRequirementExists(requirement);
});
});