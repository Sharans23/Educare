import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import SideBar from "./SSidebar";
import camera from "./images/camera.png";
import axios from "axios";
import UsernameContext from './UsernameContext';


function StudentDashboard() {

    const [isPictureUploaded, setIsPictureUploaded] = useState(false);
    const { username } = useContext(UsernameContext);


      const [studentData, setStudentData] = useState(null);
  
      useEffect(() => {
        // console.log("student username:" ,username);
        const token = localStorage.getItem("token");
                if (!token) {
                    Swal.fire("Error", "No authentication token found", "error");
                    return;
                }
        //   if (username) {
              // Fetch profile data from the server using the username
              axios
                .get("https://educare-nbpr.onrender.com/student/me", {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  // Update state with fetched profile data
                  setStudentData(response.data);
                })
                .catch((error) => {
                  console.error("Error fetching profile data:", error);
                });
        //   }
      }, []);

      const handleClick = () => {
        console.log(username);
        console.log(studentData);
      }
   

    return(
        

        <div style={{ overflowY: 'auto' }}>
            <CardContent style={{padding:'0px'}}>
            <div style={{display:"flex"}}>
                <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#1e1e1e',borderRadius:'15px',margin:'15px'}}>
                <Grid item >
                    <SideBar />
                </Grid>
                </Card>
                
                <Grid  style={{width:'78%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
                {/* <Nav /> */}
                <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Profile</Typography>

                
                <Grid container>
                <Grid item xs={8}>

                <Card style={{marginBottom:'30px',  paddingTop:'20px', marginLeft:'40px',marginRight:'40px',ybackgroundColor:'#1e1e1e',borderRadius:'15px'}}>
                <Grid container>
                <Grid item xs={4}>
                
                
               <Button  name="banner" component="label" className="buttonText1" style={{marginTop:'0px'}}>
               <img src={(studentData && studentData.pfp) || camera} style={{width:'120px',marginTop:'20px'}}/>
                  <input id="banner-upload" type="file" inputProps={{ accept: "image/png, image/gif, image/jpeg, image/heic, image/jpg" }} style={{ display: 'none' }}/>
                  </Button>

                </Grid>
                <Grid item xs={8}>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Username</Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.username}</Typography>
                </Card>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>SAP ID</Typography> 
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.sapid}</Typography>
                </Card>
                </Grid>
                </Grid>
                </Card>

            
                </Grid>
               

                <Grid item xs={4}>
               <Card style={{marginBottom:'30px',  paddingTop:'20px', marginLeft:'10px',marginRight:'40px',backgroundColor:'#1e1e1e',borderRadius:'15px'}}>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Email</Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.email}</Typography>
                </Card>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Phone Number</Typography> 
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.phone}</Typography>
                 </Card>
                 </Card>

                </Grid>
                </Grid>
                
                <Grid container>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>School Name</Typography> 
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}> 
                <Typography>{studentData && studentData.schoolName}</Typography>
                </Card>

               <Grid container>
                <Grid item xs={6}>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Board</Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.board}</Typography>    
                </Card>
                </Grid>
                <Grid item xs={6}>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Standard</Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.standard}</Typography>  
                </Card>
                </Grid>
                </Grid>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Description</Typography>
                <Card style={{marginBottom:'30px',height:'auto', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.desc}</Typography>
                </Card>
           
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Interests</Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',height:'auto',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{studentData && studentData.interest}</Typography>
                </Card>

                </Grid>
              
            </div>
            </CardContent>
        </div>
    );

};

export default StudentDashboard;