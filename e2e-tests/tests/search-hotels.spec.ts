import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("2@2.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});

test("Should show hotel search results", async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button",{name:"Search"}).click();
    
    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways Updated 2")).toBeVisible();
})
