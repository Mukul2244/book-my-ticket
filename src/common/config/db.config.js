import { Pool } from "pg";

// Equivalent to mongoose connection
// Pool is nothing but group of connections
// If you pick one connection out of the pool and release it
// the pooler will keep that connection open for sometime to other clients to reuse
export const pool = new Pool({
    host: "localhost",
    port: 5435,
    user: "admin",
    password: "password",
    database: "movie_booking",
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
});