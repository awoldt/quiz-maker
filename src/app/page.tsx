import pool from "@/DB";
import { _question, _quiz } from "../types";
export const revalidate = 60; //revalidates cache every min

export const metadata = {
  title: "Create a Free Online Quiz",
  description:
    "Easily create a quiz to share with friends and family. Give your quiz a name, add multiple choice questions, and then share to the world.",
};

async function App() {
  const mostRecentQuizs = await pool.query(
    "select * from quizs order by created_on desc;"
  );
  const numberOfQuizs = mostRecentQuizs.rowCount;

  mostRecentQuizs.rowCount > 10 ? (mostRecentQuizs.rows.length = 10) : null; //limit to 10 records returned
  const hardestQuizs = await pool.query(
    "select quizs.quiz_title, graded_quizs.quiz_id, AVG(graded_quizs.score) as avg_score from graded_quizs join quizs on graded_quizs.quiz_id = quizs.quiz_id group by quizs.quiz_title, graded_quizs.quiz_id order by avg_score asc limit 10;"
  );
  const numberOfQuestions = await pool.query(
    `select count(*) as count from questions;`
  );

  return (
    <div>
      <div id="center_div_homescreen" className="container">
        <div>
          <h1>Create a Quiz in Seconds</h1>
          <p>No account needed. Always free.</p>
          <a href={"/create"}>
            <button className="btn btn-danger">📝 Create Quiz</button>
          </a>
        </div>
        <span>
          <b>{numberOfQuizs}</b> quizzes
        </span>{" "}
        <span>
          <b>{numberOfQuestions.rows[0].count}</b> questions
        </span>
        <p
          className="mx-auto text-center mt-4"
          style={{ maxWidth: "700px", fontSize: "18px" }}
        >
          This website is a user-friendly and feature-rich online platform that
          allows you to create and share interactive quizzes with others. You
          can craft personalized quizzes to challenge your friends and engage
          with a wider audience for free. Whether you&apos;re a teacher, a
          trivia enthusiast, or simply looking for a fun way to connect with
          others, our platform empowers you to design captivating quizzes in
          minutes.
        </p>
      </div>

      <hr></hr>

      <h2>Features</h2>
      <ul>
        <li>
          <p>
            <b>User-Friendly Interface</b>: Basic user-friendly interface,
            making it easy for anyone, regardless of their technical expertise,
            to create quizzes. The website&apos;s design focuses on simplicity
            and ensures a smooth experience for both quiz creators and
            participants.
          </p>
        </li>

        <li>
          <p>
            <b>Instant Feedback and Results</b>: We provide immediate feedback
            to participants after they complete a quiz. Participants can also
            view their scores, completion time, and compare their performance
            with others who have taken the quiz, fostering a sense of
            competition and engagement.
          </p>
        </li>
        <li>
          <p>
            {" "}
            <b>Easy Sharing and Distribution</b>: Once you have created a quiz ,
            sharing it with others is a breeze. Simply copy the link and share
            with the rest of the world.
          </p>
        </li>

        <li>
          <p>
            <b>Mobile-Friendly Design</b>: This site is optimized for mobile
            devices, ensuring that quizzes can be taken on smartphones and
            tablets without any loss in functionality or user experience. This
            flexibility enables participants to take quizzes whenever and
            wherever they prefer, making learning and entertainment accessible
            on the go.
          </p>
        </li>
      </ul>

      <div className="featured-quizzes">
        <h2 className="featured-quiz-category-title">Most Recent</h2>
        {mostRecentQuizs.rows.map((x: any, index: number) => {
          return (
            <div key={index}>
              {" "}
              <a href={`/quiz?id=${x.quiz_id}`} className="quiz-links">
                {x.quiz_title}
              </a>
            </div>
          );
        })}
      </div>
      <div className="featured-quizzes">
        <h2 className="featured-quiz-category-title">Hardest Quizzes</h2>
        {hardestQuizs.rows.map((x: any, index: number) => {
          return (
            <>
              <div>
                <a
                  key={index}
                  href={`/quiz?id=${x.quiz_id}`}
                  className="quiz-links"
                >
                  {x.quiz_title}
                </a>
                <span>AVG SCORE {Number(x.avg_score).toFixed(2)}%</span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
