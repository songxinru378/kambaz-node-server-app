import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };

    const findAssignmentById = async (req, res) => {
        const {assignmentId} = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        if (!assignment) {
            res.sendStatus(404);
            return;
        }
        res.json(assignment);
    };

    const createAssignmentForCourse = async (req, res) => {
        if (!requireFaculty(req, res)) return;
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await dao.createAssignment(assignment);
        res.send(newAssignment);
    };

    const deleteAssignment = async (req, res) => {
        if (!requireFaculty(req, res)) return;
        const {assignmentId} = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.send(status);
    };

    const updateAssignment = async (req, res) => {
        if (!requireFaculty(req, res)) return;
        const {assignmentId} = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = await dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(updatedAssignment);
    };

    const requireFaculty = (req, res) => {
        const user = req.session["currentUser"];
        if (!user) { res.sendStatus(401); return false; }
        if (user.role !== "FACULTY") { res.sendStatus(403); return false; }
        return true;
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
    app.put("/api/assignments/:assignmentId", updateAssignment);
}