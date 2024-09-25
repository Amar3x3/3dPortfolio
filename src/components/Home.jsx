import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial, Text, Html } from "@react-three/drei";
import Loader from "./Loader";
import Intro from "./Intro";
import Halo from "../models/Halo";
import Projects from "./Projects";
import Achivements from "./Achivements";
import Experience from "./Experience";
import Spaceship from "../models/Spaceship";

// StarField component
const StarField = () => {
  const pointsRef = useRef();
  
  const stars = React.useMemo(() => {
    const starPositions = new Float32Array(2000 * 3);
    for (let i = 0; i < starPositions.length; i++) {
      starPositions[i] = (Math.random() - 0.5) * 10;
    }
    return starPositions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Points ref={pointsRef} positions={stars} stride={3}>
      <PointMaterial size={0.02} sizeAttenuation depthWrite={false} color="yellow" />
    </Points>
  );
};

const Scene = ({ section, cameraRef }) => {
  const spaceShipPosition = ()=>{
    console.log(section);
    let sp1 = -1100; let sp2 = -13.9; let sp3 = -1100; let r2 = 1.4;
    if(section === 1){
      console.log("try "+section);
        sp1 = -40; sp2 = -13.9; sp3= -1100; 
    }
    if(section === 3 || section === 4){
        sp1 = -500;  
        r2 = 0.7
    }
    return {sp1, sp2, sp3, r2}
  }
  const{sp1, sp2, sp3, r2} = spaceShipPosition();
  const scaleModel = ()=>{
    let hd1 = 0; let ht1 = 1; let b1 = 1; let s1 = -1; let l1 = -1;        let og1 = 0;
    let hd2 =1.7; let ht2 = 1.5; let b2 = 0.5; let s2 = 0.5; let l2 = 1.5; let og2 = -1.3;
    let hd3 =5; let ht3 = 5; let b3 = 5; let s3 = 5; let l3 = 5;           let og3 = 4.2;
    if(window.innerWidth < 768){
      hd1 = 0;   ht1 = 1;    b1 = 1;   s1 = -1;   l1 = -1;  og1 = 0;    
      hd2 = 1.7; ht2 = 1.5;  b2 = 0.5; s2 = 0.5;  l2 = 1.5; og2 = -1.3;
      hd3 = 5;   ht3 = 5;    b3 = 5;   s3 = 5;    l3 = 5;   og3 = 3;
    }
    return {hd1, hd2, hd3, ht1, ht2, ht3, b1, b2, b3, s1, s2, s3, l1, l2, l3, og1, og2, og3};
  }
  const positionElements=()=>{
    let hed1 = 0; let het1 = 0; let bi1 = 0.1; let st1 = -2.5; let lg1 = -4;        
    let hed2 = 1.74; let het2 = 1.9; let bi2 = 2.2; let st2 = -0.7; let lg2 = 0.8; 
    let hed3 = 4.7; let het3 = 0; let bi3 = -1; let st3 = 0; let lg3 = 0;
    
    if(window.innerWidth < 750){
      // -0.6, 2.5, 0
      hed1 = -1.9; het1 = -1.4; bi1 = -1.3; st1 = -1.1; lg1 = -1;
      hed2 = 0.8;  het2 = 2.1;  bi2 = 2.5;  st2 = 0;    lg2 = 0.8;
      hed3 = -1;   het3 = 0;    bi3 = 0;    st3 = 0;    lg3 = 0;
    }

    return{hed1, hed2, hed3, het1, het2, het3, bi1, bi2, bi3, st1, st2, st3, lg1, lg2, lg3};
  }
  const{hed1, hed2, hed3, het1, het2, het3, bi1, bi2, bi3, st1, st2, st3, lg1, lg2, lg3} = positionElements();

  const{hd1, hd2, hd3, ht1, ht2, ht3, b1, b2, b3, s1, s2, s3, l1, l2, l3, og1, og2, og3}= scaleModel();
  // Define camera positions for different sections
  const cameraPositions = [
    { position: [hd1, hd2, hd3], name: "head" },    // Head
    { position: [ht1, ht2,  ht3], name: "heart" },   // Heart
    { position: [b1, b2, b3], name: "biceps" }, // Biceps
    { position: [s1, s2, s3], name: "stomach" },  // Stomach
    { position: [l1, l2, l3], name: "legs" }, // Legs
  ];
  
  

  // Update the camera position in the animation loop
  useFrame(() => {
    const targetPosition = cameraPositions[section].position;
    if (cameraRef.current) {
      cameraRef.current.position.lerp(
        { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] },
        0.1
      );
      cameraRef.current.lookAt(0, 0, 0); // Ensure camera is always looking at the center of the model
    }
  });

  return (
    <>
      {/* StarField is included */}
      <StarField />

      <Suspense fallback={<Loader/>}>
        {/* Lighting */}
        <ambientLight intensity={4} />
        <directionalLight position={[5, 5, 5]} intensity={5} />

        {/* 3D Model */}
        {/* <Driod_light position={[first, second, third]} scale={[1, 1, 1]} rotation={[0, 0, 0]} /> */}
        <Halo position={[og1, og2, og3]} scale={[1, 1, 1]} rotation={[0, 0, 0]}/>
        
        <Spaceship position={[sp1, sp2, sp3]} rotation={[0, r2 ,0.7]}/>
        
        {/* Display different text based on the section */}
        {section === 0 && (
          <Html position={[hed1, hed2, hed3]}  color="white" anchorX="center" anchorY="middle">
            <Intro/>
          </Html>
        )}
        {section === 1 && (
          <Html position={[het1, het2, het3]} fontSize={0.3} color="cyan" anchorX="center" anchorY="middle">
            <Projects/>
          </Html>
        )}
        {section === 2 && (
          <Html position={[bi1, bi2, bi3]} fontSize={0.3} color="yellow" anchorX="center" anchorY="middle">
            <Achivements/>
          </Html>
        )}
        {section === 3 && (
          <Html position={[st1, st2, st3]} fontSize={0.3} color="green" anchorX="center" anchorY="middle">
            <Experience/>
          </Html>
        )}
        {section === 4 && (
          <Html position={[lg1, lg2, lg3]} fontSize={0.3} color="purple" anchorX="center" anchorY="middle">
            <div className="intro">
              <h1 className="title">Contact Me</h1>
              <p className="text">amar3152002@gmail.com</p>
            </div>
          </Html>
        )}
      </Suspense>

      {/* Orbit controls (optional, disabled rotation) */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

const Home = () => {
  const cameraRef = useRef(); // Reference to the camera
  const [section, setSection] = useState(0); // Track the current section

  // Function to handle the camera panning to the next section
  const handleNext = () => {
    setSection((prevSection) => (prevSection + 1) % 5); // Go to next section
  };

  return (
    <div className="homepage">
      <Canvas
        className="model"
        camera={{ position: [0, 2, 5], near: 0.1, far: 1000 }}
        onCreated={({ camera }) => {
          cameraRef.current = camera; // Set the camera reference
        }}
      >
        {/* Scene that moves camera on button click */}
        {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
        <Scene section={section} cameraRef={cameraRef} />
      </Canvas>

      {/* Next Button */}
      <div onClick={handleNext} style={{ position: "absolute", top: 30, right: 90, fontSize: 31 }} className="live-btn">
       Next Section
      </div>
    </div>
  );
};

export default Home;
