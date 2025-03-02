import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import TSideBar from "./TSideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FolderIcon from '@mui/icons-material/Folder';
import { IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FolderCard = ({ name, onClick }) => (
  <Card
    onClick={onClick}
    style={{
      margin: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      color: "#000",
      textAlign: "center",
      padding: "20px",
      borderRadius: "10px",
      cursor: "pointer",
      width: "200px",
      height: "200px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <FolderIcon style={{ fontSize: 50, color: "#fbbc04" }} />
    <Typography variant="body1" style={{ marginTop: "10px", fontWeight: 600 }}>
      {name}
    </Typography>
  </Card>
);

function QuestionPaperGenerator() {
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const [questionPapers, setQuestionPapers] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Fetch question papers on mount
  useEffect(() => {
    fetchQuestionPapers();
  }, []);

  const fetchQuestionPapers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/questionGeneration/teacher", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setQuestionPapers(response.data || []);
    } catch (error) {
      console.error("Error fetching question papers:", error);
    }
  };

  const handleCreateQuestionGeneration = async () => {
    if (!folderName) {
      Swal.fire("Error", "Folder name is required.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/questionGeneration/create",
        { name: folderName },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log("API Response:", response.data); // Debugging

      const questionGenerationId = response.data?.questionGeneration?.id;

      if (questionGenerationId) {
        localStorage.setItem("questionGenerationId", questionGenerationId);
        Swal.fire("Success", "Question paper created successfully!", "success");

        fetchQuestionPapers(); // Refresh list
        navigate("/QuestionPaperGen2");
      } else {
        Swal.fire("Error", "Invalid response data.", "error");
      }
    } catch (error) {
      console.error("Error creating question paper:", error);
      Swal.fire("Error", "Failed to create question paper.", "error");
    }
  };


  return (
    <div style={{ overflowY: "auto", }}>
      <CardContent style={{ padding: "0px" }}>
        <div style={{ display: "flex" }}>
          {/* Sidebar */}
          <Card style={{ width: "20%", minHeight: "800px", backgroundColor: "#1e1e1e", borderRadius: "15px", margin: "15px" }}>
            <TSideBar />
          </Card>

          {/* Main Content */}
          <Grid item style={{ width: "78%", minHeight: "800px", backgroundColor: "#F5F6FA"}}>
            <Typography style={{ fontSize: "210%", fontWeight: 700, margin: "20px 30px 30px" }}>Question Paper Generator</Typography>

<div style={{ paddingLeft:'30px'}}>
            {/* Folder Name Input */}
            <TextField
              sx={{ marginRight: "30px" }}
              id="outlined-basic"
              label="Folder Name"
              variant="outlined"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />

            {/* Create Question Paper Button */}
            <Button
              style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}
              onClick={handleCreateQuestionGeneration}
            >
              <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Create</Typography>
              <AddIcon />
            </Button>
            </div>
            {/* Display Question Paper Sets */}
            {!selectedFolder ? (
              <Grid container spacing={2}>
                {questionPapers.map((qp) => (
                  <Grid item xs={6} sm={4} md={3} key={qp.id}>
                    <FolderCard name={qp.name} onClick={() => setSelectedFolder(qp)} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card style={{ padding: "20px", margin: "20px" }}>
                <Button onClick={() => setSelectedFolder(null)} style={{ backgroundColor: "#ffc700", color: "#000", marginBottom: "10px" }}>Back</Button>

                {/* Display Uploaded Documents */}
                <Typography variant="h6">Uploaded Files:</Typography>
                {selectedFolder.documents.length > 0 ? (
                  <Grid container style={{ display: "flex", justifyContent: "space-around" }} spacing={2} >
                    {selectedFolder.documents.map((doc) => (
                      <Grid item key={doc.id}>
                        <IconButton
                          component="a"
                          href={doc.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: "#ffc700" }}
                        >
                          <InsertDriveFileIcon fontSize="large" />
                        </IconButton>
                        <Typography variant="body2" align="center">
                          {doc.document.split("/").pop()} {/* Extracts filename */}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography>No files uploaded.</Typography>
                )}

                {/* Display Generated Questions */}

                {selectedFolder.output ? (
                  <Card style={{ marginTop: "20px", padding: "15px" }}>
                    <Typography variant="h6" style={{ marginBottom: "10px" }}>
                      Generated Question Paper:
                    </Typography>
                    {(() => {
                      try {
                        const data = JSON.parse(selectedFolder.output);
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
                        return <Typography>Error displaying questions.</Typography>;
                      }
                    })()}
                  </Card>
                ) : (
                  <Typography>No questions generated.</Typography>
                )}
              </Card>
            )}
          </Grid>
        </div>
      </CardContent>
    </div>
  );
}

export default QuestionPaperGenerator;
