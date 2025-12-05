import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        points: String,
        course: {type:String, ref: "CourseModel"},
        submissionType: String,
        displayAs: String,
        group: String,
        availableFrom: String,
        due: String,
        availableDate: String,
        dueDate: String,
    },
    {collection: "assignments"}
);

export default assignmentSchema;
