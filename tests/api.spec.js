// @ts-check
import { test, expect } from "@playwright/test";

const TEST_EMAIL = `test_${Date.now()}@vallejobs.com`;
const TEST_PASSWORD = "Test123456!";

test.describe("Health Check", () => {
  test("GET / debe retornar mensaje de bienvenida", async ({ request }) => {
    const response = await request.get("/");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty(
      "message",
      "¡Bienvenido a la API de Vallejobs!",
    );
  });

  test("GET / debe incluir encabezado CORS para localhost:3000", async ({
    request,
  }) => {
    const response = await request.get("/");
    expect(response.headers()["access-control-allow-origin"]).toBe(
      "http://localhost:3000",
    );
  });
});

test.describe("Autenticación", () => {
  test("POST /Usuarios/registrar debe crear un nuevo usuario", async ({
    request,
  }) => {
    const response = await request.post("/Usuarios/registrar", {
      data: {
        name: "Test",
        apellido: "User",
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        documento: "12345678",
        telefono: "3001234567",
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body).not.toHaveProperty("password");
  });

  test("POST /Usuarios/registrar debe rechazar email duplicado", async ({
    request,
  }) => {
    const response = await request.post("/Usuarios/registrar", {
      data: {
        name: "Test",
        apellido: "User",
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        documento: "87654321",
        telefono: "3007654321",
      },
    });
    expect(response.status()).toBe(409);
  });

  test("POST /Usuarios/login debe retornar token con credenciales válidas", async ({
    request,
  }) => {
    const response = await request.post("/Usuarios/login", {
      data: { email: TEST_EMAIL, password: TEST_PASSWORD },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty("user");
    expect(body.user).not.toHaveProperty("password");
  });

  test("POST /Usuarios/login debe retornar 401 con credenciales inválidas", async ({
    request,
  }) => {
    const response = await request.post("/Usuarios/login", {
      data: { email: "noexiste@test.com", password: "wrong" },
    });
    expect(response.status()).toBe(401);
  });

  test("POST /Usuarios/login debe retornar 400 si faltan campos", async ({
    request,
  }) => {
    const response = await request.post("/Usuarios/login", {
      data: { email: "" },
    });
    expect(response.status()).toBe(400);
  });
});

test.describe("Rutas Protegidas", () => {
  /**
   * @type {any}
   */
  let authToken;

  test.beforeAll(async ({ request }) => {
    await request.post("/Usuarios/registrar", {
      data: {
        name: "Test",
        apellido: "User",
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        documento: "12345678",
        telefono: "3001234567",
      },
    });
    const response = await request.post("/Usuarios/login", {
      data: { email: TEST_EMAIL, password: TEST_PASSWORD },
    });
    const body = await response.json();
    authToken = body.token;
  });

  test("GET /Usuarios/obtener debe retornar 401 sin token", async ({
    request,
  }) => {
    const response = await request.get("/Usuarios/obtener");
    expect(response.status()).toBe(401);
  });

  test("GET /Usuarios/obtener debe retornar lista con token", async ({
    request,
  }) => {
    const response = await request.get("/Usuarios/obtener", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("POST /Trabajos/agpostulante debe retornar 401 sin token", async ({
    request,
  }) => {
    const response = await request.post("/Trabajos/agpostulante", {
      data: { ofertaId: 1 },
    });
    expect(response.status()).toBe(401);
  });
});

test.describe("Ofertas de Trabajo", () => {
  test("GET /Trabajos/obtener debe retornar lista de ofertas", async ({
    request,
  }) => {
    const response = await request.get("/Trabajos/obtener");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("POST /Trabajos/registrar debe crear una oferta", async ({
    request,
  }) => {
    const response = await request.post("/Trabajos/registrar", {
      data: {
        title: "Desarrollador Full Stack",
        empresa: "Tech Corp",
        ubicacion: "Cali",
        modalidad: "Remoto",
        descripcion: "Prueba automatizada",
        requisitos: "Experiencia en Node.js y React",
        requerimientos: ["Node.js", "React", "TypeScript"],
        salario: "$5.000.000",
        categoria: "Tecnología",
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty("id");
  });

  test("GET /Trabajos/categoria/:categoria debe filtrar por categoría", async ({
    request,
  }) => {
    const response = await request.get("/Trabajos/categoria/Tecnología");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});

test.describe("Categorías", () => {
  test("POST /Categoria/registrar debe crear una categoría", async ({
    request,
  }) => {
    const response = await request.post("/Categoria/registrar", {
      data: {
        nombre: `TestCat_${Date.now()}`,
        descripcion: "Categoría de prueba automatizada",
      },
    });
    expect(response.status()).toBe(201);
  });

  test("GET /Categoria/obtener debe retornar lista", async ({ request }) => {
    const response = await request.get("/Categoria/obtener");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
