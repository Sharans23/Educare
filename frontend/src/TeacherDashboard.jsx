import React from "react";
import { useState, useContext, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import TSideBar from "./TSideBar";
import camera from "./images/camera.png";
import axios from "axios";
import EmailContext from './EmailContext';

function TeacherDashboard() {
    const [isPictureUploaded, setIsPictureUploaded] = useState(false);


      const { email } = useContext(EmailContext); // Get email from EmailContext

      const [profileData, setProfileData] = useState(null);
  
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire("Error", "No authentication token found", "error");
            return;
        }
        // console.log("emailll:" ,email);
        //   if (email) {
              // Fetch profile data from the server using the email
              axios.get(`https://educare-nbpr.onrender.com/teacher/me`,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  // Update state with fetched profile data
                  setProfileData(response.data);
                })
                .catch((error) => {
                  console.error("Error fetching profile data:", error);
                });
        //   }
      }, []);

    
     

    return(

        <div style={{ overflowY: 'auto' }}>
                   <CardContent style={{padding:'0px'}}>
                   < div style={{display:"flex"}}>
                <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#1e1e1e',borderRadius:'15px',margin:'15px'}}>
                <Grid item >
                    <TSideBar />
                </Grid>
                </Card>
               
                <Grid item style={{width:'78%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
                {/* <Nav /> */}
                <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Profile</Typography>

                
                <Grid container>
                <Grid item xs={8}>

                <Card style={{marginBottom:'30px',  paddingTop:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'15px',backgroundColor:'#1e1e1e',height:'auto'}}>
                <Grid container>
                <Grid item xs={4}>
                <Button  name="banner" component="label" className="buttonText1" style={{marginTop:'0px'}}>
               <img src={camera} style={{width:'120px',marginTop:'20px'}}/>
                  <input id="banner-upload" type="file"  inputProps={{ accept: "image/png, image/gif, image/jpeg, image/heic, image/jpg" }} style={{ display: 'none' }}/>
                  </Button>

                </Grid>
                <Grid item xs={8}>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Full Name</Typography>
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',textAlign:'left',paddingLeft:'15px',backgroundColor:'#D3D3D3'}}>
                <Typography>{profileData && profileData.username}</Typography>
                </Card>

               <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Teacher ID</Typography> 
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px'}}>
                <Typography>{profileData && profileData.sapid}</Typography>
                </Card>
                </Grid>
                </Grid>
                </Card>

               
            
                </Grid>
               

                <Grid item xs={4}>
               <Card style={{marginBottom:'30px',  paddingTop:'20px', marginLeft:'10px',marginRight:'40px',borderRadius:'15px',backgroundColor:'#1e1e1e',textAlign:'left',paddingLeft:'15px',fontWeight:700}}>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Email</Typography>
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:700}}>
                <Typography>{profileData && profileData.email}</Typography>
                </Card>
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500,color:'#fff'}}>Phone Number</Typography> 
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:700}}>
                <Typography>{profileData && profileData.phone}</Typography>  
                 </Card>
                 </Card>

                </Grid>
                </Grid>
                
                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>School Name</Typography> 
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:700}}> 
                <Typography>{profileData && profileData.schoolName}</Typography> 
                </Card>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Professional Summary</Typography>
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',height:'auto',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:700}}>
                <Typography>{profileData && profileData.desc}</Typography>   
                </Card>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Subjects</Typography>
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',height:'auto',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:700}}>
                <Typography>{profileData && profileData.subjects}</Typography> 
                </Card>

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Experience (in yrs)</Typography>
                <Card style={{marginBottom:'30px', padding:'10px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px',height:'auto',backgroundColor:'#D3D3D3',textAlign:'left',paddingLeft:'15px',fontWeight:800}}>
                <Typography>{profileData && profileData.exp}</Typography>   
                </Card>
                
            
           
                </Grid>
           
            </div>
            </CardContent>
        </div>
    );

};

export default TeacherDashboard;