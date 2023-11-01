import { useMemo, useRef, useState } from "react";
import { Box, Html, type ThreeEvent } from "@/components";
import { useCursor, useGLTF, useFrame } from "@/hooks";
import { GroupProps, PrimitiveProps, THREE_MESH, GLTF } from "@/utils/types";
import {
   SHORT_CUTS,
   __GROUP_MODEL__,
   __PRIMITIVE_MODEL__,
} from "@/utils/constants";
import { useContextMenuPosition, useControlModel } from "@/globalStates";
import { getGroupObjectSelected } from "@/utils/service";

type ModelType = GroupProps & {
   path: string;
   position?: number[];
   rotation?: number[];
   scale?: number[];
   defaultColor?: string;
   keyMap?: { [key: string]: boolean };
};

export function Model(props: ModelType) {
   const {
      path,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      rotation,
      keyMap,
      ...rest
   } = props;
   const gltf: GLTF = useGLTF(path);
   const modelRef = useRef<THREE.Group>(null);
   const [hovered, setHovered] = useState(false);
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const posContextMenu = useContextMenuPosition();
   const primitiveRef = useRef<PrimitiveProps>(null);
   useCursor(hovered);

   useFrame((state, delta) => {
      const isDragByKey =
         primitiveRef?.current?.uuid === selectedModel?.parentId;

      if (isDragByKey && primitiveRef.current) {
         // move object
         keyMap?.[SHORT_CUTS.ArrowLeft] &&
            (primitiveRef.current.position.x -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowRight] &&
            (primitiveRef.current.position.x += 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowUp] &&
            (primitiveRef.current.position.z -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowDown] &&
            (primitiveRef.current.position.z += 1 * delta);
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
         // remove object
         keyMap?.[SHORT_CUTS.KeyD] && handleRemove();
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
   const handleRemove = () => {
      let children_to_remove: THREE.Object3D<THREE.Object3DEventMap>[] = [];
      console.log("modelRef.current :>> ", modelRef.current);
      // modelRef.current?.traverse(function (child) {
      //    console.log("child :>> ", child);
      //    if (child.uuid === selectedModel.id) {
      //       children_to_remove = [...children_to_remove, ...child.children];
      //    }
      // });
      // children_to_remove.forEach(function (child) {
      //    modelRef.current?.remove(child);
      // });
      resetSelectedModel();
   };

   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      const obj = e.object as THREE_MESH;
      const groupObject = getGroupObjectSelected(obj);
      const isChild = groupObject?.children?.find(
         (o) => o.uuid === selectedModel.id
      );
      if (!isChild) {
         setModel({
            id: obj.uuid,
            parentId: groupObject?.uuid,
            name: obj.name,
            object: obj,
         });
      }
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "dblclick" && resetSelectedModel();
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      // console.log("right click :>> ", e);
      if (selectedModel.id === e.object.uuid) {
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
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
               e.stopPropagation();
               setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
            castShadow
            receiveShadow
         >
            {annotations}
         </primitive>
      </group>
   );
}

export { ModelWrapper } from "./ModelWrapper";
