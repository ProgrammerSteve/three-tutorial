import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { anglesToRadians } from "../../utils/angle";

export default function Car() {
  const { nodes, materials } = useGLTF("/models/car/model-transformed.glb");
  return (
    <group
      dispose={null}
      scale={0.5}
      position={[2, 0, 3]}
      rotation={[0, anglesToRadians(90), 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.Paint}
        position={[0.735, 0.62, 0.716]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials.Body}
        position={[0.735, 0.62, 0.716]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.Glass}
        position={[0.649, 1.095, 0.133]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_23.geometry}
        material={materials.Wheel}
        position={[0.694, 0.291, -1.2]}
        rotation={[2.869, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_37.geometry}
        material={materials.Interior}
        position={[-0.553, 0.419, 0.209]}
        rotation={[0.114, 0.312, -0.702]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_71.geometry}
        material={materials.Lights}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_75.geometry}
        material={materials.Plate}
      />
    </group>
  );
}

useGLTF.preload("/models/car/model-transformed.glb");
