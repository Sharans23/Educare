import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import fontcolorTheme from "./fontColorTheme";
import TeacherDashboard from "./TeacherDashboard";
import AddStudents from "./AddStudents";
import { Navigate } from "react-router-dom";
import LoginStudent from "./LoginStudent";
import LoginTeacher from "./LoginTeacher";
import SignUpTeacher from "./SignUpTeacher";
import SignUpStudent from "./SignUpStudent";
import Home from "./Home";
import StudentDashboard from "./StudentDashboard";
import AddMaterial from "./AddMaterial";
import Quiz from "./Quiz";
import { EmailProvider } from "./EmailContext";
import { UsernameProvider } from "./UsernameContext";
import OtherComponent from "./OtherComponent";
import ScopeReco from "./ScopeRec";
import Recommendations from "./MaterialRec";
import Resources from "./Resources";
import QuestionPaperGenerator from "./QuestionPaperGenerator";
import QuestionPaperGen2 from "./QuestionPaperGen2";
import Video from './Video'
import Dashboard from "./Sashboard";
import Tashboard from "./Tashboard";
import Teams from "./Teams";
import CreateAssgn from "./CreateAssgn";

function App() {
  return (
    <div className="App">
  
        <ThemeProvider theme={fontcolorTheme}>
          <UsernameProvider>
            <EmailProvider>
              <Router>
                <Routes>
                  <Route path="/scoperecommendations" element={<ScopeReco />} />
                  <Route
                    path="/materialrecommendations"
                    element={<Recommendations />}
                  />
                  <Route
                    path="/teacherDashboard"
                    element={<TeacherDashboard />}
                  />
                  <Route
                    path="/studentProfile"
                    element={<StudentDashboard />}
                  />
                  <Route path="/addstudents" element={<AddStudents />} />
                  <Route path="/addmaterial" element={<AddMaterial />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/loginTeacher" element={<LoginTeacher />} />
                  <Route path="/signupTeacher" element={<SignUpTeacher />} />
                  <Route path="/loginStudent" element={<LoginStudent />} />
                  <Route path="/signupStudent" element={<SignUpStudent />} />
                  <Route path="/student-dashboard" element={<Dashboard />} />
                  <Route path="/video" element={<Video />} />
                  <Route path="/teacher-dashboard" element={<Tashboard />} />
                  <Route path="/createassgn" element={<CreateAssgn />} />
                  <Route path="/QuestionPaperGenerator" element={<QuestionPaperGenerator />} />
                  <Route path="/QuestionPaperGen2" element={<QuestionPaperGen2 />} />
                  <Route path="/teams" element={<Teams />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
        </EmailProvider>
        </UsernameProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
