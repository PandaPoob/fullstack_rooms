import { test, expect } from "@playwright/test";

test("checks the login flow of a user", async ({ page }) => {
  //SIGNUP//
  await page.goto("/login");
  //Fill out and submit
  await page.getByLabel("Email").fill("cleo@mail.com");
  await page.fill('input[name="password"]', "Pw12345678");
  await page.locator("[type=submit]").click();

  await page.waitForURL("/rooms");
  const currentURL = page.url();
  if (currentURL.includes("/rooms")) {
    console.log("Login successful. User is redirected to /rooms.");
    // Your assertions or further test steps can go here
  } else {
    console.error("Login failed or redirection did not occur.");
  }

  //make sure "popup" is there

  //ENSURE ERROR ON VERIFICATION//
  //try to login
  //ensure that it fails because verification is needed

  //EMAIL VERIFICATION//
  //get the link email link from somewhere
  //visit link to verify email
  //ensure success or response is ok

  //LOGIN//
  //route to login
  //fill out form
  //ensure login happens

  //VIEW AUTHENTICATED ROUTES//
  //Get to /rooms
  //Ensure content is there
  //Test that a logged user cannot go to /login

  //LOGOUT//
  //Logout
});
