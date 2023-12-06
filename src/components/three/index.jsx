import { anglesToRadians } from "../../utils/angle";
import * as THREE from "three";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Car from "./Car.jsx";

//everything you see in a scene is called a mesh
//they comprise of two things
//their shape
//their surface/texture

//there are many geometries three js offer out of the box
//Example:
//
//const geometry = new THREE.SphereGeometry(15,32,16)
//const material = new THREE.MeshBasicMaterial({color:0xffff00})
//const sphere = new THREE.Mesh(geometry,material)
//scene.add(sphere)
//
//SphereGeometry(radius:Float ,widthSegments :integer,heightSegments :integer,phiStart:Float ,phiLength:Float , thetaStart:Float ,thetaLength:Float )
//create a new instance of the geometry
//create a new instance of the material
//create a new instance of the mesh using the geometry and material as parameters
//add the mesh to your scene
//
//It is impossible to create a curve since screens are made up of pixels, so we use
//a series of straight lines to give the illusiong of curvature
//
//The segments tell how many partitions we will use when making the curvature of the shape
//The three phi's define the initial angle of the 3D object

//Making a plane
//const geometry=new THREE.PlaneGeometry(1,1);
//const material=new THREE.MeshBasicMaterial({color: 0xffff00,side:THREE.DoubleSide})
//const plane=new THREE Mesh(geometry,material)
//scene.add(plane)

//The default will have the plane facing you

//Orbital controls lets you focus the Perspective Camera onto the mesh object
//You can freely control the polar angles and zoom when you interact with the canvas on the browser
//the more you come down, your angle increases
//the more you come up, your angle decreases
//looking from the top, you have an angle of zero

//orbit controls and perspective camera fight for control on how the camera is positioned

//not all light sources produce shadows
//not all material have reflective properties
//you need a surface to cast shadows on

//ambientLight is a like that comes from everywhere and not a single source
//it cannot cast a shadow

//directionalLight has a direction and can make a shadow

//if you want a directional light from a uniform direction, ie. from left to right
//it will create a shadow the same size of the object

//hemisphere light, let's you have have different colors depending if it's on the
//north versus the south hemisphere. It does not cast shadows

//Environment is a mesh and takes a geometry and material
//meshBasicMaterial is unaffected by light and can be used in the environment to light
//up the background without worrying about light

export default function Three() {
  //usually runs at 60FPS and creates a render loops
  //refresh rate is the maximum number of frames per second
  //and is dependent on your hardware
  //requestAnimationFrame has a callback
  //useFrame is like that, but with state
  //state.mouse coordinates are Vector2 and are normalized
  //meaning it goes off of percentages of the window screen
  //goes from -1 to 1 in the x and y direction

  // useFrame((state) => {
  //   console.log(state.mouse)

  // });

  //to have control of the camera in between renders
  //we set a ref to the orbit controls component
  const orbitControlsRef = useRef(null);
  const sphereRef = useRef(null);
  //property of orbit controls
  //dampingFactor: dampens smooths the stop
  //enableDamping,enablePan,enableZoom are booleans for the controls
  //getters and setters for all the camera angles

  useEffect(() => {
    if (!orbitControlsRef.current) return;
    if (orbitControlsRef.current) console.log(orbitControlsRef.current);
  }, [orbitControlsRef]);
  useEffect(() => {
    // if (!sphereRef.current) return;
    if (sphereRef.current) console.log(sphereRef.current);
    // gsap.to(sphereRef.current.position, {
    //   y: 1 + 0.5,
    //   duration: 3,
    //   ease: "bounce",
    // });
    const timeline = gsap.timeline();
    timeline.from(
      sphereRef.current.position,
      {
        y: 3 + 0.5,
        duration: 3,
        ease: "bounce",
      },
      0
    );
    timeline.from(
      sphereRef.current.position,
      {
        z: -4,
        duration: 5,
        ease: "linear",
      },
      0
    );
    timeline.to(
      sphereRef.current.position,
      {
        z: 5,
        duration: 3.5,
        ease: "linear",
      },
      ">+=0"
    );
  }, [sphereRef]);

  useFrame((state) => {
    if (!orbitControlsRef.current) return;
    const { x, y } = state.mouse;
    // orbitControlsRef.current.getAzimuthalAngle()
    // orbitControlsRef.current.getPolarAngle()

    //when a camera is manually changed, we need to inform the camera
    //we made the change
    orbitControlsRef.current.setAzimuthalAngle(-x * anglesToRadians(90));
    orbitControlsRef.current.setPolarAngle(
      anglesToRadians(80) - y * 1.5 * anglesToRadians(20)
    );
    orbitControlsRef.current.update();
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={anglesToRadians(60)}
        maxPolarAngle={anglesToRadians(80)}
      />

      <mesh position={[0, 0.5, 0]} castShadow ref={sphereRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={"#a7f2a7"} />
      </mesh>

      <Car />

      <mesh rotation={[anglesToRadians(-90), 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={"#1b4f3a"}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      <ambientLight args={["#fffff", 0.1]} />
      <directionalLight args={["#fffff", 0.3]} position={[-4, 1, 2]} />
      <pointLight args={["#fffff", 0.2]} position={[-4, 1, 2]} />
      <spotLight
        args={["#ad2525f", 1]}
        position={[2, 2, 2]}
        penumbra={0.2}
        decay={0.5}
        castShadow
      />

      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 10]} />
          <meshBasicMaterial side={THREE.BackSide} color="#296777" />
        </mesh>
      </Environment>
    </>
  );
}
