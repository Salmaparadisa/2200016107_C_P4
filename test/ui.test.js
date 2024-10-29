import { Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";

describe("UI Testing for Login Page", function () {
  this.timeout(60000); // Set timeout untuk Mocha
  let driver;

  // Inisialisasi WebDriver sebelum menjalankan test case
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // Tutup WebDriver setelah semua test selesai
  after(async function () {
    await driver.quit();
  });

  // Test untuk memastikan halaman login dapat dimuat
  it("should load the login page", async function () {
    await driver.get(
      "file:///D:/2200016107-ppmpl-prak4/2200016107-ppmpl-prak4/login.html"
    ); // Pastikan path benar sesuai lokasi file Anda
    const title = await driver.getTitle();
    expect(title).to.equal("Login Page");
  });

  // Test untuk memasukkan username dan password yang benar
  it("should allow correct username and password", async function () {
    await driver.findElement(By.id("username")).sendKeys("testuser");
    await driver.findElement(By.id("password")).sendKeys("password123");
    await driver.findElement(By.id("loginButton")).click();

    // Tunggu alert muncul dan verifikasi isi alert
    await driver.wait(until.alertIsPresent());
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("Login successful");
    await alert.accept(); // Tutup alert
  });

  // Test untuk memastikan pesan error muncul dengan input salah
  it("should show error message for incorrect login", async function () {
    await driver.findElement(By.id("username")).clear();
    await driver.findElement(By.id("username")).sendKeys("wronguser");
    await driver.findElement(By.id("password")).clear();
    await driver.findElement(By.id("password")).sendKeys("wrongpass");
    await driver.findElement(By.id("loginButton")).click();

    // Periksa apakah pesan error ditampilkan
    const errorMessage = await driver.findElement(By.id("errorMessage"));
    const isDisplayed = await errorMessage.isDisplayed();
    expect(isDisplayed).to.be.true;
    const errorText = await errorMessage.getText();
    expect(errorText).to.equal("Invalid username or password");
  });

  // Test untuk memastikan bahwa tombol login ditampilkan
  it("should display the login button", async function () {
    const isDisplayed = await driver
      .findElement(By.id("loginButton"))
      .isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  // Test untuk memastikan bahwa field username dan password ditampilkan
  it("should display username and password fields", async function () {
    const isUsernameDisplayed = await driver
      .findElement(By.id("username"))
      .isDisplayed();
    const isPasswordDisplayed = await driver
      .findElement(By.id("password"))
      .isDisplayed();
    expect(isUsernameDisplayed).to.be.true;
    expect(isPasswordDisplayed).to.be.true;
  });
});
