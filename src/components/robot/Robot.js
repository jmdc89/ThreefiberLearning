import React, { useRef, useState, Suspense, useEffect} from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { HexColorPicker } from "react-colorful"
import {proxy, useProxy} from "valtio";


const state = proxy({
    current: null,
    items: {
      structure2: "#ffffff",
    },
  });

function Model(props) {
    const group = useRef()
    const snap = useProxy(state);
    const { nodes, materials } = useGLTF('robocompres.glb')
    const [hovered, set] = useState(null)

    useEffect(() => {
        const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
        const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
    }, [hovered])


    return (
        <group
        ref={group} {...props} dispose={null}>
        {/* onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (state.current = null)}
        onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}> */}
         <mesh material={materials.structure1} geometry={nodes.robot_blanco.geometry}  />
        <mesh material={materials.structure2} material-color={snap.items.structure2} geometry={nodes.robot_naranjo.geometry}  />
        <mesh material={materials.structure3} geometry={nodes.robot_negro.geometry} />
      </group>
    )
  }

  function Picker() {
    const snap = useProxy(state)
    return (
      <div>
        <HexColorPicker className="picker" color={snap.items.structure2} onChange={(color) => (state.items.structure2 = color)} />
        <h1>Pick the color!</h1>
      </div>
    )
  }

export default function Robot() {
    return (
        <>
        <Picker/>
        <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.3} position={[5,20,20]} />
            <Suspense fallback={null}>
                <Model />
                <Environment files="royal_esplanade_1k.hdr" />
            </Suspense>
            <OrbitControls/>
            <ContactShadows/>
        </Canvas>
        </div>
        </>
    )
}