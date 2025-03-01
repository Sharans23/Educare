import React, {useState} from "react";
import { Button, Card, CardContent, Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import Grid from '@mui/material/Grid';
import SSideBar from "./SSideBar";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import axios from "axios";
// import Grid2 from '@mui/material/Grid2';
// // or
import { Grid2 } from '@mui/material';

function Resources() {

    const [pdfs, setPdfs] = useState([]);

    const handleClick = async () => {
        const { value: email } = await Swal.fire({
            input: "email",
            inputLabel: "Teacher's Email",
            inputPlaceholder: "Enter the teacher's email",
            inputAttributes: {
              "aria-label": "Enter teacher's email"
            },
            showCancelButton: true,
            confirmButtonText: 'Get Files',
          });
    
        if (email) {
            try {
                const response = await axios.get(`http://localhost:5000/teacher/teacherProfile/${email}`);
                // console.log(response);
                const {pdfs} = response.data; 
                setPdfs(pdfs);
                console.log(pdfs);
    
                
            } catch (error) {
                console.error('Error fetching files:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error fetching files!',
                });
            }
        }
    };

    
    
    return(

        <div style={{ minHeight:'600px',overflowY: 'auto',height:'auto' }}>
            <CardContent style={{padding:'0px'}}>
            <Grid container>
                <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto',backgroundColor:'#1e1e1e',borderRadius:'15px',margin:'15px'}}>
                <Grid item >
                    <SSideBar />
                </Grid>
                </Card>
                
                <Grid item style={{width:'78%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
                {/* <Nav /> */}
                <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Resources</Typography>

                <Button onClick={handleClick} style={{backgroundColor:'#ffc700',textDecoration:'none', color:'#000',display:'flex',justifyContent:'flex-start',marginLeft:'40px', marginBottom:'30px',padding:'8px'}}><Typography style={{fontWeight:600, marginRight:'10px',fontSize:'105%'}}>Add Teacher</Typography><AddIcon /></Button>
                

                <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>Materials from teacher </Typography>
                <Card style={{marginBottom:'30px', padding:'20px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px'}}>
                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>File Name</TableCell>
                                                <TableCell>File Link</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody style={{textAlign:'center'}}>
                                            {pdfs.map((pdf, index) => (
                                                <TableRow key={index}>
                                                   <TableCell>{`FILE ${index + 1}`}</TableCell>
                                                <TableCell>
                                                    <a href={pdf} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>Link</a>
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                </Card>

                </Grid>
                
            </Grid>
            </CardContent>
        </div>
    );

};

export default Resources;