import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import TSideBar from "./TSideBar";
import { useNavigate } from "react-router-dom";

const FolderCard = ({ name, onClick }) => (
  <Card 
    onClick={onClick} 
    style={{
      backgroundColor: "#6D7F9A", color: "#fff", textAlign: "center",
      padding: "20px", borderRadius: "10px", cursor: "pointer"
    }}>
    <Typography variant="h6">{name}</Typography>
  </Card>
);

function QuestionPaperGenerator() {
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    const storedFolder = localStorage.getItem("folderName");
    const storedFiles = localStorage.getItem("uploadedFiles");
    const storedQuestions = localStorage.getItem("generatedQuestions");

    if (storedFolder) setFolderName(storedFolder);
    if (storedFiles) setUploadedFiles(JSON.parse(storedFiles));
    if (storedQuestions) setGeneratedQuestions(storedQuestions);
  }, []);

  return (
    <div style={{ overflowY: "auto", marginLeft: "-150px", marginTop: "-30px" }}>
      
      <CardContent style={{ padding: "0px" }}>
        <div style={{ display: "flex" }}>
          <Card style={{ width: "20%", minHeight: "800px", backgroundColor: "#1e1e1e", borderRadius: "15px", margin: "15px" }}>
            <Grid item>
              <TSideBar />
            </Grid>
          </Card>

          <Grid item style={{ width: "78%", minHeight: "800px", backgroundColor: "#F5F6FA" }}>
            <Typography style={{ fontSize: "210%", fontWeight: 700, margin: "20px 30px 30px" }}>Question Paper Generator</Typography>
            <Button 
    style={{ backgroundColor: "#ffc700", color: "#000", padding: "8px", width: "170px" }}
    onClick={() => navigate("/QuestionPaperGen2")}
>
    <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Add Papers</Typography>
    <AddIcon />
</Button>

            {!selectedFolder ? (
              <Grid container spacing={2}>
                {folderName && (
                  <Grid item xs={6} sm={4} md={3}>
                    <FolderCard name={folderName} onClick={() => setSelectedFolder(folderName)} />
                  </Grid>
                )}
              </Grid>
            ) : (
              <Card style={{ padding: "20px", margin: "20px" }}>
                <Button onClick={() => setSelectedFolder(null)} style={{ backgroundColor: "#ffc700", color: "#000", marginBottom: "10px" }}>Back</Button>

                <Typography variant="h6">Uploaded Files:</Typography>
                {uploadedFiles.length > 0 ? (
                  uploadedFiles.map((file, index) => (
                    <Typography key={index}>📄 {file.name}</Typography>
                  ))
                ) : (
                  <Typography>No files uploaded.</Typography>
                )}

                <Typography variant="h6" style={{ marginTop: "20px" }}>Generated Questions:</Typography>
                {generatedQuestions ? (
                  <pre style={{ backgroundColor: "#eee", padding: "10px", borderRadius: "5px", overflowX: "auto" }}>
                    {generatedQuestions}
                  </pre>
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
