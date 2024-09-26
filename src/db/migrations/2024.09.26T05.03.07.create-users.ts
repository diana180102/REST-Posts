import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    CHECK (username ~ '^[a-zA-Z0-9_.-]{3,100}$'),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    CHECK (role IN ('admin', 'user')),
    createdAt TIMESTAMP  NOT NULL,
    updatedAt TIMESTAMP  NOT NULL
    );`
  );
};
export const down: Migration = async (params) => {
  return params.context.query(`DROP TABLE users;`);
};