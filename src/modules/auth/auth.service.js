import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { pool } from "../../common/config/db.config.js";

// 🔒 hash refresh token
const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

// generate tokens
const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};


const register = async ({ username, email, password }) => {
    try {
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error("User already exists");
        }

        // 3. hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. insert user
        const result = await pool.query(
            `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, email, hashedPassword]
        );

        return result.rows[0];

    } catch (error) {
        // postgres unique error
        if (error.code === "23505") {
            throw new Error("Email already exists");
        }
        throw error;
    }
};

const login = async ({ email, password }) => {
    email = email.toLowerCase().trim();

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
    }

    const user = result.rows[0];

    // 3. compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // 4. generate tokens
    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    // 5. store refresh token (hashed)
    const hashedToken = hashToken(refreshToken);

    await pool.query(
        `INSERT INTO refresh_tokens (user_id, token, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
        [user.id, hashedToken]
    );

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        accessToken,
        refreshToken
    };
};

export { register, login };