import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, FormLabel, Input, Link } from "@mui/material";
import Grid from '@mui/material/Grid';
import logo from "./images/educare.png";
import signup from "./images/signup.png";
import axios from "axios";

function SignUpTeacher() {

    const [fullname, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [description, setDescription] = useState('');
    const [exp, setExp] = useState(0);
    const[subjects, setSubjects] = useState([]);

    const handleFullnameChange = (event) => {
        setName(event.target.value)
      };

      const handlePasswordChange = (event) => {
        setPassword(event.target.value)
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value)
      };

      const handlePhoneChange = (event) => {
        setPhone(event.target.value)
      };

      const handleSchoolNameChange = (event) => {
        setSchoolName(event.target.value)
      };

      const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
      };

      const handleExpChange = (event) => {
        setExp(event.target.value)
      };

      const handleSubjectsChange = (event) => {
        setSubjects(event.target.value)
      };

      const handleSignUp = (event) => {
        event.preventDefault();
    
        // Create an object containing all the values
        const signUpData = {
            fullname: fullname,
            password: password,
            email: email,
            phone: phone,
            schoolName: schoolName,
            description: description,
            exp: exp,
            subjects: subjects
        };
    
        const requestData = JSON.stringify(signUpData);
    
        axios.post(`http://localhost:5000/teacher/signup`, requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            
            console.log(response.data);
        })
        .catch(error => {
           
            console.error(error);
        });
    };
    

    return (
        <ThemeProvider theme={fontcolorTheme}>
        <div  style={{marginLeft:'-150px', marginTop:'-35px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Left Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', height: '97vh', bgcolor: '#1e1e1e', borderRadius:'15px', margin:'12px' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img src={signup} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Sewing Machine" />
                </Container>
            </Container>

            {/* Right Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%', height: '100%', bgcolor: 'white' }}>
                <Box sx={{ width: '100%', mx: 'auto', my: 4, py: 3, px: 2, gap: 2, boxShadow: 'md', bgcolor: 'white', borderRadius: '16px' }} variant="outlined">
                    <div sx={{ mb: '10px' }}>
                        <img src={logo} style={{ width: '220px', marginBottom: '30px' }} alt="Logo" />
                        <Typography component="h1" style={{ fontSize: '170%',textAlign:'center' }}>Sign in</Typography>
                    </div>

                    <Grid container spacing={2} style={{width:'100%'}}>
                        {/* First Column */}
                        <Grid item xs={3} style={{marginRight:'150px',marginLeft:'50px'}}>
                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={fullname}
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={handleFullnameChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Email</FormLabel>
                                <Input
                                    name="email"
                                    value={email}
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleEmailChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Password</FormLabel>
                                <Input
                                    name="password"
                                    value={password}
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={handlePasswordChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Phone</FormLabel>
                                <Input
                                    name="phone"
                                    value={phone}
                                    type="number"
                                    placeholder="Enter phone number"
                                    onChange={handlePhoneChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>
                        </Grid>

                        {/* Second Column */}
                        <Grid item xs={3} style={{marginRight:'30px',marginLeft:'25px'}}>
                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>School Name</FormLabel>
                                <Input
                                    name="school"
                                    value={schoolName}
                                    type="text"
                                    placeholder="Enter school name"
                                    onChange={handleSchoolNameChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Professional Summary</FormLabel>
                                <Input
                                    name="desc"
                                    value={description}
                                    type="text"
                                    placeholder="Enter a short description"
                                    onChange={handleDescriptionChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Experience (in yrs)</FormLabel>
                                <Input
                                    name="exp"
                                    value={exp}
                                    type="number"
                                    placeholder="Enter experience"
                                    onChange={handleExpChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Subjects</FormLabel>
                                <Input
                                variant="contained"
                                    name="subjects"
                                    value={subjects}
                                    type="text"
                                    placeholder="Enter subjects (separated by commas)"
                                    onChange={handleSubjectsChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* <Link href="/loginTeacher"> */}
                        <Button onClick={handleSignUp} sx={{ mt: 1 , backgroundColor:'#ffc700', color:'#000', padding:'10px',paddingLeft:'30px',paddingRight:'30px',mb: 3}} >Sign up</Button>
                    {/* </Link> */}
                    <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                        Already have an account?
                        <Link href="/loginTeacher" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Log in</Link>
                    </Typography>
                    <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                        Go back to Home Page
                        <Link href="/" style={{ color: '#000', textDecorationColor: '#ffc700', marginLeft: '10px' }}>Home</Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    </div>
    </ThemeProvider>
);
}

export default SignUpTeacher;