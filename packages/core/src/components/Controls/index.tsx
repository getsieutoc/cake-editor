import { useEffect, useRef } from "react";
import { OrbitControls, TransformControls } from "@/components";
import { useControlModel } from "@/globalStates";
import { modes } from "@/utils/constants";
import { getGroupObjectSelected } from "@/utils/service";

type ControlType = {
   autoRotate?: boolean;
};
export function Controls(props: ControlType) {
   const { autoRotate = false } = props;
   const { selectedModel } = useControlModel();
   const transformControlsRef = useRef(null);
   const groupObject = getGroupObjectSelected(selectedModel.object);

   useEffect(() => {
      if (selectedModel.id && transformControlsRef.current && groupObject) {
         const transformControls =
            transformControlsRef.current as THREE.Object3D;
         transformControls.attach(groupObject);
      }
   }, [selectedModel.id]);

   return (
      <>
         {selectedModel.id && (
            <TransformControls
               ref={transformControlsRef}
               object={selectedModel.object}
               mode={modes[selectedModel?.mode ?? 0]}
               size={0.5}
            />
         )}
         <OrbitControls
            makeDefault /* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */
            maxDistance={10}
            minDistance={3}
            autoRotate={autoRotate}
            maxPolarAngle={Math.PI / 2.8}
         />
      </>
   );
}
