import { useEffect, useState, Suspense } from "react";
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
} from "@/components";
import { useKeyboard, useProgress, useControls } from "@/hooks";
import { CONTROLS_LEVA, modes } from "@/utils/constants";
import { ModelType, ThreeEvent } from "@/utils/types";
import { useControlModel } from "@/globalStates";
import { getGroupObjectSelected } from "@/utils/service";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models } = props;
   const [height, setHeight] = useState(400);
   const [autoRotate, setAutoRotate] = useState(false);
   const keyMap = useKeyboard();
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const { progress } = useProgress();
   useControls(CONTROLS_LEVA.Auto_rotate, {
      "start/stop": {
         value: autoRotate,
         onChange: (v) => setAutoRotate(v),
      },
   });

   useEffect(() => {
      setHeight(window.innerHeight);
   }, []);

   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      const obj = e.object as THREE.Mesh & {
         material: { name: string };
      };
      const groupObject = getGroupObjectSelected(obj);
      setModel({ id: obj.uuid, parentId: groupObject?.uuid, name: obj.name });
      const materialName = obj.material.name;

      document
         .getElementById(
            `${CONTROLS_LEVA.Colors}.` + materialName.toUpperCase()
         )
         ?.focus();
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "click" && resetSelectedModel();
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
         <Overlay />

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

               {models.map((model, index) => (
                  <Model
                     key={index}
                     keyMap={keyMap}
                     path={model.path}
                     scale={model.scale}
                     rotate={model.rotate}
                     position={model.position}
                     dispose={null}
                     onClick={handleClickModel}
                     onPointerMissed={handlePointerMissed}
                     onContextMenu={handleContextMenu}
                     castShadow
                     receiveShadow
                  />
               ))}

               <Crystals position={[-10, 0, 3]} count={4} countChild={3} />

               <ContactShadows
                  scale={80}
                  position={[0.13, -0.33, 0.33]}
                  opacity={1}
               />
               <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                  <GizmoViewport labelColor="white" axisHeadScale={1} />
               </GizmoHelper>
               <Controls autoRotate={autoRotate} />
            </Canvas>
         </Suspense>
         <Leva collapsed={true} />
      </Box>
   );
}
