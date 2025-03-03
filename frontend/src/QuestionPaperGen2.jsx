import React, { useState, useContext } from "react";
import { Button, Card, CardContent, Typography, Grid, TextField, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import EmailContext from "./EmailContext";
import TSideBar from "./TSideBar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gemini_api } from '../secrets.js';
import { useNavigate } from "react-router-dom";

const API_KEY = gemini_api;

function QuestionPaperGen() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [generatedQuestions, setGeneratedQuestions] = useState("");
    const [folderName, setFolderName] = useState("");
    const [loading, setLoading] = useState(false);


    const { email } = useContext(EmailContext);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        setLoading(true); // Start loading
    
        const questionGenerationId = localStorage.getItem("questionGenerationId");
        if (!questionGenerationId) {
            Swal.fire("Error", "No questionGenerationId found in local storage.", "error");
            setLoading(false);
            return;
        }
    
        const formData = new FormData();
        formData.append("documents", file);
        formData.append("questionGenerationId", questionGenerationId);
    
        try {
            const response = await fetch(
              "https://educare-nbpr.onrender.com/document/upload",
              {
                method: "POST",
                body: formData,
              }
            );
    
            const result = await response.json();
    
            if (response.ok) {
                const uploadedFile = {
                    name: file.name,
                    file,
                    url: result.documents[0].document,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    type: file.type,
                };
    
                setUploadedFiles([...uploadedFiles, uploadedFile]);
    
                Swal.fire("Success", "File uploaded successfully!", "success");
            } else {
                throw new Error(result.message || "Failed to upload file.");
            }
        } catch (error) {
            console.error("File upload error:", error);
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    const generateQuestionPaper = async () => {
        if (uploadedFiles.length === 0) {
            Swal.fire("Error", "No files uploaded. Please upload a file first.", "error");
            return;
        }
    
        setLoading(true); // Start loading
    
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
            const prompt = `
                Analyze this document/image and generate structured questions in JSON format:
                {
                    "questions": [
                        {
                            "question": "string",
                            "options": ["string", "string", "string", "string"],
                            "answer": "string"
                        }
                    ]
                }
                If the document or image is not relevant for question generation, return an empty object.
            `;
    
            let allQuestions = [];
    
            for (const fileData of uploadedFiles) {
                const base64String = await convertToBase64(fileData.file);
    
                const result = await model.generateContent([
                    { inlineData: { data: base64String, mimeType: fileData.type } },
                    prompt,
                ]);
    
                const response = await result.response;
                const text = response.text();
                const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    
                try {
                    const data = JSON.parse(cleanedText);
                    if (data.questions) {
                        allQuestions = [...allQuestions, ...data.questions];
                    }
                } catch (parseError) {
                    console.error("Error parsing JSON response:", parseError);
                    Swal.fire("Error", "Invalid response format from AI.", "error");
                    return;
                }
            }
    
            setGeneratedQuestions(JSON.stringify({ questions: allQuestions }, null, 2));
    
            Swal.fire("Success", "Question paper generated successfully!", "success");
        } catch (error) {
            console.error("Error generating questions", error);
            Swal.fire("Error", "Failed to generate questions. Try again later.", "error");
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; // Remove prefix
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div style={{ overflowY: "auto" }}>
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
                                <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Add Files</Typography>
                                <AddIcon />
                                <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleUpload} style={{ display: "none" }} />
                            </Button>
                            <Button onClick={generateQuestionPaper} style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}>
                                <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Generate QP</Typography>
                                <AddIcon />
                            </Button>
                            <Button
    onClick={async () => {
       

        try {
            const questionGenerationId = localStorage.getItem("questionGenerationId");
            if (!questionGenerationId) {
                Swal.fire("Error", "No questionGenerationId found in local storage.", "error");
                return;
            }

            const response = await fetch(`http://localhost:5000/questionGeneration/output/${questionGenerationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ output: generatedQuestions }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire("Success", "Files, folder name, and questions saved successfully!", "success");
                navigate("/QuestionPaperGenerator")
            } else {
                throw new Error(result.message || "Failed to save generated questions.");
            }
        } catch (error) {
            console.error("Error saving generated questions:", error);
            Swal.fire("Error", error.message, "error");
        }
    }}
    style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}
>
    <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Save</Typography>
    <AddIcon />
</Button>

                        </div>
                        {loading && <CircularProgress style={{ display: "block", margin: "20px auto" }} />}

                        {generatedQuestions ? (
                                          <Card style={{ marginTop: "20px", padding: "15px" }}>
                                            <Typography variant="h6" style={{ marginBottom: "10px" }}>
                                              Generated Question Paper:
                                            </Typography>
                                            {(() => {
                                              try {
                                                const data = JSON.parse(generatedQuestions);
                                                if (!data.questions || data.questions.length === 0) {
                                                  return <Typography>No valid questions generated.</Typography>;
                                                }
                                                return data.questions.map((q, index) => (
                                                  <div key={index} style={{ marginBottom: "15px", padding: "10px", borderBottom: "1px solid #ddd" }}>
                                                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                                      {index + 1}. {q.question}
                                                    </Typography>
                                                    <ul style={{ paddingLeft: "20px" }}>
                                                      {q.options.map((option, idx) => (
                                                        <li key={idx} style={{ listStyleType: "none" }}>
                                                          <Typography
                                                            style={{
                                                              backgroundColor: option === q.answer ? "#d4edda" : "transparent",
                                                              padding: "5px",
                                                              borderRadius: "5px",
                                                            }}
                                                          >
                                                            {option}
                                                          </Typography>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                ));
                                              } catch (error) {
                                                console.error("Error parsing questions:", error);
                                                return <Typography>Error displaying questions.</Typography>;
                                              }
                                            })()}
                                          </Card>
                                        ) : (
                                          <Typography style={{paddingTop:'40px',
                                            textAlign:'center'
                                          }}>No questions generated.</Typography>
                                        )}
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default QuestionPaperGen;
