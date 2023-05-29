import QuizSection from "@/components/quiz/QuizSection";
import { _PAGEDATA_quiz, _question, _quiz } from "@/types";
import { notFound } from "next/navigation";
import { getQuizPageData } from "@/serverFunctions";
import { Metadata } from "next";
import pool from "@/DB";
import Head from "next/head";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

//need this to generate metadata dynamically
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const quizTitle = await pool.query(
    `select quiz_title from quizs where quiz_id = ${searchParams.id};`
  );
  if (quizTitle.rowCount === 0) {
    return {
      title: "quiz does not exist",
    };
  } else {
    const quizData = await getQuizPageData(String(searchParams.id));

    return {
      title: quizTitle.rows[0].quiz_title + " | Free Online Quiz",
      robots: {
        index: quizData!.is_quiz_indexable,
      },
    };
  }
}

export default async function QuizPage({
  searchParams,
}: {
  searchParams: any;
}) {
  if (searchParams.id!) {
    const quizData = await getQuizPageData(searchParams.id);

    if (quizData !== null) {
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
    } else {
      return notFound();
    }
  } else {
    return (
      <>
        <p>
          pls use a query <code>?id</code> to specify what test you want
        </p>
      </>
    );
  }
}
