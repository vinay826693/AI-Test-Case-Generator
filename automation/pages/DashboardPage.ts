// import { Page, Locator, expect } from "@playwright/test";

// export class DashboardPage {

// private page: Page;
// private requirementInput: Locator;
// private generateButton: Locator;
// private positiveText: Locator;

// constructor(page: Page){
// this.page = page;
// this.requirementInput = page.locator("textarea");
// this.generateButton = page.getByRole("button",{name:"Generate Test Cases"});
// // More specific locator
// this.positiveText = page.getByRole("heading",{name:"Positive"});
// }

// async navigateToDashboard(){
// await this.page.goto("/dashboard");
// }

// // async generateTestCases(requirement:string){
// // await this.requirementInput.fill(requirement);
// // await this.generateButton.click();
// // }

// async verifyTestCaseGenerated(){
// await expect(this.positiveText).toBeVisible();
// }


// async generateTestCases(requirement: string) {
//   await this.requirementInput.fill(requirement);

//   const responsePromise = this.page.waitForResponse(
//     response => response.url().includes('/api/testcases/generate')
//   );

//   await this.generateButton.click();

//   const response = await responsePromise;
//   console.log('Status:', response.status());
// }
// }

import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {

  private page: Page;
  private requirementInput: Locator;
  private generateButton: Locator;
  private positiveText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.requirementInput = page.locator("textarea");

    this.generateButton = page.getByRole("button", {
      name: "Generate Test Cases"
    });

    this.positiveText = page.getByRole("heading", {
      name: "Positive"
    });
  }

  async navigateToDashboard() {
    await this.page.goto("/dashboard");
  }
async generateTestCases(requirement: string) {

  // Successful responses
  this.page.on("response", response => {
    console.log(
      "RESPONSE:",
      response.status(),
      response.url()
    );
  });

  // Failed requests
  this.page.on("requestfailed", request => {
    console.log(
      "FAILED:",
      request.method(),
      request.url(),
      request.failure()?.errorText
    );
  });

  // Browser console errors
  this.page.on("console", msg => {
    console.log(
      "BROWSER:",
      msg.type(),
      msg.text()
    );
  });

  // JS runtime errors
  this.page.on("pageerror", error => {
    console.log(
      "PAGE ERROR:",
      error.message
    );
  });

  await this.requirementInput.fill(requirement);

  await this.generateButton.click();
}

  async verifyTestCaseGenerated() {
    await expect(this.positiveText).toBeVisible({
      timeout: 15000
    });
  }
}
