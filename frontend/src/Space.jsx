"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  Text,
  PerspectiveCamera,
  Html,
  Billboard,
} from "@react-three/drei";
import { generateText } from "ai"; // Import from AI SDK [^1]
import { openai } from "@ai-sdk/openai"; // Import OpenAI integration [^1]
import * as THREE from "three";

// Planet data with educational information
const PLANETS = [
  {
    id: "sun",
    name: "Sun",
    radius: 5,
    position: [0, 0, 0],
    texture: "/placeholder.svg?height=1024&width=1024",
    color: "#FDB813",
    rotationSpeed: 0.001,
    facts: [
      "The Sun is a star at the center of our Solar System",
      "It is about 4.6 billion years old",
      "The Sun's diameter is about 1.39 million kilometers",
      "It makes up 99.86% of the Solar System's mass",
    ],
  },
  {
    id: "mercury",
    name: "Mercury",
    radius: 0.8,
    position: [10, 0, 0],
    orbitRadius: 10,
    orbitSpeed: 0.008,
    rotationSpeed: 0.004,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#A5A5A5",
    facts: [
      "Mercury is the smallest planet in our Solar System",
      "It has no atmosphere to retain heat",
      "A day on Mercury lasts 59 Earth days",
      "Mercury has a highly elliptical orbit",
    ],
  },
  {
    id: "venus",
    name: "Venus",
    radius: 1.2,
    position: [15, 0, 0],
    orbitRadius: 15,
    orbitSpeed: 0.006,
    rotationSpeed: 0.002,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#E6C229",
    facts: [
      "Venus is the hottest planet in our Solar System",
      "It rotates in the opposite direction to most planets",
      "Venus has a thick atmosphere of carbon dioxide",
      "A day on Venus is longer than its year",
    ],
  },
  {
    id: "earth",
    name: "Earth",
    radius: 1.3,
    position: [20, 0, 0],
    orbitRadius: 20,
    orbitSpeed: 0.005,
    rotationSpeed: 0.005,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#4F97A3",
    facts: [
      "Earth is the only known planet with liquid water on its surface",
      "It has one natural satellite - the Moon",
      "Earth's atmosphere is rich in nitrogen and oxygen",
      "It has a strong magnetic field that protects us from solar radiation",
    ],
  },
  {
    id: "mars",
    name: "Mars",
    radius: 1.1,
    position: [25, 0, 0],
    orbitRadius: 25,
    orbitSpeed: 0.004,
    rotationSpeed: 0.005,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#E27B58",
    facts: [
      "Mars is known as the Red Planet due to iron oxide on its surface",
      "It has the largest volcano in the Solar System - Olympus Mons",
      "Mars has two small moons: Phobos and Deimos",
      "It experiences dust storms that can cover the entire planet",
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    radius: 3,
    position: [35, 0, 0],
    orbitRadius: 35,
    orbitSpeed: 0.002,
    rotationSpeed: 0.01,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#C88B3A",
    facts: [
      "Jupiter is the largest planet in our Solar System",
      "It has a Great Red Spot - a giant storm that has lasted for centuries",
      "Jupiter has at least 79 moons",
      "It is primarily composed of hydrogen and helium",
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    radius: 2.5,
    position: [45, 0, 0],
    orbitRadius: 45,
    orbitSpeed: 0.0015,
    rotationSpeed: 0.009,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#E4CD9E",
    hasRings: true,
    facts: [
      "Saturn is known for its spectacular ring system",
      "It has the lowest density of all planets - it would float in water",
      "Saturn has at least 82 moons",
      "Its rings are made mostly of ice particles with some rocky debris",
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    radius: 1.8,
    position: [55, 0, 0],
    orbitRadius: 55,
    orbitSpeed: 0.001,
    rotationSpeed: 0.007,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#93C1C9",
    facts: [
      "Uranus rotates on its side - its axis is tilted at about 98 degrees",
      "It appears blue-green due to methane in its atmosphere",
      "Uranus has 27 known moons",
      "It is the coldest planetary atmosphere in the Solar System",
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    radius: 1.7,
    position: [65, 0, 0],
    orbitRadius: 65,
    orbitSpeed: 0.0008,
    rotationSpeed: 0.008,
    texture: "/placeholder.svg?height=512&width=512",
    color: "#3E66F9",
    facts: [
      "Neptune is the windiest planet with speeds up to 2,100 km/h",
      "It has 14 known moons",
      "Neptune takes 165 Earth years to orbit the Sun",
      "It has a Great Dark Spot similar to Jupiter's Great Red Spot",
    ],
  },
];

// Planet component with orbit animation
function Planet({ planet, onClick, isSelected }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);

  // Load texture if available
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(planet.texture, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [planet.texture]);

  // Animate planet rotation and orbit
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += planet.rotationSpeed * delta;
    }

    // Orbit animation
    if (orbitRef.current && planet.id !== "sun") {
      orbitRef.current.rotation.y += (planet.orbitSpeed || 0.001) * delta;
    }
  });

  // For sun, just render the sphere
  if (planet.id === "sun") {
    return (
      <mesh
        ref={meshRef}
        position={planet.position}
        onClick={() => onClick(planet)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={0.5}
          map={texture}
        />
        {hovered && (
          <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
            <Text
              position={[0, planet.radius + 1, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {planet.name}
            </Text>
          </Billboard>
        )}
      </mesh>
    );
  }

  // For other planets, render with orbit
  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.orbitRadius, 0, 0]}
        onClick={() => onClick(planet)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          map={texture}
          metalness={0.2}
          roughness={0.8}
        />

        {/* Render rings for Saturn */}
        {planet.hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.radius + 0.5, planet.radius + 2, 64]} />
            <meshStandardMaterial
              color="#E4CD9E"
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        )}

        {/* Show name on hover */}
        {hovered && (
          <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
            <Text
              position={[0, planet.radius + 0.5, 0]}
              fontSize={0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {planet.name}
            </Text>
          </Billboard>
        )}

        {/* Highlight selected planet */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[planet.radius + 0.1, 32, 32]} />
            <meshBasicMaterial
              color="white"
              wireframe={true}
              transparent={true}
              opacity={0.3}
            />
          </mesh>
        )}
      </mesh>

      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[planet.orbitRadius - 0.05, planet.orbitRadius + 0.05, 128]}
        />
        <meshBasicMaterial
          color="white"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Camera controller for smooth transitions
function CameraController({ target, distance }) {
  const { camera } = useThree();
  const currentPosition = useRef(new THREE.Vector3(0, 20, 50));
  const targetPosition = useRef(new THREE.Vector3(0, 20, 50));

  useEffect(() => {
    if (target) {
      // Calculate new camera position based on target
      const targetVector = new THREE.Vector3(
        target.position[0] || 0,
        target.position[1] || 0,
        target.position[2] || 0
      );

      // Set camera to look at target from a distance
      const offset = new THREE.Vector3(
        target.radius * distance * 1.5,
        target.radius * distance,
        target.radius * distance * 2
      );

      targetPosition.current = new THREE.Vector3()
        .copy(targetVector)
        .add(offset);
    }
  }, [target, distance]);

  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    if (targetPosition.current) {
      currentPosition.current.lerp(targetPosition.current, 0.05);
      camera.position.copy(currentPosition.current);

      // Look at target
      if (target) {
        const targetVector = new THREE.Vector3(
          target.position[0] || 0,
          target.position[1] || 0,
          target.position[2] || 0
        );
        camera.lookAt(targetVector);
      }
    }
  });

  return null;
}

// Information panel that displays in 3D space
function InfoPanel({ planet, onClose, onStartQuiz }) {
  if (!planet) return null;

  return (
    <Html
      position={[
        planet.position[0] + planet.radius * 2,
        planet.position[1] + planet.radius * 2,
        planet.position[2],
      ]}
      distanceFactor={10}
      transform
      occlude
    >
      <div className="bg-black bg-opacity-80 text-white p-4 rounded-lg w-64">
        <h2 className="text-xl font-bold mb-2">{planet.name}</h2>
        <ul className="mb-4 text-sm">
          {planet.facts.map((fact, index) => (
            <li key={index} className="mb-2">
              • {fact}
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            onClick={onStartQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Take Quiz
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Html>
  );
}

// Quiz component that appears in 3D space
function QuizPanel({ planet, onComplete, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // Generate quiz questions using AI
  useEffect(() => {
    const generateQuestions = async () => {
      if (!planet) return;

      setLoading(true);

      try {
        // Use AI SDK to generate quiz questions [^1]
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Create 3 multiple-choice quiz questions about ${
            planet.name
          } based on these facts: 
                  ${planet.facts.join(". ")}
                  
                  Format as a JSON array with this structure:
                  [
                    {
                      "question": "Question text",
                      "options": ["Option A", "Option B", "Option C", "Option D"],
                      "correctAnswer": 0
                    }
                  ]
                  
                  Make sure the correctAnswer is the index (0-3) of the correct option.
                  Only return the JSON array, nothing else.`,
        });

        // Parse the generated questions
        const parsedQuestions = JSON.parse(text);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error generating questions:", error);
        // Fallback questions if AI generation fails
        setQuestions([
          {
            question: `What is a key characteristic of ${planet.name}?`,
            options: [
              planet.facts[0],
              "It has a solid diamond core",
              "It's the oldest planet in our solar system",
              "It has no natural satellites",
            ],
            correctAnswer: 0,
          },
          {
            question: `How long is a day on ${planet.name}?`,
            options: [
              "Exactly the same as Earth",
              "Twice as long as Earth",
              planet.facts[1],
              "Half as long as Earth",
            ],
            correctAnswer: 2,
          },
        ]);
      }

      setLoading(false);
    };

    generateQuestions();
  }, [planet]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);

    // Check if answer is correct
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);

      // Report completion
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  if (!planet) return null;

  return (
    <Html
      position={[
        planet.position[0] + planet.radius * 2,
        planet.position[1] + planet.radius * 2,
        planet.position[2],
      ]}
      distanceFactor={10}
      transform
      occlude
    >
      <div className="bg-black bg-opacity-80 text-white p-4 rounded-lg w-80">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Generating quiz questions...</p>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-2xl font-bold mb-4">
              Score: {score}/{questions.length}
            </p>
            <p className="mb-4">
              {score === questions.length
                ? "Perfect! You're a space expert!"
                : score > questions.length / 2
                ? "Great job! You know your planets well."
                : "Keep exploring to learn more about our solar system!"}
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">{planet.name} Quiz</h2>
            <div className="mb-1 text-xs text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className="w-full bg-gray-700 h-1 mb-4">
              <div
                className="bg-blue-500 h-1"
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                }}
              ></div>
            </div>

            <p className="mb-4">{questions[currentQuestion]?.question}</p>

            <div className="space-y-2 mb-4">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-2 rounded ${
                    selectedAnswer === index
                      ? selectedAnswer ===
                        questions[currentQuestion].correctAnswer
                        ? "bg-green-600"
                        : "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="flex justify-between">
                <div
                  className={`text-sm ${
                    selectedAnswer === questions[currentQuestion].correctAnswer
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedAnswer === questions[currentQuestion].correctAnswer
                    ? "Correct!"
                    : `Incorrect. The correct answer is: ${
                        questions[currentQuestion].options[
                          questions[currentQuestion].correctAnswer
                        ]
                      }`}
                </div>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Html>
  );
}

// Main game component
export default function Space() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(5);
  const [gameState, setGameState] = useState("intro"); // intro, exploring, mission
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [missionTarget, setMissionTarget] = useState(null);
  const [aiGuide, setAiGuide] = useState(
    "Welcome to the Solar System Explorer! Click on any planet to learn more about it."
  );
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);

  // Handle planet selection
  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setShowInfo(true);
    setShowQuiz(false);
    generateAiGuide(planet);
  };

  // Start quiz for selected planet
  const handleStartQuiz = () => {
    setShowInfo(false);
    setShowQuiz(true);
  };

  // Handle quiz completion
  const handleQuizComplete = (score, total) => {
    // Add to completed quizzes
    setCompletedQuizzes([
      ...completedQuizzes,
      {
        planetId: selectedPlanet.id,
        planetName: selectedPlanet.name,
        score,
        total,
      },
    ]);

    // Check if mission is complete
    if (missionTarget && missionTarget.id === selectedPlanet.id) {
      setGameState("missionComplete");
      generateAiGuide({ id: "mission_complete" });
    }
  };

  // Close info panel
  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  // Close quiz panel
  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  // Start game
  const handleStartExploring = () => {
    setGameState("exploring");
    generateAiGuide({ id: "start_exploring" });
  };

  // Start mission
  const handleStartMission = () => {
    // Randomly select a planet for the mission
    const availablePlanets = PLANETS.filter((p) => p.id !== "sun");
    const randomPlanet =
      availablePlanets[Math.floor(Math.random() * availablePlanets.length)];

    setMissionTarget(randomPlanet);
    setGameState("mission");
    generateAiGuide({ id: "mission_start", target: randomPlanet });
  };

  // Generate AI guide text
  const generateAiGuide = async (context) => {
    setIsGeneratingGuide(true);

    try {
      let prompt = "";

      if (context.id === "start_exploring") {
        prompt =
          "You are an AI space guide. Give a brief, enthusiastic introduction to exploring the solar system. Keep it under 150 characters.";
      } else if (context.id === "mission_start") {
        prompt = `You are an AI space guide. Create a brief mission description for exploring ${context.target.name}. Mention 1-2 interesting facts. Keep it under 150 characters.`;
      } else if (context.id === "mission_complete") {
        prompt =
          "You are an AI space guide. Congratulate the student on completing their space mission. Be encouraging and mention they can start a new mission. Keep it under 150 characters.";
      } else {
        // For planet selection
        prompt = `You are an AI space guide. Give a brief, interesting fact about ${context.name} that's not already in the displayed facts. Keep it under 150 characters.`;
      }

      // Use AI SDK to generate guide text [^1]
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      });

      setAiGuide(text);
    } catch (error) {
      console.error("Error generating AI guide:", error);

      // Fallback text
      if (context.id === "start_exploring") {
        setAiGuide(
          "Welcome to your solar system adventure! Click on any planet to learn more about it."
        );
      } else if (context.id === "mission_start") {
        setAiGuide(
          `Your mission: Explore ${context.target.name} and complete the quiz to earn your explorer badge!`
        );
      } else if (context.id === "mission_complete") {
        setAiGuide(
          "Mission complete! You've earned your explorer badge. Ready for another mission?"
        );
      } else {
        setAiGuide(
          `${context.name} is waiting to be explored! Click to learn more about this fascinating world.`
        );
      }
    }

    setIsGeneratingGuide(false);
  };

  return (
    <div className="w-full h-screen relative">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 20, 50]} fov={60} />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FDB813" />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Solar system */}
        <Suspense fallback={null}>
          {PLANETS.map((planet) => (
            <Planet
              key={planet.id}
              planet={planet}
              onClick={handlePlanetClick}
              isSelected={selectedPlanet && selectedPlanet.id === planet.id}
            />
          ))}
        </Suspense>

        {/* Information panels */}
        {showInfo && selectedPlanet && (
          <InfoPanel
            planet={selectedPlanet}
            onClose={handleCloseInfo}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {showQuiz && selectedPlanet && (
          <QuizPanel
            planet={selectedPlanet}
            onComplete={handleQuizComplete}
            onClose={handleCloseQuiz}
          />
        )}

        {/* Camera controller */}
        <CameraController target={selectedPlanet} distance={cameraDistance} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          enabled={!selectedPlanet}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        {/* AI Guide */}
        <div className="bg-black bg-opacity-70 text-white p-3 rounded-lg max-w-2xl mx-auto mb-4 pointer-events-auto">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <div className="font-bold text-blue-400 mb-1">AI Space Guide</div>
              <p>{isGeneratingGuide ? "Analyzing space data..." : aiGuide}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          {/* Mission info */}
          {gameState === "mission" && missionTarget && (
            <div className="bg-black bg-opacity-70 text-white p-3 rounded-lg pointer-events-auto">
              <div className="font-bold text-yellow-400 mb-1">
                Current Mission
              </div>
              <p>Explore {missionTarget.name} and complete the quiz</p>
            </div>
          )}

          {/* Completed quizzes */}
          <div className="bg-black bg-opacity-70 text-white p-3 rounded-lg ml-auto pointer-events-auto">
            <div className="font-bold text-green-400 mb-1">
              Exploration Progress
            </div>
            <p>
              {completedQuizzes.length} of {PLANETS.length - 1} planets explored
            </p>
            {completedQuizzes.length > 0 && (
              <div className="mt-2 text-xs">
                <div className="font-bold mb-1">Completed:</div>
                <ul>
                  {completedQuizzes.map((quiz, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{quiz.planetName}</span>
                      <span className="text-yellow-400">
                        {quiz.score}/{quiz.total}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Camera controls */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-lg">
        <div className="text-xs mb-1">Camera Distance</div>
        <input
          type="range"
          min="3"
          max="10"
          step="0.5"
          value={cameraDistance}
          onChange={(e) => setCameraDistance(Number.parseFloat(e.target.value))}
          className="w-32"
        />
      </div>

      {/* Game state screens */}
      {gameState === "intro" && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-xl max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-blue-400 mb-4">
              3D Solar System Explorer
            </h1>
            <p className="text-white mb-6">
              Embark on an immersive journey through our solar system. Explore
              planets, learn fascinating facts, and test your knowledge with
              AI-powered quizzes.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-blue-300 mb-2">Features</h3>
                <ul className="text-left text-gray-300 text-sm space-y-1">
                  <li>• Realistic 3D planet models</li>
                  <li>• Interactive exploration</li>
                  <li>• AI-powered educational content</li>
                  <li>• Knowledge quizzes for each planet</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold text-blue-300 mb-2">Controls</h3>
                <ul className="text-left text-gray-300 text-sm space-y-1">
                  <li>• Click on planets to select them</li>
                  <li>• Drag to rotate the view</li>
                  <li>• Scroll to zoom in/out</li>
                  <li>• Use slider to adjust camera distance</li>
                </ul>
              </div>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleStartExploring}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Free Exploration
              </button>
              <button
                onClick={handleStartMission}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Start Mission
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === "missionComplete" && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-xl max-w-md text-center">
            <div className="w-20 h-20 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">
              Mission Complete!
            </h2>
            <p className="text-white mb-6">
              Congratulations! You've successfully explored{" "}
              {missionTarget?.name} and completed the quiz.
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleStartMission}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                New Mission
              </button>
              <button
                onClick={handleStartExploring}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Free Exploration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
