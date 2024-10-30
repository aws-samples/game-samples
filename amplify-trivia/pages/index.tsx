import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";
import { Button } from "@aws-amplify/ui-react";

const inter = Inter({ subsets: ["latin"] });

const client = generateClient<Schema>();

export default function Home() {
  const [questions, setQuestions] = useState<Schema["Question"][]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  async function listQuestions() {
    // fetch all questions
    const { data, errors } = await client.models.Question.list();

    setQuestions(data);
  }

  useEffect(() => {
    listQuestions();
  }, []);

  const incrementQuestion = (answer: String|null) => {
    if (answer === questions[questionNumber].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1)
  }

  const AnswerButton: React.FC<{ answer: String|null }> = ({ answer }) => {
    return <Button onClick={() => incrementQuestion(answer)}>{answer}</Button>;
  };

  return (
    <main className="home-page">
      <h1 className="title">Trivia!</h1>
      {questions[questionNumber]  ? (
        <div>
          <h2 className="question">{questions[questionNumber].text}</h2>
          <div>
            {Object.values(questions[questionNumber].answers!).map((answer: String|null, index: number) => 
              <AnswerButton key={index} answer={answer}></AnswerButton>)}
          </div>
        </div>
      ) : <h2 className="question"> Your score is <span className='title'>{score}</span>!!! </h2>}
    </main>
  );
}
