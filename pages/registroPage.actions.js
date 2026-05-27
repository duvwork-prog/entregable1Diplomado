const { REGISTER_URL, RegisterLocators } = require('./registroPage.locators');

class RegisterActions {
  constructor(page) {
    this.page = page;
    this.locators = new RegisterLocators(page);
  }

  async open() {
    await this.page.goto(REGISTER_URL);
    return this;
  }

  async RegisterAs(username, email, password) {
    await this.locators.nameInput().fill(username);
    await this.locators.emailInput().fill(email);
    await this.locators.passwordInput().fill(password);
    await this.locators.registerButton().click();
  }

  statusLabel() {
    return this.locators.statusLabel();
  }
}

module.exports = { RegisterActions };
