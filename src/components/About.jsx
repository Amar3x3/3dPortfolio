import React, { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Anime_class_room from "../models/Anime_class_room";
import Loader from "./Loader";
import Intro from "./Intro";

// Component to render different sections
const SectionContent = ({ title, content }) => {
  return (
    <div className="cards" style={{ padding: "10px", backgroundColor: "#9b4f17",color:"white", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const Scene = ({ section }) => {
  // Define camera positions for different sections (backbench, middle bench, front)
  const cameraPositions = [
    { position: [-0.3, -0.3, 1.9], name: "Intro" },      // Backbench
    { position: [-0.3, -0.5, 1.8], name: "Projects" },    // Middle Bench
    { position: [0, 0, 2], name: "Achievements" } // Front Bench
  ];

  // Access the camera using useThree
  const { camera } = useThree();

  // Smooth camera transition between sections
  useFrame(() => {
    const targetPosition = cameraPositions[section].position;
    camera.position.lerp(
      { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] },
      0.1
    );
    camera.lookAt(0, 0, 0); // Ensure camera is always looking at the center of the classroom
  });

  return (
    <>
      {/* Render Classroom */}
      <Suspense fallback={<Loader />}>
        {/* Classroom Model */}
        <Anime_class_room position={[0, -1, 0]} scale={[1, 1, 1]} rotation={[0.4, 3, 0]} />

        {/* Render different sections of content at different positions */}
        {section === 0 && (
          <Html position={[-0.3, -0.1, 0.8]} center>
            <Intro/>
          </Html>
        )}

        {section === 1 && (
          <Html position={[0, 1, 4]} center>
            <SectionContent 
              title="My Projects" 
              content="Project 1, Project 2, Project 3..." 
            />
          </Html>
        )}

        {section === 2 && (
          <Html position={[0, 0, 1.5]} center>
            <SectionContent 
              title="Achievements" 
              content="Award 1, Award 2, Award 3..." 
            />
          </Html>
        )}
      </Suspense>

      {/* Orbit controls (optional) */}
      {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
    </>
  );
};

const About = () => {
  const [section, setSection] = useState(0); // State to track which section we're on

  const handleNext = () => {
    setSection((prevSection) => (prevSection + 1) % 3); // Cycle through 3 sections
  };

  return (
    <div className="about-page" >
      <Canvas style={{ width: '100vw', height: '100vh', zIndex:'0' }} camera={{ position: [0, 2, 10], fov: 50 }}>
        <Scene section={section} />
      </Canvas>
      <button 
          onClick={handleNext}
          style={{
            position:"absolute",
            top:"100px",
            left:"0",
            zIndex:"1",
            padding: "10px 20px",
            backgroundColor: "#ff9000",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next Section
        </button>
      {/* Control Panel */}
      
    </div>
  );
};

export default About;
