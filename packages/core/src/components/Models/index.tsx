import { useMemo, useRef, useState } from "react";
import { Box, Html, THREE, useFrame, type ThreeEvent } from "@/components";
import { useCursor, useGLTF, useControls } from "@/hooks";
import { GroupProps, PrimitiveProps } from "@/utils/types";
import {
   CONTROLS_LEVA,
   SHORT_CUTS,
   __GROUP_MODEL__,
   __PRIMITIVE_MODEL__,
} from "@/utils/constants";
import { useControlModel } from "@/globalStates";
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
   const { scene } = useGLTF(path);
   const [hovered, setHovered] = useState(false);
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const primitiveRef = useRef<PrimitiveProps>(null);
   useCursor(hovered);

   useFrame((__, delta) => {
      const isDragByKey =
         primitiveRef?.current?.uuid === selectedModel?.parentId;

      if (isDragByKey && primitiveRef.current) {
         keyMap?.[SHORT_CUTS.ArrowLeft] &&
            (primitiveRef.current.position.x -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowRight] &&
            (primitiveRef.current.position.x += 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowUp] &&
            (primitiveRef.current.position.z -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowDown] &&
            (primitiveRef.current.position.z += 1 * delta);

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
         m.receiveShadow = true;
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
   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      const obj = e.object as THREE.Mesh & {
         material: { name: string };
      };
      const groupObject = getGroupObjectSelected(obj);
      const isChild = groupObject?.children?.find(
         (o) => o.uuid === selectedModel.id
      );
      if (!isChild) {
         setModel({
            id: obj.uuid,
            parentId: groupObject?.uuid,
            name: obj.name,
         });

         const materialName = obj.material.name;

         document
            .getElementById(
               `${CONTROLS_LEVA.Colors}.` + materialName.toUpperCase()
            )
            ?.focus();
      }
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "dblclick" && resetSelectedModel();
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      console.log("right click :>> ", e);
      // if (selectedModel.name === e.object.name) {
      //    e.stopPropagation();
      //    setModel({
      //       ...selectedModel,
      //       mode: ((selectedModel?.mode ?? 0) + 1) % modes.length,
      //    });
      // }
   };
   return (
      <group
         onClick={handleClickModel}
         onPointerMissed={handlePointerMissed}
         onContextMenu={handleContextMenu}
         name={__GROUP_MODEL__}
         castShadow
         receiveShadow
         {...rest}
      >
         <primitive
            name={__PRIMITIVE_MODEL__}
            ref={primitiveRef}
            object={scene}
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
