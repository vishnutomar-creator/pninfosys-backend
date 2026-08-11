import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        // Success Response
        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are required"
            });
        }
        // Find admin by email
        const admin = await Admin.findOne({ email });

        // check admin exists
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Invalid email and Pasword"
            });
        }

        // Compare entered password with hashed password
        const isMatch = bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email pr password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // send response
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

    
};

export default { loginAdmin, registerAdmin }