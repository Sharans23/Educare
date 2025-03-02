import React, { useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import profile from "./images/profile.png";
import student from "./images/student.png";
import progress from "./images/progress.png";
import rec from "./images/recomm.png";
import logo from "./images/logo.png";
import quiz from "./images/ideas.png";
import group from './images/group.png'
import roadmap from './images/roadmap (1).png'
import answer from './images/presentation-board.png'

function SideBar() {
  const [selectedButton, setSelectedButton] = useState("dashboardstudent");
  const navigate = useNavigate();

  const handleButtonClick = (buttonname, path) => {
    setSelectedButton(buttonname);
    navigate(path);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <img
        src={logo}
        style={{
          width: "190px",
          marginLeft: "17%",
          marginBottom: "10px",
          marginTop: "25px",
        }}
      />
      <hr />
      <nav>
        <ul style={{ listStyle: "none", marginTop: "40px" }}>
          <li>
            <Button
              onClick={() => handleButtonClick("profile", "/studentProfile")}
              style={{
                backgroundColor: "#1e1e1e",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img src={profile} style={{ width: "20px" }} />
              <Typography
                style={{
                  fontSize: "112%",
                  marginLeft: "15px",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Profile
              </Typography>
            </Button>
          </li>

          <li>
            <Button
              onClick={() => handleButtonClick("quiz", "/quiz")}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img
                src={quiz}
                style={{ width: "20px", marginTop: "3px" }}
                alt="Review Icon"
              />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textAlign: "left",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Chapter Wise Quiz
              </Typography>
            </Button>
          </li>

          <li>
            <Button
              onClick={() =>
                handleButtonClick(
                  "materialrecommendations",
                  "/materialrecommendations"
                )
              }
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img src={progress} style={{ width: "20px", marginTop: "3px" }} />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Material Recommendations
              </Typography>
            </Button>
          </li>
          <li>
            <Button
              onClick={() => handleButtonClick("StudentTeams", "/StudentTeams")}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img src={group} style={{ width: "20px", marginTop: "3px" }} />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Teams
              </Typography>
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                handleButtonClick(
                  "scoperecommendations",
                  "/scoperecommendations"
                )
              }
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img
                src={roadmap}
                style={{ width: "20px", marginTop: "3px" }}
                alt="Review Icon"
              />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textAlign: "left",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                AI Roadmap 
              </Typography>
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                handleButtonClick(
                  "space",
                  "/space"
                )
              }
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img
                src={roadmap}
                style={{ width: "20px", marginTop: "3px" }}
                alt="Review Icon"
              />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textAlign: "left",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Game based learning
              </Typography>
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                handleButtonClick(
                  "Answer paper analyser",
                  "/qa"
                )
              }
              style={{
                backgroundColor: "#1e1e1e",
                color: "#000",
                width: "80%",
                padding: "8px",
                textAlign: "left",
                marginLeft: "1px",
                justifyContent: "flex-start",
                paddingLeft: "5%",
              }}
            >
              <img
                src={answer}
                style={{ width: "20px", marginTop: "3px" }}
                alt="Review Icon"
              />
              <Typography
                style={{
                  fontSize: "110%",
                  marginLeft: "15px",
                  textAlign: "left",
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                Answer paper analyser
              </Typography>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
