import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/educare.png";
import login from "./images/login.png";
import axios from "axios";

function LoginTeacher() {
    const [password, setPassword] = useState('');
    const [sapid, setSapid] = useState('');
    const navigate = useNavigate();
    const VITE_API_URL=import.meta.env.VITE_API_URL

    const handleLogin = async (event) => {
        event.preventDefault();

        const signInData = {
            sapid: Number(sapid),
            password: password
        };

        try {
            const response = await axios.post(`${VITE_API_URL}/teacher/login`, signInData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Signin Successful:", response.data);

            // Store token in localStorage
            localStorage.setItem("token", response.data.token);

            // Show success message
            alert("Signin Successful!");

            // Redirect to teacher dashboard
            navigate("/teacherDashboard");

        } catch (error) {
            console.error("Signin Failed:", error.response ? error.response.data : error.message);
            alert("Signin Failed. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={fontcolorTheme}>
            <div >
                <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>
                    {/* Left Container */}
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40%',
                        height: 'auto',
                        bgcolor: '#1e1e1e',
                        borderRadius: '15px',
                        margin: '12px'
                    }}>
                        <Container sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}>
                            <img src={login} style={{ maxWidth: '70%', maxHeight: '100%', objectFit: 'contain' }} alt="Sewing Machine" />
                        </Container>
                    </Container>

                    {/* Right Container */}
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        minHeight: '710px',
                        height: 'auto',
                        bgcolor: 'white'
                    }}>
                        <Box sx={{
                            width: '100%',
                            mx: 'auto',
                            my: 4,
                            py: 3,
                            px: 2,
                            gap: 2,
                            boxShadow: 'md',
                            bgcolor: 'white',
                            borderRadius: '16px'
                        }} variant="outlined">
                            <div sx={{ mb: '10px', display:"flex", justifyContent:"center" }}>
                                <img src={logo} style={{display:"flex", justifyContent:"center", width: '220px', marginBottom: '30px', marginLeft:'290px' }} alt="Logo" />
                                <Typography component="h1" style={{ fontSize: '170%', textAlign: 'center', marginBottom: '20px' }}>Login</Typography>
                            </div>

                            <Grid container spacing={2} style={{ width: '100%' }} display="flex" justifyContent="center">
                                <Grid item xs={12} style={{ marginRight: '50px' }} display="flex" justifyContent="center" >
                                    <FormControl sx={{ mb: '20px' }}>
                                        <Typography sx={{ textAlign: "left" }}>SapID</Typography>
                                        <TextField
                                            name="sapid"
                                            type="text"
                                            placeholder="Enter your sapid"
                                            onChange={(e) => setSapid(e.target.value)}
                                            sx={{ width: '130%', padding: '5px' }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} style={{ marginRight: '50px' }} display="flex" justifyContent="center">
                                    <FormControl sx={{ mb: '10px' }}>
                                        <Typography sx={{ textAlign: "left" }}>Password</Typography>
                                        <TextField
                                            name="password"
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            sx={{ width: '130%', padding: '5px' }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container display="flex" justifyContent="center" >
                                <Grid display="flex" justifyContent="center"> 
                                    <Button onClick={handleLogin} sx={{ mt: 3, backgroundColor: '#ffc700', color: '#000', padding: '10px', paddingLeft: '30px', paddingRight: '30px', mb: 3, display: 'flex', justifyContent: 'center' }}>
                                Login
                            </Button>
                            </Grid>
                            </Grid>

                            <Typography fontSize="body2" sx={{ textAlign: 'center' }}>
                                Don't have an account?
                                <Link to="/signupTeacher" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Sign Up</Link>
                            </Typography>
                            <Typography fontSize="body2" sx={{ textAlign: 'center' }}>
                                Go back to Home Page
                                <Link to="/" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Home</Link>
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default LoginTeacher;
