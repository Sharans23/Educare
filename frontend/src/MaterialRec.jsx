"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import SideBar from "./SSideBar.jsx";




const VITE_API_KEY=import.meta.env.VITE_API_KEY
console.log(VITE_API_KEY)


const genAI = new GoogleGenerativeAI(VITE_API_KEY);

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default function Recommendations() {
  const [subject, setSubject] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject) return;
    setLoading(true);
    try {
      const prompt = `Identify five key learning methods suitable for studying ${subject} and provide one high-quality educational resource recommendation for each method. Format as numbered points without bullet points. Each point should be consice and up to the point, dont provide any pointers or anything and the answer should be in presentable manner`;
      const generatedContent = await generateContent(prompt);
      setRecommendations(formatRecommendations(generatedContent));
    } catch (error) {
      console.error("Error:", error);
      setRecommendations(["Failed to fetch recommendations. Try again later."]);
    }
    setLoading(false);
  };

  const formatRecommendations = (text) => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim().replace(/^[•*-]\s*/, "")); // Remove any bullet points
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Card
        style={{
          width: "20%",
          minHeight: "800px",
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
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Material Recommendations</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Enter Subject"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-[#ffc700] text-black font-medium rounded hover:bg-yellow-500 disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Get"}
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-md font-semibold mb-2">Recommendations:</h2>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="py-1 border-b last:border-0">
                  <p className="text-sm">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
