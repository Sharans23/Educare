import React, { useState, useContext } from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import EmailContext from "./EmailContext";
import TSideBar from "./TSideBar";
import pdfToText from "react-pdftotext";
import axios from "axios";

function QuestionPaperGenerator() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [generatedQuestions, setGeneratedQuestions] = useState("");
    const { email } = useContext(EmailContext);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const currentDate = new Date();
            const newFile = {
                name: file.name,
                date: currentDate.toLocaleDateString(),
                time: currentDate.toLocaleTimeString()
            };

            setUploadedFiles([...uploadedFiles, newFile]);
            extractText(file);
        }
    };

    const extractText = (file) => {
        pdfToText(file)
            .then((text) => {
                console.log("Extracted text:", text);
                sendToGemini(text);
            })
            .catch((error) => console.error("Failed to extract text from PDF", error));
    };

    const sendToGemini = async (text, retries = 3, delay = 2000) => {
      try {
          const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key
          const response = await axios.post(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBPbigdbFxpvc9vISE2jvhJpu1r_RTxlqs`,
              {
                  contents: [
                      {
                          parts: [{ text: `Analyze this document and generate structured questions in JSON format:
                {
                    "questions": [
                        {
                            "question": "string",
                            "options": ["string", "string", "string", "string"],
                            "answer": "string"
                        }
                    ]
                }
                If the document is not relevant for question generation, return an empty object.\n${text}` }]
                      }
                  ]
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          );
  
          // Extract text response
          const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || "No response from AI.";
          setGeneratedQuestions(generatedText);
      } catch (error) {
          console.error("Error generating questions", error);
          if (error.response && error.response.status === 503 && retries > 0) {
              console.log(`Retrying... attempts left: ${retries}`);
              setTimeout(() => sendToGemini(text, retries - 1, delay * 2), delay);
          } else {
              Swal.fire("Error", "Failed to generate questions. Try again later.", "error");
          }
      }
  };
  

    return (
        <div style={{ overflowY: "auto", marginLeft: "-150px", marginTop: "-30px" }}>
            <CardContent style={{ padding: "0px" }}>
                <div style={{ display: "flex" }}>
                    <Card style={{ width: "20%", minHeight: "800px", overflowY: "auto", backgroundColor: "#1e1e1e", borderRadius: "15px", margin: "15px" }}>
                        <Grid item>
                            <TSideBar />
                        </Grid>
                    </Card>
                    <Grid item style={{ width: "78%", minHeight: "800px", overflowY: "auto", backgroundColor: "#F5F6FA" }}>
                        <Typography style={{ fontSize: "210%", fontWeight: 700, margin: "20px 30px 30px" }}>Question Paper Generator</Typography>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button component="label" style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}>
                                <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Add Papers</Typography>
                                <AddIcon />
                                <input type="file" accept="application/pdf" onChange={handleUpload} style={{ display: "none" }} />
                            </Button>
                        </div>
                        {generatedQuestions && (
                            <Card style={{ marginTop: "20px", padding: "15px" }}>
                                <Typography variant="h6">Generated Question Paper:</Typography>
                                <Typography>{generatedQuestions}</Typography>
                            </Card>
                        )}
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default QuestionPaperGenerator;
