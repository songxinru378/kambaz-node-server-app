import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  type: { type: String, enum: ["multiple-choice", "true-false", "fill-in-blank"], required: true },
  title: String,
  points: Number,
  questionHtml: String,

  // MCQ
  choices: { 
    type: [
    {
      text: String,
      isCorrect: Boolean,
    }
  ], default: [],
  },

  // True/False
  correctAnswer: Boolean,

  // Fill in blank
  answers: {
    type: [String],
    default: []
  },
}, { collection: "questions" });

const QuizSchema = new mongoose.Schema({
  course: { type: String, ref: "CourseModel" },
  title: { type: String, default: "New Quiz" },
  description: String,
  published: { type: Boolean, default: false },
  type: { type: String, default: "Graded Quiz" },
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  maxAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: String, default: "Immediately" },
  accessCode: String,
  oneAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockAfterAnswer: { type: Boolean, default: false },

  availableFrom: Date,
  until: Date,
  due: Date,
}, { collection: "quizzes" });

const AttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  student: String,
  answers: Array,
  score: Number,
  submittedAt: Date,
}, { collection: "attempts" });

export { QuestionSchema, QuizSchema, AttemptSchema };
