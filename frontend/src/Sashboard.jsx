import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SideBar from "./SSidebar";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

// Sample data for the dashboard
const studentData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  grade: "10th Grade",
  avatar: "/placeholder.svg?height=128&width=128",
  teams: [
    {
      id: 1,
      name: "Mathematics Advanced",
      teacher: "Dr. Smith",
      members: 24,
      lastActive: "Today",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Physics Group",
      teacher: "Prof. Williams",
      members: 18,
      lastActive: "Yesterday",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Literature Club",
      teacher: "Ms. Davis",
      members: 15,
      lastActive: "3 days ago",
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Computer Science",
      teacher: "Mr. Johnson",
      members: 20,
      lastActive: "1 week ago",
      color: "bg-yellow-500",
    },
  ],
  performance: {
    subjects: [
      { name: "Mathematics", score: 85, average: 72 },
      { name: "Physics", score: 78, average: 68 },
      { name: "Literature", score: 92, average: 75 },
      { name: "Computer Science", score: 95, average: 70 },
      { name: "History", score: 88, average: 76 },
    ],
    monthly: [
      { month: "Jan", score: 82 },
      { month: "Feb", score: 85 },
      { month: "Mar", score: 83 },
      { month: "Apr", score: 86 },
      { month: "May", score: 89 },
      { month: "Jun", score: 87 },
    ],
    distribution: [
      { name: "90-100", value: 3 },
      { name: "80-89", value: 2 },
      { name: "70-79", value: 1 },
      { name: "60-69", value: 0 },
      { name: "Below 60", value: 0 },
    ],
    attendance: 95,
    rank: 5,
    totalStudents: 120,
  },
};

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Card
        style={{
          width: "20%",
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "#1e1e1e",
          borderRadius: "15px",
          margin: "15px",
        }}
      >
        <Grid item>
          <SideBar />
        </Grid>
      </Card>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="mt-[20px] ml-[25px] text-2xl font-bold">
          Student Dashboard
        </header>

        {/* Main content */}
        <main className="w-full px-4 py-4">
          {/* Navigation */}
          <nav className="flex space-x-4 mb-4">
            {["Overview", "Teams", "Performance"].map((tab) => (
              <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.toLowerCase()
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor: activeTab === tab.toLowerCase() ? "#ffc700" : "transparent",
              }}
            >
              {tab}
            </button>
            
            ))}
          </nav>

          {/* Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "teams" && <TeamsTab />}
          {activeTab === "performance" && <PerformanceTab />}
        </main>
      </div>
    </div>
  );

  function OverviewTab() {
    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                  <UserGroupIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Teams
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {studentData.teams.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                  <ChartBarIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Score
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {Math.round(
                          studentData.performance.subjects.reduce(
                            (acc, subject) => acc + subject.score,
                            0
                          ) / studentData.performance.subjects.length
                        )}
                        %
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2">
                  <AcademicCapIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Class Rank
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {studentData.performance.rank} of{" "}
                        {studentData.performance.totalStudents}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-2">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Attendance
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {studentData.performance.attendance}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Overview */}
        <div className="mt-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            My Teams
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentData.teams.map((team) => (
              <div
                key={team.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-4 sm:p-4">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 rounded-md p-2 ${team.color}`}
                    >
                      <UserGroupIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {team.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Teacher: {team.teacher} • {team.members} members
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Last active: {team.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">
            Performance Overview
          </h2>
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={studentData.performance.subjects}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Your Score" fill="#3B82F6" />
                  <Bar dataKey="average" name="Class Average" fill="#9CA3AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function TeamsTab() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Teams</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentData.teams.map((team) => (
            <div
              key={team.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-4 sm:px-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {team.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Teacher: {team.teacher}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Members
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {team.members}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Last Active
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {team.lastActive}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Team Color
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span
                        className={`inline-block w-6 h-6 rounded-full ${team.color}`}
                      ></span>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-4">
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Team Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Team Activity Overview
          </h3>
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    {
                      week: "Week 1",
                      Mathematics: 5,
                      Physics: 3,
                      Literature: 2,
                      "Computer Science": 4,
                    },
                    {
                      week: "Week 2",
                      Mathematics: 7,
                      Physics: 4,
                      Literature: 3,
                      "Computer Science": 6,
                    },
                    {
                      week: "Week 3",
                      Mathematics: 6,
                      Physics: 5,
                      Literature: 4,
                      "Computer Science": 5,
                    },
                    {
                      week: "Week 4",
                      Mathematics: 8,
                      Physics: 6,
                      Literature: 5,
                      "Computer Science": 7,
                    },
                    {
                      week: "Week 5",
                      Mathematics: 9,
                      Physics: 7,
                      Literature: 6,
                      "Computer Science": 8,
                    },
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Mathematics"
                    stroke="#3B82F6"
                  />
                  <Line type="monotone" dataKey="Physics" stroke="#8B5CF6" />
                  <Line type="monotone" dataKey="Literature" stroke="#10B981" />
                  <Line
                    type="monotone"
                    dataKey="Computer Science"
                    stroke="#F59E0B"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PerformanceTab() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Performance Analytics
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Subject Performance */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Subject Performance
              </h3>
            </div>
            <div className="px-4 py-4 sm:p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={studentData.performance.subjects}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Your Score" fill="#3B82F6" />
                  <Bar dataKey="average" name="Class Average" fill="#9CA3AF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Monthly Progress
              </h3>
            </div>
            <div className="px-4 py-4 sm:p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={studentData.performance.monthly}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Average Score"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Grade Distribution */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Grade Distribution
              </h3>
            </div>
            <div className="px-4 py-4 sm:p-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentData.performance.distribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {studentData.performance.distribution.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Performance Metrics
              </h3>
            </div>
            <div className="px-4 py-4 sm:p-4">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-4 sm:p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Class Rank
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {studentData.performance.rank}/
                      {studentData.performance.totalStudents}
                    </dd>
                  </div>
                </div>
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-4 sm:p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Attendance
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {studentData.performance.attendance}%
                    </dd>
                  </div>
                </div>
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-4 sm:p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Highest Score
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {Math.max(
                        ...studentData.performance.subjects.map((s) => s.score)
                      )}
                      %
                    </dd>
                  </div>
                </div>
                <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-4 sm:p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Score
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {Math.round(
                        studentData.performance.subjects.reduce(
                          (acc, subject) => acc + subject.score,
                          0
                        ) / studentData.performance.subjects.length
                      )}
                      %
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Detailed Subject Analysis */}
        <div className="mt-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:px-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Detailed Subject Analysis
              </h3>
            </div>
            <div className="px-4 py-4 sm:p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Your Score
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Class Average
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Difference
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentData.performance.subjects.map((subject) => (
                      <tr key={subject.name}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subject.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {subject.score}%
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {subject.average}%
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          +{subject.score - subject.average}%
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subject.score >= 90
                                ? "bg-green-100 text-green-800"
                                : subject.score >= 80
                                  ? "bg-blue-100 text-blue-800"
                                  : subject.score >= 70
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                          >
                            {subject.score >= 90
                              ? "Excellent"
                              : subject.score >= 80
                                ? "Good"
                                : subject.score >= 70
                                  ? "Average"
                                  : "Needs Improvement"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
