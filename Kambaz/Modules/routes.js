import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  const requireFaculty = (req, res) => {
    const user = req.session["currentUser"];
    if (!user) { res.sendStatus(401); return false; }
    if (user.role !== "FACULTY") { res.sendStatus(403); return false; }
    return true;
    };

  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  }
  const createModuleForCourse = (req, res) => {
    if (!requireFaculty(req, res)) return;
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = dao.createModule(module);
    res.send(newModule);
  }
  const deleteModule = (req, res) => {
    if (!requireFaculty(req, res)) return;
  const { moduleId } = req.params;
  const status = dao.deleteModule(moduleId);
  res.send(status);}

  const updateModule = async (req, res) => {
    if (!requireFaculty(req, res)) return;
  const { moduleId } = req.params;
  const moduleUpdates = req.body;
  const status = await dao.updateModule(moduleId, moduleUpdates);
  res.send(status);
}

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
