import { OrbitControls, TransformControls } from "@/components";
import { useThree } from "@/hooks";
import { useControlModel } from "@/globalStates";
import { modes } from "@/utils/constants";
import { OrbitControlsProps } from "@/utils/types";

type ControlType = OrbitControlsProps & {};
export function Controls(props: ControlType) {
   const { selectedModel, setModel } = useControlModel();
   const scene = useThree((state) => state.scene);

   return (
      <>
         {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
         {selectedModel.name && (
            <TransformControls
               object={scene.getObjectByName(selectedModel.name)}
               mode={modes[selectedModel?.mode ?? 0]}
            />
         )}
         {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
         <OrbitControls {...props} />
      </>
   );
}
