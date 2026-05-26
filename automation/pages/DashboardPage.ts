import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {

private page: Page;
private requirementInput: Locator;
private generateButton: Locator;
private positiveText: Locator;

constructor(page: Page){

this.page = page;

this.requirementInput =
page.locator("textarea");

this.generateButton =
page.getByRole("button",{
name:"Generate Test Cases"
});

// More specific locator
this.positiveText =
page.getByRole("heading",{
name:"Positive"
});

}

async navigateToDashboard(){
await this.page.goto("/dashboard");
}

async generateTestCases(requirement:string){
await this.requirementInput.fill(requirement);
await this.generateButton.click();
}

async verifyTestCaseGenerated(){
await expect(this.positiveText)
.toBeVisible();
}

}
