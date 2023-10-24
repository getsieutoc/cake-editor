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
   Spinner,
   Environment,
   useControls,
   OrbitControls,
   GizmoHelper,
   GizmoViewport,
   ContactShadows,
   PrimitiveProps,
} from "@/components";
import { useKeyboard } from "@/hooks";
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
   const primitiveRefs = useRef<{ current: PrimitiveProps | null }[]>([]);
   const keyMap = useKeyboard();

   useEffect(() => {
      setHeight(window.innerHeight);
      models?.map((__, index) => {
         primitiveRefs.current[index] = { current: null };
      });
   }, []);

   useControls(CONTROLS_LEVA.Auto_rotate, {
      "start/stop": {
         value: autoRotate,
         onChange: (v) => setAutoRotate(v),
      },
   });

   return (
      <Box width="100%" height={height}>
         <Box position="relative">
            <Overlay />
         </Box>

         <Suspense
            fallback={
               <Box textAlign="center">
                  Loading... <Spinner />
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
                  onClick={(e) => {
                     e.stopPropagation();
                     const obj = e.object as THREE.Mesh & {
                        material: { name: string };
                     };
                     const materialName = obj.material.name;
                     document
                        .getElementById(
                           `${CONTROLS_LEVA.Colors}.` +
                              materialName.toUpperCase()
                        )
                        ?.focus();
                  }}
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
               <OrbitControls
                  makeDefault
                  maxDistance={10}
                  minDistance={3}
                  autoRotate={autoRotate}
               />
            </Canvas>
         </Suspense>
         <Leva collapsed={false} />
      </Box>
   );
}
