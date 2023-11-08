import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { OrbitControls, TransformControls } from "@/components";
import { TransformControlsProps } from "@/utils/types";
import { useControlModel } from "@/globalStates";
import { __TransformControls__, modes } from "@/utils/constants";

type ControlType = {
   autoRotate?: boolean;
};
export function Controls(props: ControlType) {
   const { autoRotate = false } = props;
   const {
      selectedModel,
      setTransformControlsRef,
      enableOrbitControl,
      setIsTransform,
   } = useControlModel();
   const transformControlsRef = useRef<TransformControlsProps>(null!);

   useEffect(() => {
      if (transformControlsRef.current) {
         setTransformControlsRef(transformControlsRef.current);
      }
   }, [selectedModel.id]);

   const debounce = _.debounce(function () {
      setIsTransform(false);
   }, 800);

   return (
      <>
         {selectedModel.id && (
            <TransformControls
               name={__TransformControls__}
               ref={transformControlsRef as any}
               object={selectedModel.object}
               mode={modes[selectedModel?.mode ?? 0]}
               size={1}
               onMouseDown={() => setIsTransform(true)}
               onMouseUp={() => debounce()}
            />
         )}
         <OrbitControls
            enableDamping
            enabled={enableOrbitControl}
            makeDefault /* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */
            maxDistance={10}
            minDistance={3}
            autoRotate={autoRotate}
            maxPolarAngle={Math.PI / 2.8}
         />
      </>
   );
}
