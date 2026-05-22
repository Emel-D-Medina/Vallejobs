import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { sequelize, testConnection } from "../database.js";

jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Configuración de Base de Datos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería estar configurada para usar MariaDB", () => {
    expect(sequelize.options.dialect).toBe("mariadb");
  });

  it("testConnection debería loguear éxito cuando authenticate funciona", async () => {
    jest.spyOn(sequelize, "authenticate").mockResolvedValue();
    await testConnection();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Conexión a la base de datos establecida"),
    );
  });

  it("testConnection debería loguear error cuando authenticate falla", async () => {
    const errorSimulado = new Error("Error de conexión");
    jest.spyOn(sequelize, "authenticate").mockRejectedValue(errorSimulado);
    await testConnection();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("No se pudo conectar"),
      errorSimulado.message,
    );
  });
});
