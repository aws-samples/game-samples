import { Input, Button, withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { type Schema } from "@/amplify/data/resource";
import { signOut } from "aws-amplify/auth";

const client = generateClient<Schema>({ authMode: "userPool" });

function CreateQuestion() {
  const [question, setQuestion] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  const shuffleArray = (arr: (string)[]) => {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const createQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let answers: (string)[] = shuffleArray([
      answer1,
      answer2,
      answer3,
      answerCorrect,
    ]);

    const { errors, data: newQuestion } = await client.models.Question.create({
      text: question,
      answers: answers,
      correctAnswer: answerCorrect,
    });
    console.log(errors, newQuestion);
  };

  return (
    <div>
      <Button
        backgroundColor={"#80deea"}
        marginLeft="1300px"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
      <form className="create-form" onSubmit={createQuestion}>
        <h2>Create Question</h2>
        <Input
          placeholder="Question text"
          onChange={(e) => setQuestion(e.target.value)}
        ></Input>
        <Input
          placeholder="Correct Answer"
          onChange={(e) => setAnswerCorrect(e.target.value)}
        ></Input>
        <Input
          placeholder="Wrong Answer"
          onChange={(e) => setAnswer1(e.target.value)}
        ></Input>
        <Input
          placeholder="Wrong Answer"
          onChange={(e) => setAnswer2(e.target.value)}
        ></Input>
        <Input
          placeholder="Wrong Answer"
          onChange={(e) => setAnswer3(e.target.value)}
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default withAuthenticator(CreateQuestion);
