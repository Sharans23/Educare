"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, Grid } from "@mui/material";
import { Search } from "lucide-react";
import { gemini_api } from "../secrets.js";
import SideBar from "./SSidebar.jsx";
import { TreeVisualization } from "./TreeVisualization.jsx";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(VITE_API_KEY);

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default function ScopeRec() {
  const [subject, setSubject] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject) return;
    setLoading(true);
    try {
      const prompt = `Give a detailed learning roadmap for ${subject} in a hierarchical tree structure format. Start with main categories and break them down into subcategories with increasing difficulty levels. Format it with clear numbering (1., 1.1, 1.1.1) and indentation to show the hierarchy. Include 4-5 main categories with relevant subcategories.`;

      const generatedContent = await generateContent(prompt);
      const parsedTree = parseTreeStructure(generatedContent);
      setRecommendations(parsedTree);
    } catch (error) {
      console.error("Error:", error);
      setRecommendations([
        { text: "Failed to fetch recommendations. Try again later.", level: 0 },
      ]);
    }
    setLoading(false);
  };

  const parseTreeStructure = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const treeItems = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (!trimmedLine) continue;

      let level = 0;
      let cleanedText = trimmedLine;

      const numberingMatch = trimmedLine.match(/^(\d+\.)+(\d+)?\.?\s+/);
      if (numberingMatch) {
        const numbering = numberingMatch[0];
        level = (numbering.match(/\./g) || []).length;
        cleanedText = trimmedLine.substring(numbering.length).trim();
      } else if (trimmedLine.match(/^[\s\t]*[-*•]\s+/)) {
        const indentMatch = trimmedLine.match(/^([\s\t]*)([-*•])\s+/);
        if (indentMatch) {
          level = Math.floor(indentMatch[1].length / 2) + 1;
          cleanedText = trimmedLine.substring(indentMatch[0].length).trim();
        }
      }

      treeItems.push({
        text: cleanedText,
        level: level,
      });
    }

    return treeItems;
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Learning Path Generator
          </h1>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter a subject (e.g., 'Frontend Development', 'Machine Learning')"
              className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#ffc700] text-black font-medium rounded-md hover:bg-yellow-500 disabled:opacity-50 transition-colors"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Path"}
            </button>
          </div>

          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Your Learning Path
              </h2>
              <TreeVisualization items={recommendations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
