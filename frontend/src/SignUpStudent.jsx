import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, FormLabel, Input, Link, Select, MenuItem, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import logo from "./images/educare.png";
import signup from "./images/signup.png";
import axios from "axios";

function SignUpStudent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [sapid, setSapid] = useState('');
    const [desc, setDesc] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();

        const signUpData = {
            sapid: Number(sapid),
            username: username,
            email: email,
            password: password,
            desc: desc
        };

        try {
            const response = await axios.post("https://educare-nbpr.onrender.com/student/register", signUpData, {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Signup Successful:", response.data);

            // Show success message
            alert("Signup Successful!");

        } catch (error) {
            console.error("Signup Failed:", error.response ? error.response.data : error.message);
            alert("Signup Failed. Please try again.");
        }
    };


    return (
        <ThemeProvider theme={fontcolorTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto', marginLeft: '-150px', marginTop: '-30px' }}>
                {/* Left Container */}
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', height: 'auto', bgcolor: '#1e1e1e', borderRadius: '15px', margin: '12px' }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', overflow: 'hidden' }}>
                        <img src={signup} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Sewing Machine" />
                    </Container>
                </Container>

                {/* Right Container */}
                <Container sx={{ width: '60%', height: '100%', bgcolor: 'white' }}>
                    <Box sx={{ width: '100%', mx: 'auto', my: 4, py: 3, px: 2, gap: 2, boxShadow: 'md', bgcolor: 'white', borderRadius: '16px' }} variant="outlined">
                        <div sx={{ mb: '10px' }}>
                            <img src={logo} style={{ width: '220px', marginBottom: '30px' }} alt="Logo" />
                            <Typography component="h1" style={{ fontSize: '170%', textAlign: 'center' }}>Sign up</Typography>
                        </div>

                        <Grid container spacing={2} alignItems="center" justifyContent="center" style={{marginLeft:'150px'}}>
                            <Grid item xs={12}>
                                <Typography sx={{ textAlign: "left" }}>Name</Typography>
                                <TextField
                                    name="name"
                                    value={username}
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ width: '65%', padding: '5px' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ textAlign: "left" }}>Email</Typography>
                                <TextField
                                    name="email"
                                    value={email}
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ width: '65%', padding: '5px' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ textAlign: "left" }}>Password</Typography>
                                <TextField
                                    name="password"
                                    value={password}
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ width: '65%', padding: '5px' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ textAlign: "left" }}>SapID</Typography>
                                <TextField
                                    name="sapid"
                                    value={sapid}
                                    type="number"
                                    placeholder="Enter sap id"
                                    onChange={(e) => setSapid(e.target.value)}
                                    sx={{ width: '65%', padding: '5px' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ textAlign: "left" }}>Description</Typography>
                                <TextField
                                    name="desc"
                                    value={desc}
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={(e) => setDesc(e.target.value)}
                                    sx={{ width: '65%', padding: '5px' }}
                                />
                            </Grid>
                        </Grid>

                        {/* <Link href="/loginTeacher"> */}
                        <Grid container display="flex" justifyContent="center" >
                        <Grid display="flex" justifyContent="center">
                        <Button onClick={handleSignUp} sx={{ backgroundColor: '#ffc700', color: '#000', padding: '10px', paddingLeft: '30px', paddingRight: '30px', mb: 3 }} >Sign up</Button>
                        </Grid>

</Grid>                        {/* </Link> */}
                        <Typography fontSize="body2" sx={{ textAlign: 'center' }}>
                            Already have an account?
                            <Link href="/loginStudent" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Log in</Link>
                        </Typography>
                        <Typography fontSize="body2" sx={{ textAlign: 'center' }}>
                            Go back to Home Page
                            <Link href="/" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Home</Link>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default SignUpStudent;