import React, { useState, useContext } from "react";
import { Button, Card, CardContent, Typography, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import EmailContext from "./EmailContext";
import TSideBar from "./TSideBar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBPbigdbFxpvc9vISE2jvhJpu1r_RTxlqs"; // 🔥 Replace this with your Gemini API key

function QuestionPaperGen() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [generatedQuestions, setGeneratedQuestions] = useState("");
    const [folderName, setFolderName] = useState("");

    const { email } = useContext(EmailContext);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const currentDate = new Date();
            const newFile = {
                name: file.name,
                date: currentDate.toLocaleDateString(),
                time: currentDate.toLocaleTimeString(),
                type: file.type
            };

            setUploadedFiles([...uploadedFiles, newFile]);
            processFile(file);
        }
    };

    const processFile = async (file) => {
        try {
            // Convert file (PDF or Image) to Base64
            const base64String = await convertToBase64(file);
            sendToGemini(base64String, file.type);
        } catch (error) {
            console.error("Failed to process file", error);
            Swal.fire("Error", "Failed to process the file.", "error");
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

    const sendToGemini = async (base64String, mimeType) => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyBPbigdbFxpvc9vISE2jvhJpu1r_RTxlqs");
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

            const result = await model.generateContent([
                { inlineData: { data: base64String, mimeType } },
                prompt,
            ]);

            const response = await result.response;
            const text = response.text();
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

            try {
                const data = JSON.parse(cleanedText);
                setGeneratedQuestions(JSON.stringify(data, null, 2)); // Pretty-print JSON
            } catch (parseError) {
                console.error("Error parsing JSON response:", parseError);
                Swal.fire("Error", "Invalid response format from AI.", "error");
            }
        } catch (error) {
            console.error("Error generating questions", error);
            Swal.fire("Error", "Failed to generate questions. Try again later.", "error");
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
                        <TextField
                            id="outlined-basic"
                            label="Folder Name"
                            variant="outlined"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />

                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button component="label" style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}>
                                <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Add Files</Typography>
                                <AddIcon />
                                <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleUpload} style={{ display: "none" }} />
                            </Button>
                            <Button
                                onClick={() => {
                                    if (!folderName) {
                                        Swal.fire("Error", "Please enter a folder name before saving.", "error");
                                        return;
                                    }

                                    localStorage.setItem("folderName", folderName);
                                    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
                                    localStorage.setItem("generatedQuestions", generatedQuestions);

                                    Swal.fire("Success", "Files, folder name, and questions saved successfully!", "success");
                                }}
                                style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}
                            >           <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>save</Typography>
                                <AddIcon />
                            </Button>
                        </div>
                        {generatedQuestions && (
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
                        )}

                    </Grid>

                </div>
            </CardContent>
            <Button component="label" style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}>
                <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>save</Typography>
                <AddIcon />
            </Button>
        </div>
    );
}

export default QuestionPaperGen;
