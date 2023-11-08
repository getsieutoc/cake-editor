import { useRef, useState } from "react";
import { type MeshProps, useFrame, THREE } from "@/components";
import { __CRYSTAL__ } from "@/utils/constants";

type CrystalType = MeshProps & {
   autoRotateWhenHover?: boolean;
};
export * from "./Crystals";
export function Crystal(props: CrystalType) {
   const { autoRotateWhenHover = true, ...rest } = props;
   const ref = useRef<any>(null!);
   const [hovered, setHovered] = useState(false);

   useFrame((state: any, delta: number) => {
      hovered && (ref.current.position.x -= 1 * delta);
      hovered && (ref.current.position.x += 1 * delta);
      hovered && (ref.current.position.z -= 1 * delta);
      hovered && (ref.current.position.z += 1 * delta);

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
         name={__CRYSTAL__}
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
