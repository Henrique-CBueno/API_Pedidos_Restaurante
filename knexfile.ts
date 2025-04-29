import { after } from "node:test";

export default{
    client: "sqlite3",
    connection: {
        filename: "./src/DATABASE/db.db"
    },
    pool:{
        afterCreate: (conn: any, done: any) => {
            conn.run("PRAGMA foreign_keys = ON")
            done()
        }
    },
    useNullAsDefault: true,
    migrations: {
        extensions: "ts",
        directory: "./src/DATABASE/migrations"
    },
    seeds: {
        extensions: "ts",
        directory: "./src/DATABASE/seeds"
    }
}