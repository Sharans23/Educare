import React, { useState } from "react";
import {
    Button, Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";
import TSideBar from "./TSideBar";
import SideBar from "./SSideBar";

function StudentTeams() {
    const [open, setOpen] = useState(false);
    const [teamCode, setTeamCode] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");

    // Function to generate a random team code
    const generateTeamCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase(); // 8-character code
    };

    // Function to copy code to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(teamCode);
        Swal.fire({
            icon: "success",
            title: "Copied!",
            text: `Team Code: ${teamCode} copied to clipboard.`,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    // Function to handle final team creation
    const handleCreateTeam = () => {
        if (!teamName.trim() || !teamDescription.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Please fill in all fields before creating the team.",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Team Created!",
            text: `Team "${teamName}" has been successfully created with code: ${teamCode}`,
            timer: 2500,
            showConfirmButton: false,
        });

        // Reset Fields
        setTeamName("");
        setTeamDescription("");
        setTeamCode("");
        setShowCreateForm(false);
    };

    return (
        <div style={{ overflowY: "auto", marginLeft: "-150px", marginTop: "-30px" }}>
            <CardContent style={{ padding: "0px" }}>
                <div style={{ display: "flex" }}>
                    {/* Sidebar */}
                    <Card
                        style={{
                            width: "20%",
                            minHeight: "800px",
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

                    {/* Main Content */}
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
                                marginTop: "20px",
                                textAlign: "left",
                                marginLeft: "30px",
                                marginBottom: "30px",
                            }}
                        >
                            Teams
                        </Typography>

                        {/* Generate Team Code Button */}
                        <Button
                            name="banner"
                            component="label"
                            className="buttonText1"
                            style={{
                                backgroundColor: "#ffc700",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "40px",
                                marginBottom: "30px",
                                padding: "8px",
                                width: "250px",
                            }}
                            onClick={() => setOpen(true)}
                        >
                            <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>
                                Join Team using Code
                            </Typography>
                            <AddIcon />
                        </Button>

                        {/* Team Code Modal */}
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Join Team Using Code</DialogTitle>
                            <DialogContent>
                                <Typography style={{ marginBottom: "10px" }}>
                                   Enter the Code to Join team
                                </Typography>

                                {/* Team Code Field */}
                                <TextField
                                    fullWidth
                                    value={teamCode}
                                    placeholder="Click 'Join' to Join the team"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ marginBottom: "10px" }}
                                />

                                {/* Generate Team Code Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setTeamCode(generateTeamCode())}
                                    style={{ marginBottom: "10px" }}
                                >
                                    Join Team
                                </Button>

                                {/* Copy Button (only visible when code is generated) */}
                                {teamCode && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        startIcon={<ContentCopyIcon />}
                                        onClick={copyToClipboard}
                                    >
                                        Copy Code
                                    </Button>
                                )}
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="error">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Create Team Button */}
                        <Button
                            name="createTeam"
                            component="label"
                            className="buttonText1"
                            style={{
                                backgroundColor: "#ffc700",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "40px",
                                marginBottom: "30px",
                                padding: "8px",
                                width: "250px",
                            }}
                            onClick={() => {
                                setTeamCode(generateTeamCode()); // Generate team code when opening form
                                setShowCreateForm(true);
                            }}
                        >
                            <Typography style={{ fontWeight: 600, marginRight: "10px", fontSize: "105%" }}>
                                Create Team
                            </Typography>
                            <AddIcon />
                        </Button>

                        {/* Team Creation Form (Shown After Clicking "Create Team") */}
                        {showCreateForm && (
                            <Card
                                style={{
                                    margin: "20px 40px",
                                    padding: "20px",
                                    borderRadius: "5px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                                    Enter Team Details
                                </Typography>

                                {/* Team Name Field */}
                                <TextField
                                    label="Team Name"
                                    variant="outlined"
                                    fullWidth
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    style={{ marginBottom: "15px" }}
                                />

                                {/* Team Description Field */}
                                <TextField
                                    label="Team Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={teamDescription}
                                    onChange={(e) => setTeamDescription(e.target.value)}
                                    style={{ marginBottom: "15px" }}
                                />

                                {/* Unique Team Code Field */}
                                <TextField
                                    label="Team Code"
                                    variant="outlined"
                                    fullWidth
                                    
                                    style={{ marginBottom: "15px" }}
                                />

                                {/* Final Create Team Button */}
                            
                            </Card>
                        )}
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default StudentTeams;
