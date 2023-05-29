import pool from "@/DB";
import { _question, _quiz } from "../types";
export const revalidate = 60; //revalidates cache every min

export const metadata = {
  title: "Free Online Quiz Maker",
  description:
    "Create and share quizzes with the others without the hassle of having to create an account. Unlimited quizzes with as many questions as you want.",
};

async function App() {
  return (
    <div>
      <div id="center_div_homescreen">
        <h1>Create a Quiz in Seconds</h1>
        <p>No account needed. Always free.</p>
        <a href={"/create"}>
          <button className="btn btn-light">📝 Create Quiz</button>
        </a>
      </div>

      <div className="content-container">
        <p style={{ maxWidth: "1250px" }}>
          This website is a user-friendly online platform that allows you to
          create and share interactive quizzes with others. You can craft
          personalized quizzes to challenge your friends and engage with a wider
          audience for free. Whether you&apos;re a teacher, a trivia enthusiast,
          or simply looking for a fun way to connect with others, our platform
          empowers you to design captivating quizzes in minutes.
        </p>
        <h2>Features</h2>
        <ul>
          <li>
            <p>
              <b>User-Friendly Interface</b>: Basic user-friendly interface,
              making it easy for anyone, regardless of their technical
              expertise, to create quizzes. The website&apos;s design focuses on
              simplicity and ensures a smooth experience for both quiz creators
              and participants.
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
              <b>Easy Sharing and Distribution</b>: Once you have created a quiz
              , sharing it with others is a breeze. Simply copy the link and
              share with the rest of the world.
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
      </div>
    </div>
  );
}

export default App;
