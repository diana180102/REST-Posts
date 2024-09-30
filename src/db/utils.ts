import { query } from "./database";

export const truncateTable = async (tableName: string): Promise<void> => {
  await query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
};
