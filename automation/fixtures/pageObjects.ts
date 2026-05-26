import { test as baseTest, Page, BrowserContext } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { HistoryPage } from "../pages/HistoryPage";

type Fixtures = {
  login: LoginPage;
  dashboard:DashboardPage;
  history: HistoryPage;
  context: BrowserContext;
  page: Page;
};

const test = baseTest.extend<Fixtures>({
  context: async ({ browser, browserName }, use) => {
    // Only include microphone permission if browser is not WebKit
    const context = await browser.newContext(
      browserName === "webkit" ? {} : { permissions: ["microphone"] },
    );
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  login: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },

   dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await use(dashboard);
  },

    history: async ({ page }, use) => { 
     const history = new HistoryPage(page);
     await use(history);
  },

})

export default test;