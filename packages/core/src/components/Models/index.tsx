import { useMemo, useRef, useState } from "react";
import { Box, Html, type ThreeEvent } from "@/components";
import { useCursor, useGLTF, useFrame, useKeyboard } from "@/hooks";
import { GroupProps, PrimitiveProps, THREE_MESH, GLTF } from "@/utils/types";
import {
   SHORT_CUTS,
   __GROUP_MODEL__,
   __PRIMITIVE_MODEL__,
} from "@/utils/constants";
import { useContextMenuPosition, useControlModel } from "@/globalStates";

type ModelType = GroupProps & {
   path: string;
   position?: number[];
   rotation?: number[];
   scale?: number[];
   defaultColor?: string;
};

export function Model(props: ModelType) {
   const {
      path,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      rotation,
      ...rest
   } = props;
   const gltf: GLTF = useGLTF(path);
   const modelRef = useRef<THREE.Group>(null);
   const [hovered, setHovered] = useState(false);
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const posContextMenu = useContextMenuPosition();
   const keyMap = useKeyboard();
   const primitiveRef = useRef<PrimitiveProps>(null);
   useCursor(hovered);

   useFrame((state, delta) => {
      if (selectedModel.object) {
         // move object
         keyMap?.[SHORT_CUTS.ArrowLeft] &&
            (selectedModel.object.position.x -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowRight] &&
            (selectedModel.object.position.x += 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowUp] &&
            (selectedModel.object.position.z -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowDown] &&
            (selectedModel.object.position.z += 1 * delta);
         // transform object
         keyMap?.[SHORT_CUTS.KeyG] &&
            setModel({
               ...selectedModel,
               mode: 0,
            });

         keyMap?.[SHORT_CUTS.KeyR] &&
            setModel({
               ...selectedModel,
               mode: 1,
            });
         keyMap?.[SHORT_CUTS.KeyS] &&
            setModel({
               ...selectedModel,
               mode: 2,
            });
      }
   });
   const annotations = useMemo(() => {
      const temp: JSX.Element[] = [];
      gltf.scene?.traverse((o) => {
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
   }, [gltf.scene]);
   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      const obj = e.object as THREE_MESH;
      setModel({
         id: obj.id,
         parentId: obj.parent?.id,
         name: obj.name,
         object: obj,
      });
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "dblclick" && resetSelectedModel();
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      // console.log("right click :>> ", e);
      if (selectedModel.id === e.object.id) {
         posContextMenu.setPosition({ x: e.x, y: e.y }, modelRef.current);
      }
   };

   return (
      <group
         ref={modelRef}
         castShadow
         receiveShadow
         name={__GROUP_MODEL__}
         onClick={handleClickModel}
         onPointerMissed={handlePointerMissed}
         onContextMenu={handleContextMenu}
         onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            setHovered(true);
         }}
         onPointerOut={() => setHovered(false)}
         dispose={null}
         {...rest}
      >
         <primitive
            name={__PRIMITIVE_MODEL__}
            ref={primitiveRef}
            object={gltf.scene}
            scale={scale}
            rotation={rotation}
            position={position}
            castShadow
            receiveShadow
         >
            {annotations}
         </primitive>
      </group>
   );
}

export { ModelWrapper } from "./ModelWrapper";
