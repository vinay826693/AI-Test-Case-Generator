import { Page, Locator, expect } from "@playwright/test";
export class LoginPage {
private page:Page;
private emailInput:Locator;
private passwordInput:Locator;
private loginButton:Locator;

constructor(page:Page){
this.page=page;
this.emailInput=page.locator('input[type="email"]');
this.passwordInput=page.locator('input[type="password"]');
this.loginButton=page.getByRole("button",{name:"Login"});
}

async navigateToLogin(){
await this.page.goto("/");
}

async loginIntoApplication(){
await this.emailInput.fill("test@gmail.com");
await this.passwordInput.fill("12345");
await this.loginButton.click();
}

async verifySuccessfulLogin(){
await expect(this.page).toHaveURL(/dashboard/);
}

}