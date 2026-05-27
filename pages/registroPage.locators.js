const REGISTER_URL = 'http://localhost:3000/';

class RegisterLocators {
  constructor(page) {
    this.page = page;
  }

  nameInput() {
    // 
    return this.page.getByRole('textbox', { name: 'Nombre' });
  }

  emailInput() {
    // Los input type=email no siempre exponen un rol util; CSS por name es mas estable aqui.
    return this.page.getByRole('textbox', { name: 'Email' });
  }


  passwordInput() {
    // Los input type=password no siempre exponen un rol util; CSS por name es mas estable aqui.
    return this.page.getByRole('textbox', { name: 'Contraseña' });
  }

  registerButton() {
    return this.page.getByRole('button', { name: 'Registrar' });
  }

  statusLabel() {
    return this.page.locator('div#status-box');
  }
}

module.exports = { REGISTER_URL, RegisterLocators };