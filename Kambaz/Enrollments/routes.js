import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const enrollInCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401); 
            return;
        }
        const {courseId} = req.params;
        const status = dao.enrollUserInCourse(currentUser._id, courseId);
        res.send(status);
    }

    const unenrollFromCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const {courseId} = req.params;
        const status = dao.unenrollUserFromCourse(currentUser._id, courseId);
        res.send(status);
    }

    app.post("/api/courses/:courseId/enrollments", enrollInCourse);
    app.delete("/api/courses/:courseId/enrollments", unenrollFromCourse);
}