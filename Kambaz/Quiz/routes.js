import * as dao from "./dao.js";

const QuizzesRoutes = (app) => {

  // ======================
  // Quizzes
  // ======================

  const requireUser = (req, res) => {
  const user = req.session.currentUser;
  if (!user) {
    res.sendStatus(401);
    return null;
  }
  return user;
};

  const isFaculty = (user) => {
    return user && user.role === "FACULTY";
};

  const getQuizzesByCourse = async (req, res) => {
    const quizzes = await dao.getQuizzesByCourse(req.params.cid);
    res.json(quizzes);
  };

  const createQuiz = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    if (!isFaculty(user)) return res.sendStatus(403);

    const quiz = await dao.createQuiz(req.params.cid);
    res.json(quiz);
  };

  const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.qid);
    if (!quiz) return res.sendStatus(404);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    if (!isFaculty(user)) return res.sendStatus(403);

    const updated = await dao.updateQuiz(req.params.qid, req.body);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  };

  const deleteQuiz = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    if (!isFaculty(user)) return res.sendStatus(403);

    await dao.deleteQuiz(req.params.qid);
    res.sendStatus(204);
  };

  const publishQuiz = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    if (!isFaculty(user)) return res.sendStatus(403);

    const updated = await dao.updateQuiz(req.params.qid, { published: req.body.published });
    res.json(updated);
  };

  // ======================
  // Questions
  // ======================

  const getQuestions = async (req, res) => {
    const questions = await dao.getQuestionsByQuiz(req.params.qid);
    res.json(questions);
  };

  const createQuestion = async (req, res) => {
    const user = requireUser(req,res);
    if (!user) return;
    if (!isFaculty(user)) return res.sendStatus(403);

    const created = await dao.createQuestion(req.params.qid, req.body);
    res.json(created);
  };

  const updateQuestion = async (req, res) => {
    const user = requireUser(req,res);
    if (!user) return;
    if (!isFaculty(user)) return res.sendStatus(403);

    const updated = await dao.updateQuestion(req.params.questionId, req.body);
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  };

  const deleteQuestion = async (req, res) => {
    const user = requireUser(req,res);
    if (!user) return;
    if (!isFaculty(user)) return res.sendStatus(403);

    await dao.deleteQuestion(req.params.questionId);
    res.sendStatus(204);
  };

  // ======================
  // Attempts (Students)
  // ======================

  const startAttempt = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    const count = await dao.getAttemptsCount(req.params.qid, user._id);
    const quiz = await dao.findQuizById(req.params.qid);

    if (quiz.multipleAttempts === false && count >= 1)
      return res.sendStatus(403);

    if (quiz.multipleAttempts === true && count >= quiz.maxAttempts)
      return res.sendStatus(403);

    const attempt = await dao.createAttempt(req.params.qid, user._id);
    res.json(attempt);
  };

  const submitAttempt = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    const { answers, score } = req.body;

    const attempt = await dao.submitAttempt(
      req.params.qid,
      user._id,
      answers,
      score
    );

    res.json(attempt);
  };

  const getAttemptResult = async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    const attempt = await dao.getLatestAttempt(req.params.qid, user._id);
    res.json(attempt);
  };

  // register routes
  app.get("/api/courses/:cid/quizzes", getQuizzesByCourse);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/quizzes/:qid", findQuizById);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.put("/api/quizzes/:qid/publish", publishQuiz);

  app.get("/api/quizzes/:qid/questions", getQuestions);
  app.post("/api/quizzes/:qid/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);

  app.post("/api/quizzes/:qid/start", startAttempt);
  app.post("/api/quizzes/:qid/submit", submitAttempt);
  app.get("/api/quizzes/:qid/result", getAttemptResult);
};

export default QuizzesRoutes;
