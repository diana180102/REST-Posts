import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
    CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP  NOT NULL,
    updatedAt TIMESTAMP  NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE IF EXISTS posts;`);
};
