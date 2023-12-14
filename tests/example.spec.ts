import { test, expect } from "@playwright/test";

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/");

  //We expect heading on home when not logged in
  await expect(page.locator("h2")).toContainText(
    "Share and organize your daily life with Rooms"
  );

  //Click the signup
  await page.click("text=Sign up today");

  //We expect to be routed to signup
  await expect(page).toHaveURL("http://localhost:3000/signup/");
  //Signup should have h1
  await expect(page.locator("h1")).toContainText("Create your account");

  //We route back to home
  await page.getByRole("link").click();
  await expect(page).toHaveURL("http://localhost:3000/");
  //Click login and expect to go to /login
  await page.click("text=Log in");
  await expect(page).toHaveURL("http://localhost:3000/login/");
  await expect(page.locator("h1")).toContainText("Log into your account");
});
