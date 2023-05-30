import QuizSection from "@/components/quiz/QuizSection";
import { _PAGEDATA_quiz, _question, _quiz } from "@/types";
import { notFound } from "next/navigation";
import { getQuizPageData } from "@/serverFunctions";
import { validate } from "uuid";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: any;
}) {
  //user did not supply id url query
  if (searchParams.id === undefined || searchParams.id === "") {
    return (
      <>
        <p>
          Missing an id query (<code>/quiz?id=xxxxx</code>)
        </p>
      </>
    );
  } else {
    //not valid uuid
    if (!validate(searchParams.id)) {
      return (
        <>
          <p>Not a valid id query</p>
        </>
      );
    } else {
      //

      const quizData = await getQuizPageData(searchParams.id);

      if (quizData === null) {
        return notFound();
      } else {
        return (
          <>
            <h1>{quizData.quiz_title}</h1>
            <p>Quiz was created on {String(quizData.quiz_created_on)}</p>

            <hr></hr>
            <QuizSection
              questionsData={quizData.questions}
              quizId={quizData.quiz_id}
              quizData={quizData}
            />
          </>
        );
      }
    }
  }
}
