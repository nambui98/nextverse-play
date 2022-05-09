import React, { useEffect, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const CharacterModel = ({ model }: any) => {
  const group = useRef()
  const { nodes, materials, animations, scene }: any = useLoader(GLTFLoader, model.modelPath)
  const [mixer] = useState(new THREE.AnimationMixer(scene))
  const { camera, gl } = useThree()
  
  useFrame((state, delta) => {
    mixer?.update(delta)
  })
  useEffect(() => {
    if (animations.length) {
      animations.forEach((clip: any) => {
        mixer.clipAction(clip, group.current).play()
      })
    }
  }, [])

  useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableZoom = false
      return () => {
        controls.dispose()
      }
    },[camera, gl]
  )

  return (
    <group ref={group} dispose={null}>
      <group 
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.5}
        position={[0, -1.4, 0]}
      >
        <mesh
          geometry={nodes[model.modelName].geometry}
          material={materials[model.modelName]}
        />
      </group>
    </group>
  )
}