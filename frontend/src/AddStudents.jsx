import React, { useState } from "react";
import { Button, Card, CardContent, Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import TSideBar from "./TSideBar";
import Swal from "sweetalert2";

function AddStudents() {
  const [students, setStudents] = useState([]);

  const handleClick = () => {
    Swal.fire({
      input: "text",
      inputLabel: "Username",
      inputPlaceholder: "Enter student's username you want to add",
      inputAttributes: {
        "aria-label": "Enter student's username you want to add"
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const username = result.value;
        console.log(username)
        try {
          const response = await fetch(`http://localhost:5000/user/my/${username}`);
          if (response.ok) {
            const studentData = await response.json();
            setStudents(prevStudents => [...prevStudents, studentData]);
            console.log("Student details fetched and added:", studentData);
          } else {
            console.error("Failed to fetch student details");
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }
    });
  }

  return(
    <div style={{ minHeight:'600px',overflowY: 'auto',height:'auto' }}>
      <CardContent style={{padding:'0px'}}>
        <Grid container>
          <Card style={{width:'20%',minHeight:'800px',overflowY: 'auto',height:'auto',backgroundColor:'#1e1e1e',borderRadius:'15px',margin:'15px'}}>
            <Grid item>
           
              <TSideBar />
            </Grid>
          </Card>
          <Grid item style={{width:'78%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
            <Typography style={{fontSize:'210%',fontWeight:700,marginTop:'20px',textAlign:'left',marginLeft:'30px', marginBottom:'30px'}}>Add Students</Typography>
            <Button onClick={handleClick} style={{backgroundColor:'#ffc700',textDecoration:'none', color:'#000',display:'flex',justifyContent:'flex-start',marginLeft:'40px', marginBottom:'30px',padding:'8px'}}><Typography style={{fontWeight:600, marginRight:'10px',fontSize:'105%'}}>Add New Student</Typography><AddIcon /></Button>
            <Typography style={{textAlign:'left',marginLeft:'50px',marginBottom:'5px',fontWeight:500}}>My Students</Typography>
            <Card style={{marginBottom:'30px', padding:'20px',paddingTop:'0px', marginLeft:'40px',marginRight:'40px',borderRadius:'5px'}}>
                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Full name</TableCell>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Standard</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Board</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {students.map((student, index) => (
                  <TableRow key={index}>
                  <TableCell>{student.fullname}</TableCell>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>{student.standard}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.board}</TableCell>
                  
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

export default AddStudents;