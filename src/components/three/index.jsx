import { anglesToRadians } from "../../utils/angle";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

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

export default function Three() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />

      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={"#6c746d"} />
      </mesh>
      <mesh rotation={[anglesToRadians(-90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color={"#0acc21"} />
      </mesh>

      <ambientLight args={["#fffff", 1]} />
    </>
  );
}
