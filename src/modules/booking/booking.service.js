import { pool } from "../../common/config/db.config.js";

const createBooking = async ({ userId, movieId, seatIds }) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 🔒 Step 1: Lock seats (ONLY for this movie)
        const seatCheck = await client.query(
            `SELECT id FROM seats 
             WHERE id = ANY($1) 
             AND movie_id = $2 
             AND isbooked = false
             FOR UPDATE`,
            [seatIds, movieId]
        );

        // ❌ If any seat already booked
        if (seatCheck.rows.length !== seatIds.length) {
            throw new Error("Some seats are already booked");
        }

        // 🟢 Step 2: Mark seats as booked
        await client.query(
            `UPDATE seats 
             SET isbooked = true
             WHERE id = ANY($1)`,
            [seatIds]
        );

        await client.query("COMMIT");

        return {
            movieId,
            seatIds,
            message: "Booking successful"
        };

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export { createBooking };