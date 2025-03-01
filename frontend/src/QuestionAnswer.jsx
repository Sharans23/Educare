import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gemini_api } from "../secrets.js";

const AnswerEvaluator = () => {
  const [answerKeyText, setAnswerKeyText] = useState("");
  const [studentText, setStudentText] = useState("");
  const [gradingResults, setGradingResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const genAI = new GoogleGenerativeAI(gemini_api);

  // Function to handle PDF file upload
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      extractText(file, type);
    }
  };

  // Function to extract text from PDFs
  const extractText = (file, type) => {
    setError("");
    pdfToText(file)
      .then((text) => {
        console.log(` Extracted text (${type}):`, text);

        if (!text.trim()) {
          setError(`Extracted text from ${type} is empty!`);
          console.error("⚠ Extracted text is empty!");
          return;
        }

        if (type === "answerKey") setAnswerKeyText(text);
        else setStudentText(text);
      })
      .catch((error) => {
        setError(`Failed to extract text from ${type} PDF: ${error.message}`);
        console.error("❌ Failed to extract text from PDF", error);
      });
  };

  // Improved function to parse questions and answers from the text
  const parseQuestionsAndAnswers = (text) => {
    // First try to identify question patterns in the text
    const questionPatterns = [
      /Question\s+(\d+)[:.\s]+(.+?)(?=Answer:|$)/gi,
      /Question\s+(\d+):(.+?)(?=Answer:|$)/gi,
      /Q\s*(\d+)[:.\s]+(.+?)(?=A:|$)/gi,
    ];

    // Try to identify answer patterns in the text
    const answerPatterns = [
      /Answer:(.+?)(?=Question\s+\d+|$)/gsi,
      /Answer\s*:(.+?)(?=Question\s+\d+|$)/gsi,
      /A:(.+?)(?=Q\s*\d+|$)/gsi,
    ];

    // Special pattern for the format seen in your example
    const combinedPattern =
      /Question\s+(\d+)[:.]\s+(.+?)\s+Answer:\s+(.+?)(?=Question\s+\d+|$)/gsi;

    let questions = [];
    let matches;

    // Try the combined pattern first
    while ((matches = combinedPattern.exec(text)) !== null) {
      questions.push({
        questionNumber: matches[1].trim(),
        questionText: matches[2].trim(),
        answerText: matches[3].trim(),
      });
    }

    // If combined pattern didn't work, try separate patterns
    if (questions.length === 0) {
      const questionMatches = [];

      // Extract questions
      for (const pattern of questionPatterns) {
        while ((matches = pattern.exec(text)) !== null) {
          questionMatches.push({
            questionNumber: matches[1].trim(),
            questionText: matches[2].trim(),
            index: matches.index,
          });
        }
      }

      // Extract answers
      const answerMatches = [];
      for (const pattern of answerPatterns) {
        while ((matches = pattern.exec(text)) !== null) {
          answerMatches.push({
            answerText: matches[1].trim(),
            index: matches.index,
          });
        }
      }

      // Match questions with their answers based on position in text
      questionMatches.forEach((q, i) => {
        // Find closest answer that appears after this question
        const nextQuestionIndex =
          i < questionMatches.length - 1 ? questionMatches[i + 1].index : text.length;
        const relevantAnswers = answerMatches.filter(
          (a) => a.index > q.index && a.index < nextQuestionIndex
        );

        if (relevantAnswers.length > 0) {
          questions.push({
            questionNumber: q.questionNumber,
            questionText: q.questionText,
            answerText: relevantAnswers[0].answerText,
          });
        }
      });
    }

    // If we still have no results, try an even simpler approach
    if (questions.length === 0) {
      // Look for patterns like "Question 1" or "Question 1:"
      const simplePattern =
        /(Question\s+\d+|Q\d+)[:.]\s*(.*?)(?=(?:Question\s+\d+|Q\d+)[:."]|$)/gsi;

      let lastQuestionNum = "";
      let lastQuestionText = "";
      let currentSection = "";

      while ((matches = simplePattern.exec(text)) !== null) {
        // If we found a new question and have content for the previous one
        if (lastQuestionNum && currentSection) {
          // Assume anything between questions is the answer to the previous question
          questions.push({
            questionNumber: lastQuestionNum,
            questionText: lastQuestionText,
            answerText: currentSection.trim(),
          });
        }

        // Update for next iteration
        const fullMatch = matches[0];
        const questionPart = matches[1];
        lastQuestionNum = questionPart.replace(/[^0-9]/g, "");
        lastQuestionText = matches[2].trim();

        // Get text until next question or end
        const startIdx = matches.index + fullMatch.length;
        const nextMatchIdx = text.indexOf("Question", startIdx);
        currentSection =
          nextMatchIdx !== -1
            ? text.substring(startIdx, nextMatchIdx)
            : text.substring(startIdx);
      }

      // Don't forget the last question
      if (lastQuestionNum && currentSection) {
        questions.push({
          questionNumber: lastQuestionNum,
          questionText: lastQuestionText,
          answerText: currentSection.trim(),
        });
      }
    }

    console.log("✅ Parsed Questions and Answers:", questions);
    return questions;
  };

  // Function to evaluate answers using Gemini API
  const evaluateAnswers = async () => {
    console.log("🔄 Processing extracted text...");
    setIsLoading(true);
    setError("");
    setGradingResults([]);

    if (!answerKeyText.trim() || !studentText.trim()) {
      setError("Missing extracted text. Please upload both PDFs.");
      setIsLoading(false);
      return;
    }

    try {
      // Parse questions and answers from both texts
      const answerKeyQA = parseQuestionsAndAnswers(answerKeyText);
      const studentQA = parseQuestionsAndAnswers(studentText);

      if (answerKeyQA.length === 0) {
        setError("Could not parse any questions from answer key.");
        setIsLoading(false);
        return;
      }

      if (studentQA.length === 0) {
        setError("Could not parse any questions from student answers.");
        setIsLoading(false);
        return;
      }

      // Create mapping of questions to answers
      const finalData = answerKeyQA.map((keyItem) => {
        // Find matching student answer by question number
        const studentItem = studentQA.find(
          (item) => item.questionNumber === keyItem.questionNumber
        );

        return {
          question: `Question ${keyItem.questionNumber}: ${keyItem.questionText}`,
          answer_key: keyItem.answerText,
          student_answer: studentItem ? studentItem.answerText : "No answer provided",
        };
      });

      console.log("📤 Final JSON to send to Gemini:", finalData);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const responses = await Promise.all(
        finalData.map(async (item, index) => {
          const keyItem = answerKeyQA[index]; // Get the corresponding keyItem
          const prompt = `
            You are an expert teacher grading student answers. Evaluate the student's answer compared to the answer key.
            - Carefully read both the answer key and student answer to understand the content.
            - Assign a score out of 5 based on accuracy of content, not exact wording.
            - Award full or partial points for correct concepts even if phrased differently.
            - Provide specific, constructive feedback highlighting strengths and areas for improvement.
            - Suggest ways the student can improve their understanding of the topic.

            Question: ${item.question}
            Answer Key: ${item.answer_key}
            Student Answer: ${item.student_answer}

            Respond in JSON format:
            {
              "score": <marks out of 5>,
              "feedback": "<detailed feedback explaining the score and how the student can improve>"
            }
          `;

          try {
            console.log("📨 Sending prompt to Gemini:", prompt);
            const response = await model.generateContent(prompt);
            const textResponse = await response.response.text();
            console.log("📩 Raw Response from Gemini:", textResponse);

            // Handle potential JSON parsing issues
            let result;
            try {
              result = JSON.parse(textResponse);
            } catch (jsonError) {
              console.error("❌ Error parsing Gemini response as JSON:", jsonError);
              // Try to extract JSON from text (in case Gemini added explanation text)
              const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
              } else {
                throw new Error("Could not parse response as JSON");
              }
            }

            console.log("✅ Parsed Response from Gemini:", result);

            return {
              ...item,
              score: result.score,
              feedback: result.feedback,
              questionNumber: keyItem.questionNumber, // Use keyItem from the outer loop
            };
          } catch (error) {
            console.error("❌ Error with Gemini for question:", item.question, error);
            return {
              ...item,
              score: 0,
              feedback: "Error evaluating answer: " + error.message,
              questionNumber: keyItem.questionNumber, // Use keyItem from the outer loop
            };
          }
        })
      );

      setGradingResults(responses);
    } catch (error) {
      console.error("API request failed:", error);
      setError(`Error processing answers: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total score
  const totalScore = gradingResults.reduce((sum, result) => sum + result.score, 0);
  const maxPossibleScore = gradingResults.length * 5;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Answer Sheet Evaluation System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Upload Answer Key PDF */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Upload Answer Key</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "answerKey")}
            className="border p-2 w-full rounded"
          />
          {answerKeyText && (
            <div className="mt-2 text-sm text-green-600">
              ✓ Answer key uploaded successfully
            </div>
          )}
        </div>

        {/* Upload Student's Answer PDF */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Upload Student Answer Sheet</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "student")}
            className="border p-2 w-full rounded"
          />
          {studentText && (
            <div className="mt-2 text-sm text-green-600">
              ✓ Student answers uploaded successfully
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Evaluate Answers Button */}
      <div className="mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          onClick={evaluateAnswers}
          disabled={isLoading || !answerKeyText || !studentText}
          style={{
            cursor: isLoading || !answerKeyText || !studentText ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Evaluating..." : "Grade Answer Sheet"}
        </button>
      </div>

      {/* Display Results */}
      {gradingResults.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Evaluation Results</h3>

          {/* Summary Score */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-lg font-bold">
              Total Score: {totalScore} / {maxPossibleScore} (
              {Math.round((totalScore / maxPossibleScore) * 100)}%)
            </p>
          </div>

          {/* Question-by-question breakdown */}
          <div className="space-y-4">
            {gradingResults.map((result, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Question {result.questionNumber}</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    Score: {result.score}/5
                  </span>
                </div>

                <p className="mb-2">
                  <strong>Topic:</strong> {result.question.split(": ")[1]}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium mb-1">Answer Key:</p>
                    <p className="text-sm">{result.answer_key}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium mb-1">Student's Answer:</p>
                    <p className="text-sm">{result.student_answer}</p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded">
                  <p className="font-medium mb-1">Feedback:</p>
                  <p className="text-sm">{result.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerEvaluator;