# Automatización Front-End

Plantilla base para practicar automatización de front-end con despliegue local en Docker.

## Estructura

- `src/`: ambiente base de la aplicación web (dockerizable)

## Flujo recomendado

1. Levantar ambiente web:
   - Ir a `src/`
   - Ejecutar: `docker compose up --build -d`
   - Abrir: `http://localhost:3000`

## Objetivo pedagógico

Este módulo deja una base funcional para que los estudiantes desarrollen por su cuenta:

- Practiquen automatización resiliente con polling.
- Extiendan el patrón POM para nuevas pantallas/escenarios.
- Integren CI/CD sin modificar la base del repo principal.

## Guía del pipeline de pruebas (GitHub Actions)

Esta guía describe, paso a paso, lo que hace el workflow definido en `.github/workflows/test-pipeline.yml`.

1. Checkout del repositorio
   - Acción: `actions/checkout@v4`.
   - Objetivo: obtener el código fuente para la ejecución de la CI.

2. Levantar el Front End (docker-compose up)
   - Comando: `docker compose -f ./src/docker-compose.yml up -d`.
   - Objetivo: levantar los servicios necesarios (aplicación web, base de datos u otros) en segundo plano.

3. Esperar a que la aplicación web responda
   - Mecanismo: un bucle que hace `curl` a `http://localhost:3000` hasta 60s.
   - Objetivo: evitar inestabilidad (flakiness) por arranques lentos del contenedor.

4. Configurar Node.js
   - Acción: `actions/setup-node@v4` con `node-version: 'lts/*'`.
   - Objetivo: preparar el entorno para instalar dependencias y ejecutar pruebas.

5. Instalar dependencias
   - Comando: `npm ci`.
   - Objetivo: instalar las dependencias exactamente según `package-lock.json`.

6. Instalar navegadores de Playwright
   - Comando: `npx playwright install --with-deps`.
   - Objetivo: asegurar que los navegadores y dependencias de Playwright estén disponibles en el runner.

7. Ejecutar pruebas Playwright
   - Comando: `npm test` (con variables de entorno `CI=true` y `HEADLESS=true`).
   - Objetivo: correr el suite de tests y generar el reporte en `playwright-report/`.

8. Subir reporte si las pruebas fallan
   - Acción: `actions/upload-artifact@v4` con `path: playwright-report/` y `if: failure()`.
   - Objetivo: conservar artefactos para diagnóstico cuando el job falla.

9. Derribar los contenedores (teardown)
   - Comando: `docker compose -f ./src/docker-compose.yml down --volumes --remove-orphans`.
   - Ejecuta con `if: always()` para asegurarse de limpiar recursos aunque las pruebas fallen.

Ejecutar localmente (pasos equivalentes)

```bash
docker compose -f ./src/docker-compose.yml up -d
npm ci
npx playwright install --with-deps
npm test
docker compose -f ./src/docker-compose.yml down --volumes --remove-orphans
```

Consejo: si ejecutas las pruebas varias veces seguidas en tu máquina local, asegúrate de que el puerto `3000` no esté ocupado y limpia volúmenes contenedores con `docker compose down` antes de volver a correr.
