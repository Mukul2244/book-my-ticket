
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";
class AuthController {

    async register(req, res) {
        const user = await authService.register(req.body);
        ApiResponse.created(res, "Registration success", user);
    }
    async login(req, res) {
        try {
            const { user, accessToken, refreshToken } = await authService.login(req.body);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            ApiResponse.ok(res, "Login successful", { user, accessToken });

        } catch (error) {
            ApiResponse.error(res, error.message);
        }
    }
}
export default AuthController;
