import React, { useState, useContext } from "react";
import {
    Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import EmailContext from "./EmailContext";
import TSideBar from "./TSideBar";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // For generating unique assignment IDs

function CreateAssgn() {
    const [assignments, setAssignments] = useState([]);
    const [open, setOpen] = useState(false);
    const [assignmentName, setAssignmentName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [documentId, setDocumentId] = useState("");
    const [deadline, setDeadline] = useState("");
    const { email } = useContext(EmailContext);

    // Handle file upload
    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("pdf", file);

                const response = await axios.post(`http://localhost:5000/teacher/uploadDoc/${email}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                setDocumentId(response.data.documentId);
                Swal.fire({ text: "File Uploaded", icon: "success" });
            } catch (error) {
                console.error("Error uploading file:", error);
                Swal.fire({ text: "Failed to upload file", icon: "error" });
            }
        }
    };

    // Handle assignment creation
    const handleCreateAssignment = async () => {
        if (!assignmentName.trim() || !deadline.trim()) {
            Swal.fire({ text: "Assignment Name and Deadline are required", icon: "error" });
            return;
        }

        const newAssignment = {
            id: uuidv4(), // Generate unique ID
            name: assignmentName,
            remarks: remarks || "",
            documents: documentId || "",
            deadline: deadline
        };

        try {
            await axios.post(`http://localhost:5000/teacher/createAssignment/${email}`, newAssignment);
            setAssignments([...assignments, newAssignment]);

            Swal.fire({ text: "Assignment Created!", icon: "success" });

            // Reset fields
            setAssignmentName("");
            setRemarks("");
            setDocumentId("");
            setDeadline("");
            setOpen(false);
        } catch (error) {
            console.error("Error creating assignment:", error);
            Swal.fire({ text: "Failed to create assignment", icon: "error" });
        }
    };

    return (
        <div style={{ overflowY: "auto", marginLeft: "-150px", marginTop: "-30px" }}>
            <CardContent style={{ padding: "0px" }}>
                <div style={{ display: "flex" }}>
                    {/* Sidebar */}
                    <Card style={{ width: "20%", minHeight: "800px", backgroundColor: "#1e1e1e", borderRadius: "15px", margin: "15px" }}>
                        <Grid item>
                            <TSideBar />
                        </Grid>
                    </Card>

                    {/* Main Content */}
                    <Grid item style={{ width: "78%", minHeight: "800px", backgroundColor: "#F5F6FA" }}>
                        <Typography style={{ fontSize: "210%", fontWeight: 700, marginTop: "20px", marginLeft: "30px", marginBottom: "30px" , textAlign:'left'}}>
                            Add Assignment
                        </Typography>

                        {/* Add Assignment Button */}
                        <Button
                            className="buttonText1"
                            style={{ backgroundColor: "#ffc700", color: "#000", display: "flex", marginLeft: "40px", marginBottom: "30px", padding: "8px", width: "200px" }}
                            onClick={() => setOpen(true)}
                        >
                            <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Create Assignment</Typography>
                            <AddIcon />
                        </Button>

                        {/* Assignment Creation Dialog */}
                        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                            <DialogTitle>Create Assignment</DialogTitle>
                            <DialogContent>
                                {/* Assignment Name Field */}
                                <TextField
                                    label="Assignment Name"
                                    fullWidth
                                    value={assignmentName}
                                    onChange={(e) => setAssignmentName(e.target.value)}
                                    style={{ marginBottom: "15px" }}
                                />

                                {/* Remarks Field */}
                                <TextField
                                    label="Remarks (Optional)"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    style={{ marginBottom: "15px" }}
                                />

                                {/* File Upload */}
                                <input
                                    type="file"
                                    onChange={handleUpload}
                                    accept="application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    style={{ display: "none" }}
                                    id="upload-file"
                                />
                                <label htmlFor="upload-file">
                                    <Button component="span" variant="contained" color="primary" fullWidth style={{ marginBottom: "15px" }}>
                                        Upload Document
                                    </Button>
                                </label>

                                {/* Deadline Picker */}
                                <TextField
                                    label="Deadline"
                                    type="datetime-local"
                                    fullWidth
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginBottom: "15px" }}
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button variant="contained" color="primary">Create</Button>
                            </DialogActions>
                        </Dialog>

                        {/* Assignments Table */}
                        <Typography style={{ textAlign: "left", marginLeft: "50px", marginBottom: "5px", fontWeight: 500 }}>Assignments</Typography>
                        <Card style={{ marginBottom: "30px", padding: "20px", marginLeft: "40px", marginRight: "40px", borderRadius: "5px" }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Assignment ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Remarks</TableCell>
                                            <TableCell>Document ID</TableCell>
                                            <TableCell>Deadline</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignments.map((assignment, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{assignment.id}</TableCell>
                                                <TableCell>{assignment.name}</TableCell>
                                                <TableCell>{assignment.remarks || "N/A"}</TableCell>
                                                <TableCell>{assignment.documents || "None"}</TableCell>
                                                <TableCell>{new Date(assignment.deadline).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default CreateAssgn;
