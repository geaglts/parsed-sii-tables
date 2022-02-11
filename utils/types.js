export const types = {
  Texto: "string",
  Número: "number",
  Enumeración: "string",
  "Texto enriquecido": "string",
  "Fecha y hora": "timestamp",
  Fecha: "date",
  Hora: "hour",
  Media: "file",
  ID: "Object Id",
  Booleano: "boolean",
  JSON: "json",
  "Correo electrónico": "string",
  Contraseña: "string",
};

export const parsedTypes = (type = "") => {
  if (type.includes("Union con ")) {
    return types.ID;
  }
  return types[type];
};
