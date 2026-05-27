import { Page, Locator, expect } from "@playwright/test";

export class HistoryPage {
private page:Page;
private historyLink:Locator;
constructor(page:Page){
this.page=page;
this.historyLink=page.getByRole("link",{name:"History"});
}

async navigateToHistory(){
await this.historyLink.click();
}

async verifyRequirementExists(requirement:string){
await expect(this.page.getByRole("heading",{name:`Requirement: ${requirement}`})).toBeVisible();
}
}