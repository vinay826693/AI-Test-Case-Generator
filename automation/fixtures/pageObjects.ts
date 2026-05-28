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