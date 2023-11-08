import { useRef } from "react";
import { THREE } from "@/components";
import { useControls } from "@/hooks";
import { CONTROLS_LEVA, __LIGHT__ } from "@/utils/constants";

export const Lights = () => {
   const directionalRef = useRef<THREE.DirectionalLight>(null!);
   const directionalRef2 = useRef<THREE.DirectionalLight>(null!);
   useControls(
      CONTROLS_LEVA.Directional_Light,
      {
         intensity: {
            value: 1.2,
            min: 0,
            max: 5,
            step: 0.1,
            onChange: (v: number) => {
               directionalRef.current.intensity = v;
            },
         } as any,
         color: {
            value: "#FFFFFF",
            onChange: (v: number) => {
               directionalRef.current.color = new THREE.Color(v);
            },
         } as any,
         position: {
            x: 3,
            y: 7.32,
            z: 6.15,
            onChange: (v: THREE.Vector3) => {
               directionalRef.current.position.copy(v);
            },
         } as any,
      },
      { collapsed: true }
   );
   useControls(
      CONTROLS_LEVA.Directional_Light_2,
      {
         intensity: {
            value: 2.2,
            min: 0,
            max: 5,
            step: 0.1,
            onChange: (v: number) => {
               directionalRef2.current.intensity = v;
            },
         } as any,
         color: {
            value: "#FFFFFF",
            onChange: (v: number) => {
               directionalRef.current.color = new THREE.Color(v);
            },
         } as any,
         position: {
            x: -0.2,
            y: 25.3,
            z: 12,
            onChange: (v: THREE.Vector3) => {
               directionalRef2.current.position.copy(v);
            },
         } as any,
      },
      { collapsed: true }
   );

   return (
      <>
         <directionalLight name={__LIGHT__} ref={directionalRef} castShadow>
            {/* <Sphere args={[0.25]} rotation={[rotationDL.x, rotationDL.y, rotationDL.z]} /> */}
         </directionalLight>
         <directionalLight name={__LIGHT__} ref={directionalRef2} castShadow>
            {/* <Sphere args={[0.25]} rotation={[rotationDL2.x, rotationDL2.y, rotationDL2.z]} /> */}
         </directionalLight>
      </>
   );
};
