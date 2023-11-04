import { useRef, useMemo, ReactNode } from "react";
import { Html, Box } from "@/components";
import { useGLTF, useDrag, useFrame } from "@/hooks";
import {
   GroupProps,
   PrimitiveProps,
   THREE_MESH,
   GLTF,
   ThreeEvent,
   ModelType,
} from "@/utils/types";
import { __GROUP_MODEL__, __PRIMITIVE_MODEL__ } from "@/utils/constants";
import { useContextMenuPosition, useControlModel } from "@/globalStates";

type ModelTypes = GroupProps & {
   path: string;
   position?: number[];
   rotation?: number[];
   scale?: number[];
   defaultColor?: string;
   modelDetail: ModelType;
};

export function Model(props: ModelTypes) {
   const {
      path,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      rotation,
      modelDetail,
      ...rest
   } = props;
   const gltf: GLTF = useGLTF(path);
   const modelRef = useRef<THREE.Group>(null);
   const primitiveRef = useRef<PrimitiveProps>(null);
   const textRef = useRef<any>(null);
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const posContextMenu = useContextMenuPosition();

   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      const obj = e.object as THREE_MESH;
      obj.castShadow = true;
      obj.receiveShadow = true;
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
      if (selectedModel.id === e.object.id) {
         posContextMenu.setPosition({ x: e.x, y: e.y }, modelRef.current);
      }
   };
   const bind = useDrag(({ down, movement: [x, y] }) => {
      if (down) {
         textRef.current.style.left = x + "px";
         textRef.current.style.top = y + "px";
      }
   });

   return (
      <group
         ref={modelRef}
         castShadow
         receiveShadow
         name={__GROUP_MODEL__}
         onClick={handleClickModel}
         onPointerMissed={handlePointerMissed}
         onContextMenu={handleContextMenu}
         onPointerOver={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
         }}
         onPointerOut={(e) => (document.body.style.cursor = "default")}
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
            {...bind()}
         >
            {modelDetail.annotations?.map((ann, idx) => {
               return (
                  <Html key={idx} distanceFactor={3} ref={textRef}>
                     <Box
                        pos="absolute"
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
                        opacity={0.5}
                        _before={{
                           content: `""`,
                           position: "absolute",
                           top: "20px",
                           left: "-100px",
                           height: "1px",
                           width: "100px",
                           background: "black",
                        }}
                     >
                        {ann}
                     </Box>
                  </Html>
               );
            })}
         </primitive>
      </group>
   );
}

export { ModelWrapper } from "./ModelWrapper";
