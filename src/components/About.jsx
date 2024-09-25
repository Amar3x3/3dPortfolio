import React, { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Halo from "../models/Halo";
import Loader from "./Loader";
import Intro from "./Intro";
import Spaceship from "../models/Spaceship";

// Component to render different sections
const SectionContent = ({ title, content }) => {
  return (
    <div className="cards" style={{ padding: "10px", backgroundColor: "#9b4f17",color:"white", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};



const About = () => {
  const [section, setSection] = useState(0); // State to track which section we're on

  const handleNext = () => {
    setSection((prevSection) => (prevSection + 1) % 3); // Cycle through 3 sections
  };

  return (
    <div className="about-page" >
      <Canvas style={{ width: '100vw', height: '100vh', zIndex:'0' }} camera={{ position: [0, 2, 5], near: 0.1, far: 1000 }}>
        {/* <Halo position={[-5.5, 0, 0]} scale={[1, 1, 1]} rotation={[0, 0 , 0]}/> */}
        {/* <Spaceship position={[0, 1, -180]} scale={[1,1,1]}/> */}
        <directionalLight position={[5,5,5]} intensity={9}/>
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true}/>
      </Canvas>
      
      
      
    </div>
  );
};

export default About;
