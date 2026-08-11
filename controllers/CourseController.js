import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            duration,
            price,
            batchStart,
            status,
            featured,
            order,
        } = req.body;

        const course = await Course.create({
            title,
            description,
            duration,
            price,
            batchStart,
            status,
            featured,
            order,
            image: req.file.path,
        });

        res.status(201).json({
            success: true,
            message: "Course added successfully",
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (req.file) {
            req.body.image = req.file.path;
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (error) {
        // console.error("Update course error:", error); // add this
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
}