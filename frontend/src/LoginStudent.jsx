
import React from "react";
import { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import logo from "./images/educare.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UsernameContext from './UsernameContext';
import login from "./images/login.png";


function LoginStudent() {

    const [password, setPassword] = useState('');
    const [sapid, setSapid] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            sapid: Number(sapid),
            password: password
        };

        try {
            const response = await axios.post("http://localhost:5000/student/login", loginData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Login Successful:", response.data);

            // Store token in localStorage
            localStorage.setItem("token", response.data.token);

            // Show success message
            alert("Login Successful!");

            // Redirect to teacher dashboard
            navigate("/student-dashboard");

        } catch (error) {
            console.error("Login Failed:", error.response ? error.response.data : error.message);
            alert("Login Failed. Please try again.");
        }
    };
    

    return (
        <ThemeProvider theme={fontcolorTheme}>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto', marginLeft:'-150px', marginTop:'-30px'}}>
            {/* Left Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', height: 'auto', bgcolor: '#1e1e1e', borderRadius:'15px', margin:'12px'  }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '97vh', overflow: 'hidden' }}>
                    <img src={login}  style={{ maxWidth: '70%', maxHeight: '100%', objectFit: 'contain' }} alt="Sewing Machine" />
                </Container>
            </Container>

            {/* Right Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%',minHeight:'710px', height: 'auto', bgcolor: 'white' }}>
                <Box sx={{ width: '100%', mx: 'auto', my: 4, py: 3, px: 2, gap: 2, boxShadow: 'md', bgcolor: 'white', borderRadius: '16px' }} variant="outlined">
                    <div sx={{ mb: '10px' }}>
                        <img src={logo} style={{ width: '220px', marginBottom: '30px' }} alt="Logo" />
                        <Typography component="h1" style={{ fontSize: '170%',textAlign:'center',marginBottom:'20px' }}>Login</Typography>
                    </div>

                          
                            <Grid container spacing={2} style={{width:'100%'}}>
                        {/* First Column */}
                        <Grid item xs={12} style={{marginRight:'50px'}}>
                        <FormControl sx={{ mb:'20px' }}>
                            <FormLabel sx={{ textAlign: "left" }}>SapID</FormLabel>
                                <Input
                                    name="sapid"
                                    type="text"
                                    placeholder="Enter your sapid"
                                    o  onChange={(e) => setSapid(e.target.value)}
                                    sx={{ backgroundColor: '#f0f0f0', width: '130%' , padding:'5px'}}
                                />
                            </FormControl>

                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={12} style={{marginRight:'50px'}}>
                        <FormControl sx={{ mb:'10px' }} >
                            <FormLabel sx={{ textAlign: "left" }}>Passsword</FormLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ backgroundColor: '#f0f0f0', width: '130%' , padding:'5px'}}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                            <Link href="/studentDashboard">
                            <Button onClick={handleLogin}  sx={{ mt: 3, backgroundColor:'#ffc700', color:'#000', padding:'10px',paddingLeft:'30px',paddingRight:'30px',mb: 3}}>Login</Button>
                            </Link>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Don't have an account?
                                <Link to="/signupStudent" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Sign Up</Link>
                            </Typography>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Go back to Home Page
                                <Link to="/" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Home</Link>
                            </Typography>
                            </Box>
            </Container>
        </Box>
    </ThemeProvider>
    );
};

export default LoginStudent;