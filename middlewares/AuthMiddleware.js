import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Protect Private Routes
export const protect = async (req, res, next) => {
    try {

        let token;

        // Check token exists in Authorization Header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No Token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, Token Missing"
            });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find Admin
        req.admin = await Admin.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

export default protect