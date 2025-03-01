import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import fontcolorTheme from "./fontColorTheme";
import { Button, Typography, FormControl, FormLabel, Input, Link, Select, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import logo from "./images/educare.png";
import signup from "./images/signup.png";
import axios from "axios";

function SignUpStudent() {

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setdob] = useState('');
    const [board, setBoard] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [description, setDescription] = useState('');
    const [rollNo, setRollNo] = useState(0);
    const [standard, setStandard] = useState('');
    const [type, setType] = useState('');
    const [interests, setInterests] = useState([]);
    

    const handleFullnameChange = (event) => {
        setFullname(event.target.value)
      };

      const handleUsernameChange = (event) => {
        setUsername(event.target.value)
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

      const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleTypeChange = (event) => {
        setType(event.target.value)
    };

    const handleInterestsChange = (event) => {
        setInterests(event.target.value)
      };

    const handleDOBChange = (event) => {
        setdob(event.target.value)
    };

    const handleRollNoChange = (event) => {
        setRollNo(event.target.value)
    };

    const handleBoardChange = (event) => {
        setBoard(event.target.value)
    };

    const handleStandardChange = (event) => {
        setStandard(event.target.value)
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        const signUpData = {
            fullname: fullname,
            password: password,
            email: email,
            phone: phone,
            schoolName: schoolName,
            description: description,
            rollNo: rollNo,
            board: board,
            gender: gender,
            dob: dob,
            standard: standard,
            interests: interests,
            username: username,
            type:type,

        };

        const requestData = JSON.stringify(signUpData);

        axios.post(`http://localhost:5000/user/signup`, requestData, {
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
        <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto', marginLeft:'-150px', marginTop:'-30px' }}>
            {/* Left Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', height: 'auto', bgcolor: '#1e1e1e', borderRadius:'15px', margin:'12px'  }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh', overflow: 'hidden' }}>
                    <img src={signup} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Sewing Machine" />
                </Container>
            </Container>

            {/* Right Container */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%', height: 'auto', bgcolor: 'white' }}>
                <Box sx={{ width: '100%', mx: 'auto', my: 4, py: 3, px: 2, gap: 2, boxShadow: 'md', bgcolor: 'white', borderRadius: '16px' }} variant="outlined">
                    <div sx={{ mb: '10px' }}>
                        <img src={logo} style={{ width: '220px', marginBottom: '30px' }} alt="Logo" />
                        <Typography component="h1" style={{ fontSize: '170%',textAlign:'center',marginBottom:'20px' }}>Sign in</Typography>
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
                                <FormLabel sx={{ textAlign: "left" }}>Username</FormLabel>
                                <Input
                                    name="username"
                                    value={username}
                                    type="text"
                                    placeholder="Enter username"
                                    onChange={handleUsernameChange}
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

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Date of Birth</FormLabel>
                                <Input
                                    name="dob"
                                    value={dob}
                                    type="text"
                                    placeholder="DD-MM-YYYY"
                                    onChange={handleDOBChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                    <FormLabel sx={{ textAlign: "left" }}>Gender</FormLabel>
                                    <Select
                                        value={gender}
                                        onChange={handleGenderChange}
                                        placeholder="Select gender"
                                        sx={{ backgroundColor: '#f0f0f0', width: '330px' }}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                      
                                    </Select>
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
                                <FormLabel sx={{ textAlign: "left" }}>Board</FormLabel>
                                <Input
                                    name="board"
                                    value={board}
                                    type="text"
                                    placeholder="Enter board"
                                    onChange={handleBoardChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>


                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Standard</FormLabel>
                                <Input
                                    name="standard"
                                    value={standard}
                                    type="number"
                                    placeholder="Enter standard"
                                    onChange={handleStandardChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Roll No.</FormLabel>
                                <Input
                                variant="contained"
                                    name="rollno"
                                    value={rollNo}
                                    type="number"
                                    placeholder="Enter roll no"
                                    onChange={handleRollNoChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                <FormLabel sx={{ textAlign: "left" }}>Description</FormLabel>
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
                                <FormLabel sx={{ textAlign: "left" }}>Interests</FormLabel>
                                <Input
                                variant="contained"
                                    name="interests"
                                    value={interests}
                                    type="text"
                                    placeholder="Enter interests"
                                    onChange={handleInterestsChange}
                                    sx={{ backgroundColor: '#f0f0f0', width: '165%' , padding:'5px'}}
                                />
                            </FormControl>

                            <FormControl sx={{ mb: '20px' }}>
                                    <FormLabel sx={{ textAlign: "left" }}>Type of Learner</FormLabel>
                                    <Select
                                        value={type}
                                        onChange={handleTypeChange}
                                        placeholder="Select gender"
                                        sx={{ backgroundColor: '#f0f0f0', width: '330px' }}
                                    >
                                        <MenuItem value="Visual Learner">Visual Learner</MenuItem>
                                        <MenuItem value="Auditory Learner">Auditory Learner</MenuItem>
                                        <MenuItem value="Reading/Writing Learner">Reading/Writing Learner</MenuItem>
                                    </Select>
                                </FormControl>

                          


                        </Grid>
                    </Grid>

                            <Link href="/loginStudent">
                            <Button onClick={handleSignUp} sx={{ mt: 3, backgroundColor:'#ffc700', color:'#000', padding:'10px',paddingLeft:'30px',paddingRight:'30px',mb: 3}}>Sign up</Button>
                            </Link>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Already have an account?
                                <Link href="/loginStudent" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Log in</Link>
                            </Typography>
                            <Typography fontSize="body2" sx={{ alignSelf: 'center' }}>
                                Go back to Home Page
                                <Link href="/" style={{color:'#000', textDecorationColor:'#ffc700', marginLeft:'10px'}}>Home</Link>
                            </Typography>
                            </Box>
            </Container>
        </Box>
    </ThemeProvider>
    );
};

export default SignUpStudent;