import { useEffect, useState, Suspense, ChangeEvent } from "react";
import {
   Box,
   Leva,
   THREE,
   HStack,
   Lights,
   Canvas,
   DataList,
   Crystals,
   Progress,
   Controls,
   ColorPicker,
   Environment,
   GizmoHelper,
   ModelWrapper,
   GizmoViewport,
   ContactShadows,
   ShortCutOverlay,
} from "@/components";
import { useProgress, useControls } from "@/hooks";
import { CONTROLS_LEVA } from "@/utils/constants";
import { ModelType } from "@/utils/types";
import { useControlModel, useShowHide } from "@/globalStates";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
   positionPanel?: { x: number; y: number };
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models, positionPanel = { x: 0, y: 0 } } = props;
   const [height, setHeight] = useState(400);
   const { progress } = useProgress();
   const { selectedModel } = useControlModel();
   const { showPanelLeva, setShowPanelLeva, autoRotate, setAutoRotate } =
      useShowHide();

   useControls(CONTROLS_LEVA.Auto_rotate, {
      "start/stop": {
         value: autoRotate,
         onChange: (v) => setAutoRotate(v),
      },
   });
   useControls(
      CONTROLS_LEVA.Panel,
      {
         show: {
            value: showPanelLeva,
            onChange: (v) => setShowPanelLeva(v),
         },
      },
      { collapsed: true }
   );

   useEffect(() => {
      setHeight(window.innerHeight * 0.9);
   }, []);

   return (
      <Box width="100%" height={height}>
         {/* ---Helper--- */}
         <HStack position="absolute" spacing={1} zIndex={1}>
            <Box position="relative" height="130px">
               <ShortCutOverlay />
               <DataList data={models} />
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
                  <Progress value={progress} rounded={5} colorScheme="pink" />
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

               <ModelWrapper />

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
            collapsed={!showPanelLeva}
            titleBar={{
               position: positionPanel,
            }}
         />
      </Box>
   );
}
