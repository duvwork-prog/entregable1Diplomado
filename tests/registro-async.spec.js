const { expect, test } = require('@playwright/test');
const { RegisterActions } = require('../pages/registroPage.actions');

test('Deberia registrarse como usuario usando POM separado', async ({ page }) => {
  const register = new RegisterActions(page);
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const username = `duvier-${suffix}`;
  const email = `duvier-${suffix}@example.com`;
  const password = `demo-${suffix}`;

  await register.open();
  await register.RegisterAs(username, email, password);

  await expect(register.statusLabel()).toHaveText('Estado: Usuario Creado Exitosamente', { timeout: 10000 });

});
