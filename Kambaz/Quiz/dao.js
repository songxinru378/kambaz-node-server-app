import { QuizModel, QuestionModel, AttemptModel } from "./model.js";

export const createQuiz = (cid) =>
  QuizModel.create({ course: cid });

export const getQuizzesByCourse = (cid) =>
  QuizModel.find({ course: cid });

export const findQuizById = (qid) =>
  QuizModel.findById(qid);

export const updateQuiz = (qid, data) =>
  QuizModel.findByIdAndUpdate(qid, data, { new: true });

export const deleteQuiz = (qid) =>
  QuizModel.findByIdAndDelete(qid);

// ============================
// Questions
// ============================
export const getQuestionsByQuiz = (qid) =>
  QuestionModel.find({ quiz: qid });

export const createQuestion = (qid, data) =>
  QuestionModel.create({ quiz: qid, ...data });

export const updateQuestion = (questionId, data) =>
  QuestionModel.findByIdAndUpdate(questionId, data, { new: true });

export const deleteQuestion = (questionId) =>
  QuestionModel.findByIdAndDelete(questionId);

// ============================
// Attempts
// ============================
export const createAttempt = (qid, uid) =>
  AttemptModel.create({
    quiz: qid,
    student: uid,
    answers: [],
    score: 0,
    submittedAt: new Date()
  });

export const getLatestAttempt = (qid, uid) =>
  AttemptModel.findOne({ quiz: qid, student: uid }).sort({ submittedAt: -1 });

export const getAttemptsCount = (qid, uid) =>
  AttemptModel.countDocuments({ quiz: qid, student: uid });

export const submitAttempt = (qid, uid, answers, score) =>
  AttemptModel.create({
    quiz: qid,
    student: uid,
    answers,
    score,
    submittedAt: new Date(),
  });
