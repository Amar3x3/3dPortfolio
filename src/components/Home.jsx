import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text, Html, OrbitControls } from '@react-three/drei'; // Added Text and Html for interactivity
import Loader from "./Loader";
import Driod_light from "../models/Driod_light";
import * as THREE from "three";

// StarField Component for Moving Stars
const StarField = () => {
  const pointsRef = useRef();

  // Generate random positions for stars
  const stars = React.useMemo(() => {
    const starPositions = new Float32Array(1000 * 3); // 1000 stars with 3 coordinates each (x, y, z)
    for (let i = 0; i < starPositions.length; i++) {
      starPositions[i] = (Math.random() - 0.5) * 10; // Spread stars across a cube
    }
    return starPositions;
  }, []);

  // Rotate the star field for movement
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005; // Slow rotation for star motion
    }
  });

  return (
    <Points ref={pointsRef} positions={stars} stride={3}>
      <PointMaterial size={0.02} sizeAttenuation depthWrite={false} color="white" />
    </Points>
  );
};

const Home = () => {
  // State to track the current section (head, heart, back, bottom)
  const [section, setSection] = useState("head");

  // Position references for different droid parts
  const headPosition = [0, 2, 3];   // Example position for head text
  const heartPosition = [0, 1, 3];  // Example position for heart (projects)
  const backPosition = [0, 1, -3];  // Example position for back (achievements)
  const bottomPosition = [0, -1, 3]; // Example position for bottom (education)

  // Rotating control state
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="homepage">
      <div className="title">Home</div>

      <Canvas
        className="model"
        camera={{ near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }} // Disable alpha to use a solid background color
        style={{ background: "#1f3b5c" }} // Cool blue as an example
      >
        {/* Add orbit controls for interaction */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        <StarField />

        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <directionalLight position={[5, 5, 5]} intensity={6} castShadow />
          <ambientLight intensity={0.3} />
          <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <hemisphereLight skyColor={'#b1e1ff'} groundColor={'#444444'} intensity={0.7} />

          {/* Droid Model */}
          <Driod_light position={[0, -2.3, 3]} scale={[1, 1, 1]} rotation={[0.3, 0, 0]} />

          {/* Dynamic Text Display on the droid's body */}
          {section === "head" && (
            <Text position={headPosition} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
              Hello, I am [Your Name]! Welcome to my portfolio.
            </Text>
          )}
          {section === "heart" && (
            <Text position={heartPosition} fontSize={0.3} color="cyan" anchorX="center" anchorY="middle">
              My Projects: Project 1, Project 2, Project 3...
            </Text>
          )}
          {section === "back" && (
            <Text position={backPosition} fontSize={0.3} color="yellow" anchorX="center" anchorY="middle" rotation={[0, Math.PI, 0]}>
              Achievements: Award 1, Award 2, Award 3...
            </Text>
          )}
          {section === "bottom" && (
            <Text position={bottomPosition} fontSize={0.3} color="green" anchorX="center" anchorY="middle">
              Education: University, Courses, Certifications...
            </Text>
          )}

          {/* Optional: Add an HTML Next Button on the droid's head */}
          <Html position={[0, 2.5, 3]} center>
            <button
              onClick={() => {
                if (section === "head") setSection("heart");
                else if (section === "heart") setSection("back");
                else if (section === "back") setSection("bottom");
                else setSection("head");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff9000",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Next Section
            </button>
          </Html>

        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;