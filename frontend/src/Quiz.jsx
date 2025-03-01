import React, { useState } from "react";
import { Button, Card, CardContent, Typography, FormControl, Input } from "@mui/material";
import Grid from '@mui/material/Grid';
import SSideBar from "./SSideBar";
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import questionsAnswers from "./data.json";
import physics from "./images/1.png";
import chemistry from "./images/2.png";
import biology from "./images/3.png";

function Quiz() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [generateClicked, setGenerateClicked] = useState(false); 
    const [userAnswers, setUserAnswers] = useState({}); 
    const [answerStatus, setAnswerStatus] = useState({}); 

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFile = {
                name: file.name,
            };
            setUploadedFiles([...uploadedFiles, newFile]);
        }
    };

    const handleGenerateQuiz = (subject) => {
        setGenerateClicked(true); 
        const filteredQuestions = questionsAnswers.filter(qa => qa.subject === subject);
        setUploadedFiles(filteredQuestions);
    };

    const handleAnswerChange = (event, questionId) => {
        const { value } = event.target;
        setUserAnswers({ ...userAnswers, [questionId]: value });
        checkAnswer(questionId, value);
    };

    const checkAnswer = (questionId, userAnswer) => {
        const correctAnswer = questionsAnswers.find(qa => qa.id === questionId)?.answer;
        if (userAnswer === correctAnswer) {
            setAnswerStatus({ ...answerStatus, [questionId]: 'correct' });
        } else {
            setAnswerStatus({ ...answerStatus, [questionId]: 'incorrect' });
        }
    };

    return (
        <div style={{ overflowY: 'auto' }}>
            <CardContent style={{ padding: '0px' }}>
                <Grid container>
                    <Card style={{ width: '20%', minHeight: '800px', overflowY: 'auto', height: 'auto', backgroundColor: '#1e1e1e', borderRadius: '15px',margin:'15px' }}>
                        <Grid item>
                            <SSideBar />
                        </Grid>
                    </Card>
                   
                        <Grid item style={{width:'78%',minHeight:'800px',overflowY: 'auto',height:'auto', backgroundColor:'#F5F6FA'}}>
                            <Typography style={{ fontSize: '210%', fontWeight: 700, marginTop: '20px', textAlign: 'left', marginLeft: '30px', marginBottom: '30px' }}>Chapter Wise Quiz</Typography>
                            
                            <Typography style={{ fontWeight: 600, marginRight: '10px', fontSize: '105%',textAlign:'left',marginLeft:'45px',marginBottom:'20px' }}>Click on a subject to generate quiz:</Typography>
                         
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Button name="banner"  onClick={() => handleGenerateQuiz('physics')} component="label" className="buttonText1" style={{ backgroundColor: '#ffc700', textDecoration: 'none', color: '#000', display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', marginBottom: '25px', padding: '8px', width: '246.5px' }}>
                                    <img src={physics} style={{width:'230px'}} />
                                    </Button>
                                    </div>
                                    <div>
                                    <Button name="banner"  onClick={() => handleGenerateQuiz('chemistry')} component="label" className="buttonText1" style={{ backgroundColor: '#ffc700', textDecoration: 'none', color: '#000', display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', marginBottom: '25px', padding: '8px', width: '246.5px' }}>
                                    <img src={chemistry} style={{width:'230px'}} />
                                    </Button>
                                    </div>
                                    <div>
                                    <Button name="banner"  onClick={() => handleGenerateQuiz('biology')} component="label" className="buttonText1" style={{ backgroundColor: '#ffc700', textDecoration: 'none', color: '#000', display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', marginBottom: '25px', padding: '8px', width: '246.5px' }}>
                                    <img src={biology} style={{width:'230px'}} />
                                    </Button>
                                </div>
                                
                            </div>
                           
                               

                            {generateClicked && uploadedFiles.map((qa) => (
                                <Card key={qa.id} style={{ marginBottom: '30px', padding: '20px', marginLeft: '40px', marginRight: '40px', borderRadius: '15px', height: 'auto' }}>
                                    <Typography style={{ textAlign: 'center', fontWeight: 700, marginBottom: '5px' }}>Question</Typography>
                                    <Typography style={{ textAlign: 'left' }}>{qa.question}</Typography>

                                    <Typography style={{ textAlign: 'center', marginBottom: '5px', fontWeight: 700, marginTop: '20px' }}>Answer</Typography>
                                    <FormControl sx={{ mb: '10px' }} >
                                        <Input
                                            name={`answer_${qa.id}`}
                                            type="text"
                                            placeholder="Type your answer"
                                            onChange={(event) => handleAnswerChange(event, qa.id)}
                                            style={{ color: answerStatus[qa.id] === 'correct' ? 'green' : answerStatus[qa.id] === 'incorrect' ? 'red' : 'inherit' }}
                                        />
                                    </FormControl>
                                    {answerStatus[qa.id] === 'correct' && <Typography style={{ color: 'green' }}>Correct</Typography>}
                                    {answerStatus[qa.id] === 'incorrect' && <Typography style={{ color: 'red' }}>Incorrect</Typography>}
                                </Card>
                            ))}
                        </Grid>

                </Grid>
            </CardContent>
        </div>
    );
}

export default Quiz;
