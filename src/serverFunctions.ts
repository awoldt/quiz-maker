import pool from "./DB";
import { _PAGEDATA_quiz, _question } from "./types";

export async function filterProfanity(
  quizTitle: string,
  questions: _question[]
): Promise<boolean | null> {
  try {
    const profanityList = await fetch(
      "https://storage.googleapis.com/quiz-resources/profanity_list.txt",
      {
        method: "get",
        headers: {
          "Content-Type": "text/plain",
        },
        cache: "no-store",
      }
    );
    if (profanityList.status === 200) {
      const badWords = (await new Response(profanityList.body).text()).split(
        "\n"
      );

      let CONTAINS_PROFANITY: boolean = false;

      //QUIZ TITLE
      const quizTitleWords = quizTitle.split(" ").map((x) => {
        return x.toLowerCase();
      });

      for (let index = 0; index < quizTitleWords.length; index++) {
        if (badWords.includes(quizTitleWords[index])) {
          CONTAINS_PROFANITY = true;
          break;
        }
      }
      if (CONTAINS_PROFANITY) {
        return true;
      }

      //QUIZ QUESTION TITLES
      const quizQuestionTitles = questions.map((x) => {
        return x.question_title.trim();
      });
      let quizQuestionTitleWords: string[] = [];

      for (let index = 0; index < quizQuestionTitles.length; index++) {
        const titleWords = quizQuestionTitles[index].split(" ").map((x) => {
          return x.toLowerCase();
        });
        for (let index2 = 0; index2 < titleWords.length; index2++) {
          quizQuestionTitleWords.push(titleWords[index2]);
        }
      }

      for (let index = 0; index < quizQuestionTitleWords.length; index++) {
        if (badWords.includes(quizQuestionTitleWords[index])) {
          console.log("profanity in one of quiz question titles");

          CONTAINS_PROFANITY = true;
          break;
        }
      }
      if (CONTAINS_PROFANITY) {
        return true;
      }

      //QUIZ QUESTION PROMPTS
      const quizQuestionPrompts = questions.map((x) => {
        return x.prompts;
      });
      let quizQuestionPromptWords: string[] = [];
      for (let index = 0; index < quizQuestionPrompts.length; index++) {
        const promptWords = String(quizQuestionPrompts[index])
          .trim()
          .split(" ")
          .map((x) => {
            return x.toLowerCase();
          });
        for (let index2 = 0; index2 < promptWords.length; index2++) {
          if (promptWords[index2] !== "") {
            quizQuestionPromptWords.push(promptWords[index2]);
          }
        }
      }

      for (let index = 0; index < quizQuestionPromptWords.length; index++) {
        if (badWords.includes(quizQuestionPromptWords[index])) {
          CONTAINS_PROFANITY = true;
          break;
        }
      }
      if (CONTAINS_PROFANITY) {
        return true;
      }

      return false;
    } else {
      console.log("error while fetching profanity list");

      return null;
    }
  } catch (e) {
    console.log(e);
    console.log("error while filtering profanity");
    return null;
  }
}

export default async function createQuiz(
  quizTitle: string,
  quizQuestions: _question[]
) {
  try {
    const newQuiz = await pool.query(
      `insert into quizs (quiz_title) values ('${quizTitle.trim()}') returning quiz_id;`
    );

    //creates a string for sql insert query
    const qs = quizQuestions
      .map((x: _question): string => {
        return `('${x.question_title.trim()}', array [${x.prompts.map(
          (y: string | null) => {
            return `'${y!.trim()}'`;
          }
        )}], ${x.correct_answer}, ${newQuiz.rows[0].quiz_id})`;
      })
      .join(",");

    await pool.query(`insert into questions values ${qs};`);
    console.log("new quiz successfully created");
    return newQuiz.rows[0].quiz_id;
  } catch (e) {
    console.log(e);
    console.log("error while creating new quiz");
    return null;
  }
}

export async function saveGradeToDb(
  score: number,
  quizId: number,
  userAnswers: number[]
): Promise<number | null> {
  try {
    const query = await pool.query(
      `insert into graded_quizs (score, quiz_id, answers_given) values (${score}, ${quizId}, array [${userAnswers}]) RETURNING grade_id;`
    );

    console.log("sucessfully stored graded quiz in databse!");

    return query.rows[0].grade_id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

//returns all the data needed to render quiz
//1. quiz data
//2. questions data
//3. graded attempts data
export async function getQuizPageData(
  id: string
): Promise<_PAGEDATA_quiz | null> {
  try {
    const quizData = await pool.query(
      `select * from quizs where quiz_id = ${id}`
    );
    console.log("QUIZ DATA");

    console.log(quizData.rows);

    //quiz does not exist
    if (quizData.rowCount === 0) {
      console.log("\nQUIZ DOES NOT EXIST");
      return null;
    }
    //quiz exists, fetch other related data
    else {
      const questionsData = await pool.query(
        `select * from questions where quiz_id = ${id}`
      );
      console.log("QUESTIONS DATA");
      console.log(questionsData.rows);

      const gradesData = await pool.query(
        `select avg(score) as avg_scores, count(score) as num_of_submissions from graded_quizs where quiz_id = ${id};`
      );
      console.log("GRADES DATA");
      console.log(gradesData.rows);

      const x: _PAGEDATA_quiz = {
        quiz_id: Number(id),
        quiz_title: quizData.rows[0].quiz_title,
        quiz_created_on: quizData.rows[0].created_on,
        questions: questionsData.rows,
        average_score: Number(gradesData.rows[0].avg_scores),
        num_of_submissions: Number(gradesData.rows[0].num_of_submissions),
      };
      return x;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
