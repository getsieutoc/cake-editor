import { useEffect, useState, Suspense, ChangeEvent, useRef } from "react";
import {
   Box,
   Leva,
   THREE,
   HStack,
   Model,
   Lights,
   Canvas,
   Crystals,
   Progress,
   Controls,
   ColorPicker,
   Environment,
   GizmoHelper,
   GizmoViewport,
   ContactShadows,
   ShortCutOverlay,
} from "@/components";
import { useKeyboard, useProgress, useControls } from "@/hooks";
import { CONTROLS_LEVA } from "@/utils/constants";
import { ModelType } from "@/utils/types";
import { useControlModel } from "@/globalStates";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
   positionPanel?: { x: number; y: number };
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models, positionPanel = { x: 0, y: 0 } } = props;
   const [height, setHeight] = useState(400);
   const [autoRotate, setAutoRotate] = useState(false);
   const keyMap = useKeyboard();
   const { progress } = useProgress();
   const { selectedModel } = useControlModel();

   useControls(CONTROLS_LEVA.Auto_rotate, {
      "start/stop": {
         value: autoRotate,
         onChange: (v) => setAutoRotate(v),
      },
   });

   useEffect(() => {
      setHeight(window.innerHeight * 0.9);
   }, []);

   return (
      <Box width="100%" height={height}>
         {/* ---Helper--- */}
         <HStack position="absolute" spacing={1} zIndex={1}>
            <Box position="relative" height="130px">
               <ShortCutOverlay />
            </Box>
            <Box position="relative" height="130px">
               {selectedModel.id && (
                  <ColorPicker
                     width={20}
                     position="absolute"
                     fontWeight={600}
                     fontSize={11}
                     name={selectedModel.name}
                     defaultValue={selectedModel.object?.material?.color?.getHexString()}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (selectedModel.object) {
                           selectedModel.object.material.color =
                              new THREE.Color(e.target.value);
                        }
                     }}
                  />
               )}
            </Box>
         </HStack>
         {/* --Loading and Canvas-- */}
         <Suspense
            fallback={
               <Box textAlign="center">
                  <Progress
                     top={10}
                     value={progress}
                     rounded={5}
                     colorScheme="pink"
                  />
                  {Math.floor(progress) + "%"}
               </Box>
            }
         >
            <Canvas camera={{ position: [0, 3, 5], fov: 60 }} shadows>
               <Environment
                  background
                  files={background}
                  ground={{ height: 10, radius: 115, scale: 90 }}
               />
               <Lights />

               {models.map((model, index) => (
                  <Model
                     key={index}
                     keyMap={keyMap}
                     path={model.path}
                     scale={model.scale}
                     rotation={model.rotation}
                     position={model.position}
                     castShadow
                     receiveShadow
                     dispose={null}
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

         <Leva
            collapsed
            titleBar={{
               position: positionPanel,
            }}
         />
      </Box>
   );
}
