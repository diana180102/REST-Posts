import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  
  // Crear la función update_timestamp
  return await params.context.query(`
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
};

export const down: Migration = async (params) => {
  // Eliminar la función update_timestamp
  return await params.context.query(`DROP FUNCTION IF EXISTS update_timestamp;`);
};
