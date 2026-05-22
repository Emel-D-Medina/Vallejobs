// @ts-check
import { test, expect } from "@playwright/test";

const TEST_EMAIL = `test_${Date.now()}@vallejobs.com`;
const TEST_PASSWORD = "Test123456!";

test.describe("Página de Inicio", () => {
  test("debe cargar la página principal con el título VALLEJOBS", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator(".navbar")).toBeVisible();
    await expect(page.locator(".logo")).toHaveText("VALLEJOBS");
  });

  test("debe mostrar botones de REGISTRAR y Login cuando no hay sesión", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "REGISTRAR" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("debe mostrar Inicio/Dashboard/Mi Perfil cuando hay sesión", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("token", "mock-jwt-token");
    });
    await page.reload();
    await expect(page.getByRole("button", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Mi Perfil" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Cerrar sesión" }),
    ).toBeVisible();
    await page.evaluate(() => localStorage.removeItem("token"));
  });

  test("debe navegar al hacer clic en REGISTRAR", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "REGISTRAR" }).click();
    await expect(page).toHaveURL("/registro");
  });

  test("debe navegar al hacer clic en Login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");
  });

  test("el menú hamburguesa debe aparecer en viewport móvil", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const hamburger = page.locator(".hamburger");
    await expect(hamburger).toBeVisible();
    await hamburger.click();
  });
});

test.describe("Login", () => {
  test("debe mostrar el formulario de inicio de sesión", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Inicio de sesión")).toBeVisible();
    await expect(page.getByPlaceholder("Tu email")).toBeVisible();
    await expect(page.getByPlaceholder("Tu contraseña")).toBeVisible();
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  test("debe mostrar error al enviar credenciales inválidas", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Tu email").fill("invalido@test.com");
    await page.getByPlaceholder("Tu contraseña").fill("wrong");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.locator(".error-message")).toBeVisible({
      timeout: 10000,
    });
  });

  test("debe navegar a /dashboard tras login exitoso", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Tu email").fill(TEST_EMAIL);
    await page.getByPlaceholder("Tu contraseña").fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Entrar" }).click();
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
    await expect(page).toHaveURL("/dashboard");
    await page.evaluate(() => localStorage.removeItem("token"));
  });

  test("debe mostrar enlace de ¿Olvidaste tu contraseña?", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("¿Olvidaste tu contraseña?")).toBeVisible();
  });
});

test.describe("Registro", () => {
  test("debe cargar la página de registro", async ({ page }) => {
    await page.goto("/registro");
    await expect(page.getByText("Registrarse")).toBeVisible();
  });
});

test.describe("Rutas Protegidas", () => {
  test("debe redirigir a /login al acceder a /dashboard sin token", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/login");
  });

  test("debe redirigir a /login al acceder a /UserProfile sin token", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.goto("/UserProfile");
    await expect(page).toHaveURL("/login");
  });

  test("debe redirigir a /login al acceder a /EditProfile sin token", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.goto("/EditProfile");
    await expect(page).toHaveURL("/login");
  });

  test("debe acceder a /dashboard con token válido", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("token", "mock-jwt-token");
    });
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/dashboard");
    await page.evaluate(() => localStorage.removeItem("token"));
  });
});

test.describe("CreateJob", () => {
  test("debe mostrar el formulario de creación de empleo", async ({ page }) => {
    await page.goto("/CreateJob");
    await expect(page.getByText("Publicar Empleo")).toBeVisible();
  });
});

test.describe("Dashboard", () => {
  test("debe mostrar el dashboard con token", async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("token", "mock-jwt-token"));
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/dashboard");
    await page.evaluate(() => localStorage.removeItem("token"));
  });
});

test.describe("Navegación desde Navbar", () => {
  test("el logo debe navegar al inicio", async ({ page }) => {
    await page.goto("/login");
    await page.locator(".logo").click();
    await expect(page).toHaveURL("/Home");
  });
});
