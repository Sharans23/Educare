import React , {useState} from "react";
import { Card, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link, useNavigate, useLocation} from "react-router-dom";
import profile from "./images/profile.png";
import student from "./images/student.png";
import doc from "./images/doc.png";
import qa from "./images/question-and-answer (2).png";
import logo from "./images/logo.png";
import dash from "./images/dashboard.png";
import team from "./images/group.png";
import meet from "./images/meeting.png";

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
                        <Button onClick={() => handleButtonClick('qapapergenerator',"/QuestionPaperGenerator")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={qa} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Question Generator</Typography>
                                </Button>
                                </li>
                                <li>
                        <Button onClick={() => handleButtonClick('teams',"/teams")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={team} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Teams</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('teacher-dashboard',"/teacher-dashboard")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={dash} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Dashboard</Typography>
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => handleButtonClick('create-meet',"/create-meet")} style={{ backgroundColor: '#1e1e1e', color: '#000', width: '80%', padding: '8px', textAlign: 'left', marginLeft: '1px',justifyContent:'flex-start',paddingLeft:'5%' }}>
                                <img src={meet} style={{ width: '20px', marginTop: '3px' }} alt="Review Icon" />
                                <Typography style={{ fontSize: '110%', marginLeft: '15px', textAlign: 'left',textTransform: 'none',color:'#fff' }}>Create Meet</Typography>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TSideBar;
