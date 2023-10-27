import { OrbitControls, TransformControls } from "@/components";
import { useThree } from "@/hooks";
import { useControlModel } from "@/globalStates";
import { modes } from "@/utils/constants";

type ControlType = {
   autoRotate?: boolean;
};
export function Controls(props: ControlType) {
   const { autoRotate = false } = props;
   const { selectedModel } = useControlModel();
   const scene = useThree((state) => state.scene);
   const objectSelected = scene.getObjectByName(selectedModel.name ?? "");

   return (
      <>
         {objectSelected?.parent && (
            <TransformControls
               object={objectSelected}
               mode={modes[selectedModel?.mode ?? 0]}
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
