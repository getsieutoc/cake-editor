import { useEffect, useState, Suspense, ChangeEvent } from "react";
import {
   Box,
   Leva,
   THREE,
   button,
   HStack,
   Lights,
   Canvas,
   DataList,
   Crystals,
   Progress,
   Controls,
   Add3DText,
   ContextMenu,
   ColorPicker,
   Environment,
   GizmoHelper,
   ModelWrapper,
   GizmoViewport,
   ContactShadows,
   ShortCutOverlay,
} from "@/components";
import { useProgress, useControls } from "@/hooks";
import {
   CONTROLS_LEVA,
   __ContactShadows__,
   __GizmoHelper__,
} from "@/utils/constants";
import { ModelType } from "@/utils/types";
import {
   useContextMenuPosition,
   useControlModel,
   useListModel,
   useShowHide,
   useText3DList,
} from "@/globalStates";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
   positionPanel?: { x: number; y: number };
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models, positionPanel = { x: 0, y: 0 } } = props;
   const [height, setHeight] = useState(400);
   const { progress } = useProgress();
   const { selectedModel, resetSelectedModel } = useControlModel();
   const { showPanelLeva, setShowPanelLeva, autoRotate, setAutoRotate } =
      useShowHide();
   const { clearList } = useListModel();
   const posContextMenu = useContextMenuPosition();
   const { reset: reset3DText } = useText3DList();
   //## Start add to panel leva
   useControls({
      "Clean Up": button(() => {
         clearList();
         resetSelectedModel();
         reset3DText();
         models.map((o) => (o.isSelected = false));
      }),
   });
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
   //## End add to panel leva
   useEffect(() => {
      setHeight(window.innerHeight * 0.9);
   }, []);

   return (
      <Box width="100%" height={height}>
         {/* ---Helper and List models--- */}
         <HStack position="absolute" spacing={1} zIndex={1}>
            <Box position="relative" height="130px">
               <ShortCutOverlay />
               <DataList data={models} />
            </Box>
            <Box position="relative" height="130px">
               {selectedModel.id && (
                  <ColorPicker
                     width="200px"
                     position="absolute"
                     fontWeight={600}
                     fontSize={11}
                     name={
                        selectedModel.displayName + " - " + selectedModel.name
                     }
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
            <Canvas
               camera={{ position: [0, 3, 5], fov: 60 }}
               shadows
               onContextMenu={(e) => {
                  if (!selectedModel.id) {
                     posContextMenu.setPosition({ x: e.clientX, y: e.clientY });
                  }
               }}
            >
               <Environment
                  background
                  files={background}
                  ground={{ height: 10, radius: 115, scale: 90 }}
               />
               <Lights />

               <ModelWrapper />

               <Crystals position={[-10, 0, 3]} count={4} countChild={3} />

               <ContactShadows
                  name={__ContactShadows__}
                  scale={80}
                  position={[0.1, 0, 0.1]}
                  opacity={1}
               />
               <GizmoHelper
                  name={__GizmoHelper__}
                  alignment="bottom-right"
                  margin={[100, 100]}
               >
                  <GizmoViewport labelColor="white" axisHeadScale={1} />
               </GizmoHelper>
               <Controls autoRotate={autoRotate} />
            </Canvas>
         </Suspense>
         <ContextMenu />
         <Add3DText />
         <Leva
            collapsed={!showPanelLeva}
            titleBar={{
               position: positionPanel,
            }}
         />
      </Box>
   );
}
