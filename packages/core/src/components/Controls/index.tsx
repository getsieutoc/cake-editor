import { useEffect, useRef } from "react";
import { OrbitControls, TransformControls } from "@/components";
import { TransformControlsProps } from "@/utils/types";
import { useControlModel } from "@/globalStates";
import { modes } from "@/utils/constants";

type ControlType = {
   autoRotate?: boolean;
};
export function Controls(props: ControlType) {
   const { autoRotate = false } = props;
   const { selectedModel, setTransformControlsRef } = useControlModel();
   const transformControlsRef = useRef<TransformControlsProps>(null!);

   useEffect(() => {
      if (transformControlsRef.current) {
         setTransformControlsRef(transformControlsRef.current);
      }
   }, [selectedModel.id]);
   return (
      <>
         {selectedModel.id && (
            <TransformControls
               ref={transformControlsRef as any}
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
