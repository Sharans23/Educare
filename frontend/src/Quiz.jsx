import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import questionsAnswers from "./data.json";
import physics from "./images/1.png";
import chemistry from "./images/2.png";
import biology from "./images/3.png";
import SideBar from "./SSidebar"; // Ensure the correct filename

function Quiz() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]); // Separate state for quiz questions
  const [generateClicked, setGenerateClicked] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [answerStatus, setAnswerStatus] = useState({});

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = { name: file.name };
      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleGenerateQuiz = (subject) => {
    setGenerateClicked(true);
    const filteredQuestions = questionsAnswers.filter(
      (qa) => qa.subject === subject
    );
    setQuizQuestions(filteredQuestions);
  };

  const handleAnswerChange = (event, questionId) => {
    const { value } = event.target;
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
    checkAnswer(questionId, value);
  };

  const checkAnswer = (questionId, userAnswer) => {
    const correctAnswer = questionsAnswers.find(
      (qa) => qa.id === questionId
    )?.answer;
    setAnswerStatus((prev) => ({
      ...prev,
      [questionId]: userAnswer === correctAnswer ? "correct" : "incorrect",
    }));
  };

  return (
    <div
      style={{ overflowY: "auto" }}
    >
      <CardContent style={{ padding: "0px" }}>
        <div style={{ display: "flex" }}>
          <Card
            style={{
              width: "20%",
              minHeight: "100vh",
              overflowY: "auto",
              backgroundColor: "#1e1e1e",
              borderRadius: "15px",
              margin: "15px",
            }}
          >
            <Grid item>
              <SideBar />
            </Grid>
          </Card>
          <Grid
            item
            style={{
              width: "78%",
              minHeight: "800px",
              overflowY: "auto",
              backgroundColor: "#F5F6FA",
            }}
          >
            <Typography
              style={{
                fontSize: "210%",
                fontWeight: 700,
                margin: "20px 0 30px 30px",
                textAlign: "left",
              }}
            >
              Chapter Wise Quiz
            </Typography>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "105%",
                textAlign: "left",
                marginLeft: "45px",
                marginBottom: "20px",
              }}
            >
              Click on a subject to generate quiz:
            </Typography>
            <div style={{ display: "flex" }}>
              {[
                { subject: "physics", img: physics },
                { subject: "chemistry", img: chemistry },
                { subject: "biology", img: biology },
              ].map(({ subject, img }) => (
                <Button
                  key={subject}
                  onClick={() => handleGenerateQuiz(subject)}
                  style={{
                    backgroundColor: "#ffc700",
                    color: "#000",
                    marginLeft: "40px",
                    marginBottom: "25px",
                    padding: "8px",
                    width: "246.5px",
                  }}
                >
                  <img src={img} style={{ width: "230px" }} alt={subject} />
                </Button>
              ))}
            </div>

            {generateClicked &&
              quizQuestions.map((qa) => (
                <Card
                  key={qa.id}
                  style={{
                    marginBottom: "30px",
                    padding: "20px",
                    marginLeft: "40px",
                    marginRight: "40px",
                    borderRadius: "15px",
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "center",
                      fontWeight: 700,
                      marginBottom: "5px",
                    }}
                  >
                    Question
                  </Typography>
                  <Typography style={{ textAlign: "left" }}>
                    {qa.question}
                  </Typography>

                  <Typography
                    style={{
                      textAlign: "center",
                      marginBottom: "5px",
                      fontWeight: 700,
                      marginTop: "20px",
                    }}
                  >
                    Answer
                  </Typography>
                  <FormControl sx={{ mb: "10px" }}>
                    <Input
                      name={`answer_${qa.id}`} // Fixed syntax issue
                      type="text"
                      placeholder="Type your answer"
                      onChange={(event) => handleAnswerChange(event, qa.id)}
                      style={{
                        color:
                          answerStatus[qa.id] === "correct"
                            ? "green"
                            : answerStatus[qa.id] === "incorrect"
                            ? "red"
                            : "inherit",
                      }}
                    />
                  </FormControl>
                  {answerStatus[qa.id] === "correct" && (
                    <Typography style={{ color: "green" }}>Correct</Typography>
                  )}
                  {answerStatus[qa.id] === "incorrect" && (
                    <Typography style={{ color: "red" }}>Incorrect</Typography>
                  )}
                </Card>
              ))}
          </Grid>
        </div>
      </CardContent>
    </div>
  );
}

export default Quiz;
