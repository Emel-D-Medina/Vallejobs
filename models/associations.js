import User from "./User.js";
import OfertasTrabajo from "./OfertasTrabajo.js";
import Categoria from "./Categoria.js";

User.hasMany(OfertasTrabajo, { foreignKey: "userId" });
OfertasTrabajo.belongsTo(User, { foreignKey: "userId" });

export { User, OfertasTrabajo, Categoria };
