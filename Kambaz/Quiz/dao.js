import { QuizModel, QuestionModel, AttemptModel } from "./model.js";

export default function QuizzesDao() {
  // Quizzes
  const createQuiz = (cid) => QuizModel.create({ course: cid });

  const getQuizzesByCourse = (cid) => QuizModel.find({ course: cid }).sort({availableFrom: 1});

  const findQuizById = (qid) => QuizModel.findById(qid);

  const updateQuiz = (qid, data) =>
    QuizModel.findByIdAndUpdate(qid, data, { new: true });

  const deleteQuiz = (qid) => QuizModel.findByIdAndDelete(qid);

  // Questions
  const getQuestionsByQuiz = (qid) => QuestionModel.find({ quiz: qid });

  const findQuestionById = (questionId) => QuestionModel.findById(questionId);
  

  const createQuestion = (qid, data) =>
    QuestionModel.create({ quiz: qid, ...data });

  const updateQuestion = (questionId, data) =>
    QuestionModel.findByIdAndUpdate(questionId, data, { new: true });

  const deleteQuestion = (questionId) =>
    QuestionModel.findByIdAndDelete(questionId);

  const findQuestionsByPartialTitle = (quizId, partialTitle) => {
    const regex = new RegExp(partialTitle, "i");
    return QuestionModel.find({
        quiz: quizId,
        title: {$regex: regex},
    });
  }
  const findQuestionsByType = (quizId, type) => {
    return QuestionModel.find({quiz: quizId, type: type});
  }

  // Attempts
  const createAttempt = (qid, uid) =>
    AttemptModel.create({
      quiz: qid,
      student: uid,
      answers: [],
      score: 0,
      submittedAt: new Date(),
    });

  const getLatestAttempt = (qid, uid) =>
    AttemptModel.findOne({ quiz: qid, student: uid }).sort({ submittedAt: -1 });

  const getAttemptsCount = (qid, uid) =>
    AttemptModel.countDocuments({ quiz: qid, student: uid });

  const submitAttempt = (qid, uid, answers, score) =>
    AttemptModel.create({
      quiz: qid,
      student: uid,
      answers,
      score,
      submittedAt: new Date(),
    });

  return {
    createQuiz,
    getQuizzesByCourse,
    findQuizById,
    updateQuiz,
    deleteQuiz,

    getQuestionsByQuiz,
    findQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    findQuestionsByPartialTitle,
    findQuestionsByType,

    createAttempt,
    getLatestAttempt,
    getAttemptsCount,
    submitAttempt
  };
}
