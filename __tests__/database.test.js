const { sequelize, testConnection } = require("../database");

// Mockeamos los console para no ensuciar la terminal del test
console.log = jest.fn();
console.error = jest.fn();

describe("Configuración de Base de Datos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería estar configurada para usar MariaDB", () => {
    expect(sequelize.options.dialect).toBe("mariadb");
  });

  it("testConnection debería loguear éxito cuando authenticate funciona", async () => {
    // Simulamos que la autenticación es exitosa
    jest.spyOn(sequelize, "authenticate").mockResolvedValue();

    await testConnection();

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Conexión a la base de datos establecida"),
    );
  });

  it("testConnection debería loguear error cuando authenticate falla", async () => {
    // Simulamos un fallo de conexión
    const errorSimulado = new Error("Error de conexión");
    jest.spyOn(sequelize, "authenticate").mockRejectedValue(errorSimulado);

    await testConnection();

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("No se pudo conectar"),
      errorSimulado,
    );
  });
});
