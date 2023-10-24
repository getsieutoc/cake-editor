import { useEffect, useRef, useState, Suspense } from "react";
import {
   Box,
   Leva,
   Model,
   Lights,
   THREE,
   Canvas,
   Overlay,
   Crystals,
   Progress,
   Controls,
   Environment,
   GizmoHelper,
   GizmoViewport,
   ContactShadows,
   PrimitiveProps,
} from "@/components";
import { useKeyboard, useProgress, useControls } from "@/hooks";
import { CONTROLS_LEVA, modes } from "@/utils/constants";
import { ModelType, ThreeEvent } from "@/utils/types";
import { useControlModel } from "@/globalStates";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models } = props;
   const [height, setHeight] = useState(400);
   const [autoRotate, setAutoRotate] = useState(false);
   const primitiveRefs = useRef<{ current: PrimitiveProps | null }[]>([]);
   const keyMap = useKeyboard();
   const { selectedModel, setModel } = useControlModel();
   const { progress } = useProgress();
   useControls(CONTROLS_LEVA.Auto_rotate, {
      "start/stop": {
         value: autoRotate,
         onChange: (v) => setAutoRotate(v),
      },
   });

   useEffect(() => {
      setHeight(window.innerHeight);
      models?.map((__, index) => {
         primitiveRefs.current[index] = { current: null };
      });
   }, []);

   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      const obj = e.object as THREE.Mesh & {
         material: { name: string };
      };
      setModel({ id: obj.uuid, name: obj.name });
      const materialName = obj.material.name;
      document
         .getElementById(
            `${CONTROLS_LEVA.Colors}.` + materialName.toUpperCase()
         )
         ?.focus();
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "click" && setModel({ id: null, name: "", mode: 0 });
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      if (selectedModel.name === e.object.name) {
         e.stopPropagation();
         setModel({
            ...selectedModel,
            mode: ((selectedModel?.mode ?? 0) + 1) % modes.length,
         });
      }
   };
   return (
      <Box width="100%" height={height}>
         <Box position="relative">
            <Overlay />
         </Box>

         <Suspense
            fallback={
               <Box textAlign="center">
                  <Progress
                     top={10}
                     value={progress}
                     rounded={5}
                     colorScheme="pink"
                     size="xs"
                  />
                  {Math.floor(progress) + "%"}
               </Box>
            }
         >
            <Canvas camera={{ position: [0, 3, 5], fov: 60 }} shadows>
               <Environment
                  files={background}
                  background
                  ground={{ height: 10, radius: 115, scale: 90 }}
               />
               <Lights />
               <group
                  dispose={null}
                  onClick={handleClickModel}
                  onPointerMissed={handlePointerMissed}
                  onContextMenu={handleContextMenu}
                  castShadow
               >
                  {models.map((model, index) => (
                     <Model
                        key={index}
                        keyMap={keyMap}
                        primitiveRef={primitiveRefs.current[index]}
                        path={model.path}
                        scale={model.scale}
                        rotate={model.rotate}
                        position={model.position}
                     />
                  ))}

                  <Crystals position={[-10, 0, 3]} count={4} countChild={3} />
               </group>

               <ContactShadows
                  scale={80}
                  position={[0.13, -0.33, 0.33]}
                  opacity={1}
               />
               <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                  <GizmoViewport labelColor="white" axisHeadScale={1} />
               </GizmoHelper>
               <Controls
                  makeDefault
                  maxDistance={10}
                  minDistance={3}
                  autoRotate={autoRotate}
                  maxPolarAngle={Math.PI / 2.8}
               />
            </Canvas>
         </Suspense>
         <Leva
            collapsed={false}
            titleBar={{
               position: { x: 0, y: 90 },
            }}
         />
      </Box>
   );
}
