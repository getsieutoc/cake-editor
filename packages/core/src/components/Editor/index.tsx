import { useEffect, useState, Suspense } from "react";
import {
   Box,
   Leva,
   Model,
   Lights,
   Canvas,
   Crystals,
   Progress,
   Controls,
   Environment,
   GizmoHelper,
   GizmoViewport,
   ContactShadows,
   ShortCutOverlay,
} from "@/components";
import { useKeyboard, useProgress, useControls } from "@/hooks";
import { CONTROLS_LEVA } from "@/utils/constants";
import { ModelType } from "@/utils/types";

type CakeEditorType = {
   background?: string;
   models: ModelType[];
};
export function CakeEditor(props: CakeEditorType) {
   const { background = "", models } = props;
   const [height, setHeight] = useState(400);
   const [autoRotate, setAutoRotate] = useState(false);
   const keyMap = useKeyboard();

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

   return (
      <Box width="100%" height={height}>
         <ShortCutOverlay />
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
            collapsed={true}
            titleBar={{
               title: "Properties",
            }}
         />
      </Box>
   );
}
