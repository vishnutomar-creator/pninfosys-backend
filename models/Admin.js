import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: true,
            trim: true, //remove extra spaces
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,

        },
    },
    {
        timestamps: true,
    }
)

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;