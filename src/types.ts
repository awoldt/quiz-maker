//TABLES --

export interface _question {
  question_title: string;
  prompts: (string | null)[];
  correct_answer: number; // the index of answers that is correct
  quiz_id?: number; //fk
}

export interface _quiz {
  quiz_id?: number; //pk
  quiz_title: string;
  created_on?: string;
}

export interface _gradedQuiz {
  graded_id?: number; //pk
  score: number;
  answers_given: number[];
  completed_on?: string;
  quiz_id: number; //fk
}

//-- END TABLES

export interface _RESPONSE_grade {
  score: number;
  graded_id: number;
  msg: string;
}

export interface _RESPONSE_get_quiz_grade {
  answers: number[];
  score: number;
}

export interface _RESPONSE_create_quiz {
  quizId: number;
}

interface _localstorage_quiz_structure {
  quiz_id: number;
  grade_id: number;
}

export interface _LOCALSTORAGE_quizs {
  graded_quizs: _localstorage_quiz_structure[];
}

export interface _PAGEDATA_quiz {
  quiz_id: number;
  quiz_title: string;
  quiz_created_on: string;
  questions: _question[];
  average_score: number;
  num_of_submissions: number;
}
