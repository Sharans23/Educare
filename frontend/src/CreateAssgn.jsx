import React, { useState, useContext, useEffect } from "react";
import {
    Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import EmailContext from "./EmailContext";
import { useNavigate } from "react-router-dom";
import { render_url } from "../secrets";

function CreateAssgn({ idTeam }) {
    console.log(idTeam);
    const [assignments, setAssignments] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentName, setAssignmentName] = useState("");
    const [remarks, setRemarks] = useState("");
    const [deadline, setDeadline] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const { email } = useContext(EmailContext);
    const navigate = useNavigate();
    const handleCreateAssignment = async () => {
        if (!assignmentName.trim() || !deadline.trim()) {
            Swal.fire({ text: "Assignment Name and Deadline are required", icon: "error" });
            return;
        }
    
        const newAssignment = {
            name: assignmentName,
            desc: remarks || "",
            deadline: new Date(deadline).toISOString(),
            teamId: idTeam // Ensure this value is passed correctly as a prop
        };
    
        // Fetch token from localStorage
        const token = localStorage.getItem("token");
    
        if (!token) {
            Swal.fire({ text: "User is not authenticated", icon: "error" });
            return;
        }
    
        try {
            const response = await fetch("https://educare-nbpr.onrender.com/assignment/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Attach the token
                },
                body: JSON.stringify(newAssignment),
              }
            );
    
            const data = await response.json();
    
            if (response.ok) {
                setAssignments([...assignments, data.assignment]);
                Swal.fire({ text: "Assignment Created Successfully!", icon: "success" });
            } else {
                Swal.fire({ text: data.message || "Failed to create assignment", icon: "error" });
            }
        } catch (error) {
            Swal.fire({ text: "Error connecting to the server", icon: "error" });
            console.error("Error creating assignment:", error);
        }
    
        setOpen(false);
        setAssignmentName("");
        setRemarks("");
        setDeadline("");
    };
    

    useEffect(() => {
        if (!idTeam) return;


        const fetchAssignments = async () => {
            try {
                const response = await fetch(`https://educare-nbpr.onrender.com/assignment/team/${idTeam}`);
                const data = await response.json();
                if (response.ok) {
                    setAssignments(data);
                } else {
                    Swal.fire({ text: "Failed to fetch assignments", icon: "error" });
                }
            } catch (error) {
                Swal.fire({ text: "Error connecting to the server", icon: "error" });
                console.error("Error fetching assignments:", error);
            }
        };

        fetchAssignments();
    }, [idTeam]);

    const fetchSubmissions = async (assignmentId) => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
        if (!token) {
            Swal.fire({ text: "User not authenticated", icon: "error" });
            return;
        }
    
        try {
            const response = await fetch(`${render_url}/submission/assignment/${assignmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token in the request
                }
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                setSubmissions(data);
            } else {
                Swal.fire({ text: "Failed to fetch submissions", icon: "error" });
            }
        } catch (error) {
            Swal.fire({ text: "Error connecting to the server", icon: "error" });
            console.error("Error fetching submissions:", error);
        }
    };
    

    const handleSelectAssignment = (assignment) => {
        console.log(assignment)
        setSelectedAssignment(assignment);
        fetchSubmissions(assignment.id);
    };

    return (
        <div style={{ overflowY: "auto", marginTop: "-30px", marginLeft: '0%' }}>
            <CardContent style={{ padding: "0px" }}>
                <div style={{ display: "flex" }}>
                    <Grid item style={{ width: "78%", minHeight: "800px", backgroundColor: "#F5F6FA", marginTop: "40px" }}>
                        {selectedAssignment ? (
                            <>
                                <Typography style={{ fontSize: "150%", fontWeight: 700, marginLeft: "30px", marginBottom: "30px", textAlign: 'left' }}>
                                    Assignment Details
                                </Typography>
                                <Card style={{ margin: "20px", padding: "20px", borderRadius: "5px" }}>
                                    <Typography><strong>ID:</strong> {selectedAssignment.id}</Typography>
                                    <Typography><strong>Name:</strong> {selectedAssignment.name}</Typography>
                                    <Typography><strong>Remarks:</strong> {selectedAssignment.remarks}</Typography>
                                    <Typography><strong>Document:</strong> {selectedAssignment.documents}</Typography>
                                    <Typography><strong>Deadline:</strong> {new Date(selectedAssignment.deadline).toLocaleString()}</Typography>
                                </Card>
                                <Typography style={{ textAlign: "left", marginLeft: "30px", marginBottom: "5px", fontWeight: 500 }}>Student Submissions</Typography>
                                <Card style={{ marginBottom: "30px", padding: "20px", marginLeft: "30px", marginRight: "30px", borderRadius: "5px" }}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Student Name</TableCell>
                                                    <TableCell>Description</TableCell>
                                                    <TableCell>Marks</TableCell>
                                                    <TableCell>Remarks</TableCell>
                                                    <TableCell>Submission Time</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {submissions.map((submission) => (
                                                    <TableRow key={submission.id}>
                                                        <TableCell>{submission.student.username}</TableCell>
                                                        <TableCell>{submission.desc}</TableCell>
                                                        <TableCell>{submission.marks}</TableCell>
                                                        <TableCell>{submission.remarks}</TableCell>
                                                        <TableCell>{new Date(submission.createdAt).toLocaleString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                                <Button variant="contained" color="primary" onClick={() => setSelectedAssignment(null)} style={{ marginLeft: "30px" }}>Back</Button>
                            </>
                        ) : (
                            <>
                                <Typography style={{ fontSize: "150%", fontWeight: 700, marginLeft: "30px", marginBottom: "30px", textAlign:'left' }}>
                                    Add Assignment
                                </Typography>
                                <div style={{display:'flex'}}>
                                <Button
                                    style={{ backgroundColor: "#ffc700", color: "#000", display: "flex", marginLeft: "40px", marginBottom: "30px", padding: "8px", width: "200px" }}
                                    onClick={() => setOpen(true)}
                                >
                                    <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>Create Assignment</Typography>
                                    <AddIcon />
                                </Button>

                               
                               </div>
                                <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                                    <DialogTitle>Create Assignment</DialogTitle>
                                    <DialogContent>
                                        <TextField label="Assignment Name" fullWidth value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} style={{ marginBottom: "15px" }} />
                                        <TextField label="Remarks (Optional)" fullWidth multiline rows={2} value={remarks} onChange={(e) => setRemarks(e.target.value)} style={{ marginBottom: "15px" }} />
                                        <TextField label="Deadline" type="datetime-local" fullWidth value={deadline} onChange={(e) => setDeadline(e.target.value)} InputLabelProps={{ shrink: true }} style={{ marginBottom: "15px" }} />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                                        <Button variant="contained" color="primary" onClick={handleCreateAssignment}>Create</Button>
                                    </DialogActions>
                                </Dialog>
                                <Typography style={{ textAlign: "left", marginLeft: "50px", marginBottom: "5px", fontWeight: 500 }}>Assignments</Typography>
                                <Card style={{ marginBottom: "30px", padding: "20px", marginLeft: "40px", marginRight: "40px", borderRadius: "5px" }}>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                {assignments.map((assignment, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{assignment.id}</TableCell>
                                                        <TableCell>{assignment.name}</TableCell>
                                                        <TableCell><Button variant="contained" color="secondary" onClick={() => setSelectedAssignment(assignment)}>Open Assgn</Button></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </>
                        )}
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default CreateAssgn;
