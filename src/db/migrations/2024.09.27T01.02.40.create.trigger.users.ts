import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Crear el trigger para llamar a la función antes de cada actualización
  return await params.context.query(`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
   `);
};
export const down: Migration = async (params) => {
  return await params.context.query(`DROP TRIGGER IF EXISTS set_timestamp ON users;`);
};
