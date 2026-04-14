//  CREATE TABLE seats (
//      id SERIAL PRIMARY KEY,
//      name VARCHAR(255),
//      isbooked INT DEFAULT 0
//  );
// INSERT INTO seats (isbooked)
// SELECT 0 FROM generate_series(1, 20);
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { pool } from "./src/common/config/db.config.js";

// const __dirname = dirname(fileURLToPath(import.meta.url));

import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server starting on port: " + port));
