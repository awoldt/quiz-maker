import { _question, _quiz } from "../types";
export const revalidate = 3600; //revalidates cache every hour

export const metadata = {
  title: "Free Online Quiz Maker",
  description:
    "Create and share quizzes with the others without the hassle of having to create an account. Unlimited quizzes with as many questions as you want. No sign up required.",
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

      <div
        className="content-container text-center"
        id="homepage_content_container"
      >
        <p style={{ maxWidth: "1250px" }} className="mx-auto mt-4 mb-5">
          This website is a user-friendly online platform that allows you to
          create and share interactive quizzes with others. You can craft
          personalized quizzes to challenge your friends and engage with a wider
          audience for free. Whether you&apos;re a teacher, a trivia enthusiast,
          or simply looking for a fun way to connect with others, our platform
          empowers you to design captivating quizzes in minutes.
        </p>

        <div className="row justify-content-center">
          <h2><u>Features</u></h2>
          <div className="col-xl-6 app-features-col">
            <p>
              <b>Instant Feedback and Results</b>: We provide immediate feedback
              to participants after they complete a quiz. Users will know all
              the correct answers at the end of each quiz.
            </p>
          </div>
          <div className="col-xl-6 app-features-col">
            <p>
              <b>Easy Sharing and Distribution</b>: Once you have created a quiz
              , sharing it with others is a breeze. Simply copy the link and
              share with the rest of the world.
            </p>
          </div>
          <div className="col-xl-6 app-features-col">
            <p>
              {" "}
              <b>Mobile-Friendly Design</b>: This site is optimized for mobile
              devices, ensuring that quizzes can be taken on smartphones and
              tablets without any loss in functionality or user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
