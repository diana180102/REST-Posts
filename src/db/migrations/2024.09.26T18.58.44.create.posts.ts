import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  await params.context.query(`
    CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  
};
export const down: Migration = async (params) => {
  await params.context.query(`DROP TABLE IF EXISTS posts;`);
  
};
