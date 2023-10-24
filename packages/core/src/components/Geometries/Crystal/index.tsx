import { useRef, useState } from "react";
import { type MeshProps, useFrame, THREE } from "@/components";

type CrystalType = MeshProps & {
   autoRotateWhenHover?: boolean;
   keyMap?: { [key: string]: boolean };
};
export * from "./Crystals";
export function Crystal(props: CrystalType) {
   const { autoRotateWhenHover = true, keyMap, ...rest } = props;
   const ref = useRef<any>(null!);
   const [hovered, setHovered] = useState(false);

   useFrame((__: any, delta: number) => {
      keyMap?.["KeyA"] && hovered && (ref.current.position.x -= 1 * delta);
      keyMap?.["KeyD"] && hovered && (ref.current.position.x += 1 * delta);
      keyMap?.["KeyW"] && hovered && (ref.current.position.z -= 1 * delta);
      keyMap?.["KeyS"] && hovered && (ref.current.position.z += 1 * delta);

      const color = new THREE.Color(
         Math.floor(Math.random() * (hovered ? 3 : 16777216))
      );
      ref.current.material.color.lerp(color, 0.025);
      if (autoRotateWhenHover) {
         ref.current.rotation.z = hovered
            ? THREE.MathUtils.lerp(ref.current.rotation.z, -Math.PI * 2, 0.025)
            : THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.025);
      }
   });
   return (
      <mesh
         {...props}
         ref={ref}
         onPointerOver={() => {
            setHovered(true);
         }}
         onPointerOut={() => setHovered(false)}
      >
         <icosahedronGeometry />
         <meshPhysicalMaterial
            roughness={0}
            metalness={0}
            thickness={3.12}
            ior={1.74}
            transmission={1}
         />
      </mesh>
   );
}
