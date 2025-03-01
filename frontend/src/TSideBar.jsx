import React , {useState} from "react";
import { Card, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link, useNavigate, useLocation} from "react-router-dom";
import profile from "./images/profile.png";
import student from "./images/student.png";
import doc from "./images/doc.png";
import logo from "./images/logo.png";


function TSideBar() {

    const [selectedButton, setSelectedButton] = useState('dashboardteacher');
    const navigate = useNavigate();
   
    const handleButtonClick = (buttonname, path) => {
       
        setSelectedButton(buttonname);
        navigate(path);
        
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <img src={logo} style={{ width: '190px', marginLeft:'17%' , marginBottom: '10px', marginTop: '25px' }} />
            <hr />
            <nav>
                <ul style={{ listStyle: 'none', marginTop: '40px' }}>
                
                    <li>
                        <Button onClick={() => handleButtonClick('profile',"/teacherDashboard")} style={{ backgroundColor:'#1e1e1e', width: '80%',padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                 <img src={profile} style={{ width: '20px' }} />
                                <Typography style={{ fontSize: '112%', marginLeft: '15px',textTransform: 'none',color:'#fff'}}>Profile</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('addstudents',"/addstudents")} style={{ backgroundColor:'#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={student} style={{ width: '20px', marginTop: '3px' }} />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px',textTransform: 'none',color:'#fff' }}>Add Students</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('addmaterial',"/addmaterial")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={doc} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Add Material</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('addmaterial',"/QuestionPaperGenerator")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={doc} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Question Generator</Typography>
                                </Button>
                        <Button onClick={() => handleButtonClick('teams',"/teams")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={doc} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Teams</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('assgn',"/createassgn")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={doc} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Create Assgn</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('teacher-dashboard',"/teacher-dashboard")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={doc} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Dashboard</Typography>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TSideBar;
