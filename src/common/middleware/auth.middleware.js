import ApiError from "../utils/api-error.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";
import { pool } from "../config/db.config.js";
const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw ApiError.unauthorized("Not Autheticated");
    const decoded = verifyAccessToken(token);
    const result = await pool.query(
        "SELECT id, username, email FROM users WHERE id = $1",
        [decoded.userId]
    );

    if (result.rows.length === 0) {
        throw ApiError.unauthorized("User no longer exists");
    }

    const user = result.rows[0];

    req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    next();
};

export default authenticate;