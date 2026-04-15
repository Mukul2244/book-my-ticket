import * as bookingService from "./booking.service.js";
import ApiResponse from "../../common/utils/api-response.js";

class BookingController {
    async createBooking(req, res) {
        try {
            const { movieId, seatIds } = req.body;
            const userId = req.user.id;

            const booking = await bookingService.createBooking({
                userId,
                movieId,
                seatIds
            });

            ApiResponse.ok(res, "Booking successful", booking);

        } catch (error) {
            ApiResponse.error(res, error.message);
        }
    }
}

export default new BookingController();