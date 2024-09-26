import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`
    CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP  NOT NULL,
    UNIQUE(userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`
  );
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE IF EXISTS likes;`);
};
