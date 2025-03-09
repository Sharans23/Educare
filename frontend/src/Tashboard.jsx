import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BellIcon } from "@heroicons/react/24/outline";
import TSideBar from "./TSideBar";
import CreateAssgn from "./CreateAssgn";
import { Card } from "@mui/material";
import Grid from '@mui/material/Grid';

const studentData = {
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=128&width=128",
  teams: [
    { id: 1, name: "Mathematics Advanced", members: 24, lastActive: "Today" },
    { id: 2, name: "Physics Group", members: 18, lastActive: "Yesterday" },
    { id: 3, name: "Literature Club", members: 15, lastActive: "3 days ago" },
    { id: 4, name: "Computer Science", members: 20, lastActive: "1 week ago" },
  ],
};

export default function Tashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    
  
    return (
      <div style={{ overflowY: 'auto' }}>
        {/* Sidebar */}
        <div style={{ display: "flex" }}>
          <Card style={{ width: '20%', minHeight: '800px', overflowY: 'auto', backgroundColor: '#1e1e1e', borderRadius: '15px', margin: '15px' }}>
            <Grid item>
              <TSideBar />
            </Grid>
          </Card>
  
          {/* Main Content */}
          <Grid item style={{ width: "78%", minHeight: "800px", backgroundColor: "#F5F6FA" }}>
            {/* Header */}
            <header className="shadow">
              <div className="w-full px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
                <div className="flex items-center">
                  <button className="mr-4 p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <BellIcon className="h-6 w-6" />
                  </button>
                  <img className="h-8 w-8 rounded-full" src={studentData.avatar} alt="Profile" />
                </div>
              </div>
            </header>
  
            {/* Navigation Tabs */}
            <main className="w-full px-4 py-4">
              <nav className="flex space-x-4 mb-4">
                <button
                  onClick={() => {
                    if (selectedAssignment) {
                      setSelectedAssignment(null); // Go back to assignment list
                    } else if (selectedTeam) {
                      setSelectedTeam(null); // Go back to teams list
                    } else {
                      setActiveTab("teams");
                    }
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white"
                >
                  {selectedAssignment ? "Back to Assignments" : selectedTeam ? "Back to Teams" : "Teams"}
                </button>
              </nav>
  
              {/* Rendering Components */}
              {activeTab === "teams" && !selectedTeam && <TeamsTab onViewTeam={setSelectedTeam} />}
              {selectedTeam && !selectedAssignment && <CreateAssgn idTeam={selectedTeam.id}  onOpenAssignment={setSelectedAssignment} />}
              {selectedAssignment && <AssignmentDetails assignment={selectedAssignment} onBack={() => setSelectedAssignment(null)} />}
            </main>
          </Grid>
        </div>
      </div>
    );
  }
  

  function TeamsTab({ onViewTeam }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
      fetch("https://educare-nbpr.onrender.com/team/teacher", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTeams(data.teams); // Assuming response structure is { teams: [...] }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching teams:", error);
          setLoading(false);
        });
    }, []);
    
  
    if (loading) {
      return <p>Loading teams...</p>;
    }
    const handleViewTeam = (team) => {
      console.log("Selected Team:", team); // Log the selected team object
      onViewTeam(team);
    };
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Teams</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-4 sm:px-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.desc}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Code</dt>
                    <dd className="mt-1 text-sm text-gray-900">{team.code}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(team.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-4">
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md cursor-pointer"
                  onClick={() => handleViewTeam(team)}

                >
                  View Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  



//_________________________________

// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import {
//   UserGroupIcon,
//   ChartBarIcon,
//   AcademicCapIcon,
//   BellIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
// import TSideBar from "./TSideBar";

// // Sample data for the dashboard
// const studentData = {
//   name: "Alex Johnson",
//   email: "alex.johnson@example.com",
//   grade: "10th Grade",
//   avatar: "/placeholder.svg?height=128&width=128",
//   teams: [
//     {
//       id: 1,
//       name: "Mathematics Advanced",
//       teacher: "Dr. Smith",
//       members: 24,
//       lastActive: "Today",
//       color: "bg-blue-500",
//     },
//     {
//       id: 2,
//       name: "Physics Group",
//       teacher: "Prof. Williams",
//       members: 18,
//       lastActive: "Yesterday",
//       color: "bg-purple-500",
//     },
//     {
//       id: 3,
//       name: "Literature Club",
//       teacher: "Ms. Davis",
//       members: 15,
//       lastActive: "3 days ago",
//       color: "bg-green-500",
//     },
//     {
//       id: 4,
//       name: "Computer Science",
//       teacher: "Mr. Johnson",
//       members: 20,
//       lastActive: "1 week ago",
//       color: "bg-yellow-500",
//     },
//   ],
//   performance: {
//     subjects: [
//       { name: "Mathematics", score: 85, average: 72 },
//       { name: "Physics", score: 78, average: 68 },
//       { name: "Literature", score: 92, average: 75 },
//       { name: "Computer Science", score: 95, average: 70 },
//       { name: "History", score: 88, average: 76 },
//     ],
//     monthly: [
//       { month: "Jan", score: 82 },
//       { month: "Feb", score: 85 },
//       { month: "Mar", score: 83 },
//       { month: "Apr", score: 86 },
//       { month: "May", score: 89 },
//       { month: "Jun", score: 87 },
//     ],
//     distribution: [
//       { name: "90-100", value: 3 },
//       { name: "80-89", value: 2 },
//       { name: "70-79", value: 1 },
//       { name: "60-69", value: 0 },
//       { name: "Below 60", value: 0 },
//     ],
//     attendance: 95,
//     rank: 5,
//     totalStudents: 120,
//   },
// };



// export default function Tashboard() {
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <div className="flex mt-[-40px] min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 mt-[8px] ml-[-155px] bg-black fixed h-full">
//         <TSideBar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 ml-64">
//         {/* Header */}
//         <header className="bg-white shadow">
//           <div className="w-full px-4 py-4 flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Student Dashboard
//             </h1>
//             <div className="flex items-center">
//               <button className="mr-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                 <span className="sr-only">View notifications</span>
//                 <BellIcon className="h-6 w-6" />
//               </button>
//               <img
//                 className="h-8 w-8 rounded-full"
//                 src={studentData.avatar || "/placeholder.svg"}
//                 alt="Profile"
//               />
//             </div>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="w-full px-4 py-4">
//           {/* Navigation */}
//           <nav className="flex space-x-4 mb-4">
//             {["Teams"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab.toLowerCase())}
//                 className={`px-3 py-2 rounded-md text-sm font-medium ${
//                   activeTab === tab.toLowerCase()
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </nav>

//           {/* Content */}
        
//           {activeTab === "teams" && <TeamsTab />}

//         </main>
//       </div>
//     </div>
//   );

//   function TeamsTab() {
//     return (
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">My Teams</h2>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {studentData.teams.map((team) => (
//             <div
//               key={team.id}
//               className="bg-white shadow overflow-hidden sm:rounded-lg"
//             >
//               <div className="px-4 py-4 sm:px-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">
//                   {team.name}
//                 </h3>
               
//               </div>
//               <div className="border-t border-gray-200 px-4 py-4 sm:px-4">
//                 <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
//                   <div className="sm:col-span-1">
//                     <dt className="text-sm font-medium text-gray-500">
//                       Members
//                     </dt>
//                     <dd className="mt-1 text-sm text-gray-900">
//                       {team.members}
//                     </dd>
//                   </div>
//                   <div className="sm:col-span-1">
//                     <dt className="text-sm font-medium text-gray-500">
//                       Last Active
//                     </dt>
//                     <dd className="mt-1 text-sm text-gray-900">
//                       {team.lastActive}
//                     </dd>
//                   </div>
//                 </dl>
//               </div>
//               <div className="bg-gray-50 px-4 py-4 sm:px-4">
//                 <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
//                   View Team 
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             Team Activity Overview
//           </h3>
//           <div className="bg-white shadow rounded-lg">
//             <div className="px-4 py-4 sm:p-4">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart
//                   data={[
//                     {
//                       week: "Week 1",
//                       Mathematics: 5,
//                       Physics: 3,
//                       Literature: 2,
//                       "Computer Science": 4,
//                     },
//                     {
//                       week: "Week 2",
//                       Mathematics: 7,
//                       Physics: 4,
//                       Literature: 3,
//                       "Computer Science": 6,
//                     },
//                     {
//                       week: "Week 3",
//                       Mathematics: 6,
//                       Physics: 5,
//                       Literature: 4,
//                       "Computer Science": 5,
//                     },
//                     {
//                       week: "Week 4",
//                       Mathematics: 8,
//                       Physics: 6,
//                       Literature: 5,
//                       "Computer Science": 7,
//                     },
//                     {
//                       week: "Week 5",
//                       Mathematics: 9,
//                       Physics: 7,
//                       Literature: 6,
//                       "Computer Science": 8,
//                     },
//                   ]}
//                   margin={{
//                     top: 20,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="week" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="Mathematics"
//                     stroke="#3B82F6"
//                   />
//                   <Line type="monotone" dataKey="Physics" stroke="#8B5CF6" />
//                   <Line type="monotone" dataKey="Literature" stroke="#10B981" />
//                   <Line
//                     type="monotone"
//                     dataKey="Computer Science"
//                     stroke="#F59E0B"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

  
// }

