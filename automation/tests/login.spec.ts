import test from "../fixtures/pageObjects";

test.describe("Login Test Cases",()=>{
test.beforeEach(async({login})=>{
await login.navigateToLogin();
});

test("Verify user login functionality",async({login})=>{
await login.loginIntoApplication();
await login.verifySuccessfulLogin();
});
});