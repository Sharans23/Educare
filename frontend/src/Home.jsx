import React from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import teacher from "./images/teacher.png";
import student from "./images/stud.png";
import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom'; 

function Home() {
    return (
        <div style={{marginLeft:'-150px', marginTop:'-30px'}}>
        <Box sx={{
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'column',  // for extra small screens
                md: 'row',  // for small screens
            },
            height: '97vh'  // Set height to match the viewport height
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: {
                    xs: '100%',
                    sm: '100%',
                    md: '65%'
                },
                height: {
                    xs:'50%',
                    md: '100%',
                    sm: '50%'
                },
                bgcolor: '#1e1e1e' , // corrected color name
                borderRadius:'15px',
                margin:'10px'
            }}>
                
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%', // Ensure the container takes up the full width
                    height: '100%', // Ensure the container takes up the full height
                    overflow: 'hidden' // Hide any overflow content      
                }}>
                    <img src={teacher} style={{ maxWidth: '85%', maxHeight: '80%', objectFit: 'contain',marginBottom:'20px',width:'62%' }} />
                    <Link to="/loginTeacher" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{padding:'20px',paddingTop:'7px',paddingBottom:'7px'}} sx={{ bgcolor: '#ffc700',maxWidth: { md:'90%',sm:'60%',xs:'60%'} }}><Typography style={{fontWeight:600,fontSize:'105%',color:'#000'}}>TEACHER</Typography></Button>
                    </Link>   
                    </Container>            
            </Container>

            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: {
                    xs: '100%',
                    sm: '100%',
                    md: '50%'
                },
                height: {
                    xs:'50%',
                    md: '100%',
                    sm: '50%'
                },
                bgcolor: '#ffffff'  // corrected color name
            }}>

                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '120%', // Ensure the container takes up the full width
                    height: '100%', // Ensure the container takes up the full height
                    overflow: 'hidden' // Hide any overflow content      
                }}>
                    <img src={student} style={{ maxWidth: '85%', maxHeight: '80%', objectFit: 'contain',marginBottom:'40px',marginTop:'20px',width:'63%' }}/>
                    <Link to="/loginStudent" style={{ textDecoration: 'none' }}> 
                        <Button variant="contained" style={{padding:'20px',paddingTop:'7px',paddingBottom:'7px'}} sx={{ bgcolor: '#ffc700', maxWidth: { md:'100%',sm:'50%',xs:'50%'} }}><Typography style={{fontWeight:600,fontSize:'105%',color:'#000'}}>STUDENT</Typography></Button>
                    </Link>                  
                     </Container>
            </Container>
        </Box>
        </div>
    );
};

export default Home;