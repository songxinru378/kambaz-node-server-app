import mongoose from "mongoose";
import { QuestionSchema, QuizSchema, AttemptSchema } from "./schema.js";

export const QuestionModel = mongoose.model("Question", QuestionSchema);
export const QuizModel = mongoose.model("Quiz", QuizSchema);
export const AttemptModel = mongoose.model("Attempt", AttemptSchema);