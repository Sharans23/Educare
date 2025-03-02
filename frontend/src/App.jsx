import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import fontcolorTheme from "./fontColorTheme";

// Pages
import Home from "./Home";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import AddStudents from "./AddStudents";
import AddMaterial from "./AddMaterial";
import Quiz from "./Quiz";
import LoginStudent from "./LoginStudent";
import LoginTeacher from "./LoginTeacher";
import SignUpTeacher from "./SignUpTeacher";
import SignUpStudent from "./SignUpStudent";
import ScopeReco from "./ScopeRec";
import Recommendations from "./MaterialRec";
import QuestionPaperGenerator from "./QuestionPaperGenerator";
import QuestionPaperGen2 from "./QuestionPaperGen2";
import Video from "./Video";
import Dashboard from "./Sashboard"; // Check if it's a typo
import Tashboard from "./Tashboard"; // Check if it's a typo
import Teams from "./Teams";
import CreateAssgn from "./CreateAssgn";
import AnswerEvaluator from "./QuestionAnswer";
// import Space from './Space.jsx'
// import Space from './Space.jsx'

// Context Providers
import { EmailProvider } from "./EmailContext";
import { UsernameProvider } from "./UsernameContext";
// import Space from "./space";
import StudentTeams from "./StudentTeams";
import Space from "./space";

// MUI Theme Overrides
const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0px !important",
          margin: "0px !important",
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App w-full h-full p-0 m-0">
      {/* Merging ThemeProviders */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UsernameProvider>
          <EmailProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scoperecommendations" element={<ScopeReco />} />
                <Route
                  path="/materialrecommendations"
                  element={<Recommendations />}
                />
                <Route
                  path="/teacherDashboard"
                  element={<TeacherDashboard />}
                />
                <Route path="/studentProfile" element={<StudentDashboard />} />
                <Route path="/addstudents" element={<AddStudents />} />
                <Route path="/addmaterial" element={<AddMaterial />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/loginTeacher" element={<LoginTeacher />} />
                <Route path="/signupTeacher" element={<SignUpTeacher />} />
                <Route path="/loginStudent" element={<LoginStudent />} />
                <Route path="/signupStudent" element={<SignUpStudent />} />
                <Route path="/student-dashboard" element={<Dashboard />} />
                <Route path="/video" element={<Video />} />
                <Route path="/teacher-dashboard" element={<Tashboard />} />
                <Route path="/createassgn" element={<CreateAssgn />} />
                <Route path="/space" element={<Space />} />
                <Route
                  path="/QuestionPaperGenerator"
                  element={<QuestionPaperGenerator />}
                />
                <Route
                  path="/StudentTeams"
                  element={<StudentTeams />}
                />
                <Route
                  path="/QuestionPaperGen2"
                  element={<QuestionPaperGen2 />}
                />
                <Route path="/teams" element={<Teams />} />
                <Route path="/qa" element={<AnswerEvaluator />} />
              </Routes>
            </Router>
          </EmailProvider>
        </UsernameProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
