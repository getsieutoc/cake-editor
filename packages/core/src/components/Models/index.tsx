import { useMemo, useState } from "react";
import { CONTROLS_LEVA } from "@/utils/constants";
import {
   Box,
   Html,
   THREE,
   useGLTF,
   useFrame,
   useCursor,
   useControls,
   PrimitiveProps,
   type ThreeEvent,
} from "@/components";

type ModelType = {
   primitiveRef?: { current: PrimitiveProps | null };
   path: string;
   position?: number[];
   rotate?: number[];
   scale?: number[];
   defaultColor?: string;
   keyMap?: { [key: string]: boolean };
};

export function Model(props: ModelType) {
   const {
      path,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      primitiveRef,
      keyMap,
   } = props;
   const { scene } = useGLTF(path);
   const [hovered, setHovered] = useState(false);

   useCursor(hovered);
   useFrame((__, delta) => {
      if (primitiveRef && primitiveRef?.current) {
         keyMap?.["KeyA"] && (primitiveRef.current.position.x -= 1 * delta);
         keyMap?.["KeyD"] && (primitiveRef.current.position.x += 1 * delta);
         keyMap?.["KeyW"] && (primitiveRef.current.position.z -= 1 * delta);
         keyMap?.["KeyS"] && (primitiveRef.current.position.z += 1 * delta);
      }
   });
   const annotations = useMemo(() => {
      const temp: JSX.Element[] = [];
      scene?.traverse((o) => {
         if (o?.userData?.prop) {
            temp.push(
               <Html
                  key={o.uuid}
                  position={[o.position.x, o.position.y, o.position.z]}
                  distanceFactor={3}
               >
                  <Box
                     fontSize="20px"
                     width="max-content"
                     maxW="500px"
                     transform="translate3d(calc(15%), calc(-50%), 0)"
                     textAlign="left"
                     userSelect="none"
                     fontFamily="var(--leva-fonts-mono)"
                     background="black"
                     color="white"
                     rounded={10}
                     paddingX={10}
                     _before={{
                        content: `""`,
                        position: "absolute",
                        top: "20px",
                        left: "-30px",
                        height: "1px",
                        width: "30px",
                        background: "black",
                     }}
                  >
                     {o.userData.prop}
                  </Box>
               </Html>
            );
         }
      });
      return temp;
   }, [scene]);

   useControls(CONTROLS_LEVA.Colors, () => {
      const colors = scene.children.reduce((acc, m: any) => {
         m.castShadow = true;
         const data = m.material
            ? Object.assign(acc, {
                 [m.material?.name?.toUpperCase()]: {
                    value: "#" + m.material?.color?.getHex().toString(16),
                    onChange: (v: string) => {
                       m.material.color = new THREE.Color(v);
                    },
                 },
              })
            : acc;
         return data;
      }, {});
      return colors;
   });

   return (
      <primitive
         ref={primitiveRef}
         object={scene}
         scale={scale}
         position={position}
         onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            setHovered(true);
         }}
         onPointerOut={() => setHovered(false)}
         castShadow
      >
         {annotations}
      </primitive>
   );
}
