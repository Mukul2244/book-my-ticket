
import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";
class AuthController {
    
    async register(req, res) {
        const user = await authService.register(req.body);
        ApiResponse.created(res, "Registration success", user);
    }
    async login(req, res) {
        const { user, accessToken, refreshToken } = await authService.login(req.body);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        ApiResponse.ok(res, "Login successful", { user, accessToken });
    }
}
export default AuthController;
