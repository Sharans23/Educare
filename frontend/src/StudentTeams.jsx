import React, { useState, useEffect } from "react";
import {
    Button, Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import SideBar from "./SSidebar";
import { render_url } from "../secrets";

function StudentTeams() {
    const [open, setOpen] = useState(false);
    const [teamCode, setTeamCode] = useState("");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleJoinTeam = async () => {
        if (!teamCode.trim()) {
            setError("Team code is required");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire("Error", "No authentication token found", "error");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://educare-nbpr.onrender.com/team/join", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: teamCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to join the team");
            }

            Swal.fire("Success", "Successfully joined the team!", "success");
            setOpen(false);
            setTeamCode("");
            fetchTeams(); // Refresh team list
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch teams from API
    const fetchTeams = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`${render_url}/team/student`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to fetch teams");

            const data = await response.json();
            setTeams(data.teams || []);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div style={{ overflowY: "auto"}}>
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

                        {/* Join Team Button */}
                        <Button
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

                        {/* Team Code Dialog */}
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Join Team Using Code</DialogTitle>
                            <DialogContent>
                                <Typography style={{ marginBottom: "10px" }}>
                                    Enter the Code to Join the team
                                </Typography>

                                <TextField
                                    fullWidth
                                    value={teamCode}
                                    placeholder="Enter team code"
                                    onChange={(e) => setTeamCode(e.target.value)}
                                    error={!!error}
                                    helperText={error}
                                    style={{ marginBottom: "10px" }}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleJoinTeam}
                                    disabled={loading}
                                    style={{ marginBottom: "10px" }}
                                >
                                    {loading ? "Joining..." : "Join Team"}
                                </Button>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="error">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Teams List */}
                        {loading ? (
                            <Typography style={{ textAlign: "center", marginTop: "20px" }}>Loading...</Typography>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ml-10">
                                {teams.length > 0 ? (
                                    teams.map((team) => (
                                        <div key={team.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                            <div className="px-4 py-4 sm:px-4">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                    {team.name}
                                                </h3>
                                            </div>
                                            <div className="border-t border-gray-200 px-4 py-4 sm:px-4">
                                                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Team Code</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{team.code}</dd>
                                                    </div>
                                                    {/* <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Members</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{(team && team.students.length) || 0}</dd>
                                                    </div> */}
                                                </dl>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-4 sm:px-4">
                                                <button
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md cursor-pointer"
                                                    onClick={() => Swal.fire("Team Details", `Name: ${team.name}\nCode: ${team.code}\nDescription: ${team.desc}`, "info")}
                                                >
                                                    View Team
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Typography style={{ textAlign: "center", marginTop: "20px" }}>
                                        No teams found.
                                    </Typography>
                                )}
                            </div>
                        )}
                    </Grid>
                </div>
            </CardContent>
        </div>
    );
}

export default StudentTeams;
