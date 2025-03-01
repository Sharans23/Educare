
import React from "react";
import { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, FormLabel, Input, Select, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import logo from "./images/educare.png";
import login from "./images/login.png";
import axios from "axios";
import EmailContext from './EmailContext';
function LoginTeacher() {

    const [password, setPassword] = useState('');
    
    const [error, setError] = useState(null);
    
    const { email, setEmail } = useContext(EmailContext);

      const handlePasswordChange = (event) => {
        setPassword(event.target.value)
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value)
      };

      const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          // Send login request to server
          const response = await axios.post('http://localhost:5000/teacher/login', {
            email,
            password,
          });
    
          // Assuming the response contains user data including email
          const userData = response.data;
    
        //   // Update email globally
        //   setEmail(userData.email);
    
          // Optionally, you can redirect the user to another page upon successful login
          // history.push('/dashboard');
        } catch (error) {
          // Handle login errors
          setError(error.response.data.message);
        }
      };
   

    // const handleLogin = (event) => {
    //     event.preventDefault();

    //     const signUpData = {
          
    //         password: password,
    //         email: email,
           

    //     };

    //     const requestData = JSON.stringify(signUpData);

    //     axios.post(`http://localhost:5000/teacher/login`, requestData, {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => {
                
    //             console.log(response.data);
               
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };
    

    return (
        <ThemeProvider theme={fontcolorTheme}>
        <div  style={{marginLeft:'-150px', marginTop:'-25px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>
            {/* Left Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', height: 'auto', bgcolor: '#1e1e1e', borderRadius:'15px', margin:'12px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
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
                            <FormLabel sx={{ textAlign: "left" }}>Email</FormLabel>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleEmailChange}
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
                                    placeholder="Enter password"
                                    onChange={handlePasswordChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '130%' , padding:'5px'}}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                            <Link to="/teacherDashboard">
                            <Button sx={{ mt: 3, backgroundColor:'#ffc700', color:'#000', padding:'10px',paddingLeft:'30px',paddingRight:'30px',mb: 3}}>Login</Button>
                            </Link>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Don't have an account?
                                <Link to="/signupTeacher" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Sign Up</Link>
                            </Typography>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Go back to Home Page
                                <Link to="/" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Home</Link>
                            </Typography>
                            </Box>
            </Container>
        </Box>
        </div>
    </ThemeProvider>
    );
};

export default LoginTeacher;