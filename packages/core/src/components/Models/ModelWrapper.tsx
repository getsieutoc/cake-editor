import { useKeyboard, useControls } from "@/hooks";
import { useControlModel, useListModel } from "@/globalStates";
import { Model, button } from "@/components";

type ModelWrapperTypes = {};
export const ModelWrapper = (props: ModelWrapperTypes) => {
   const keyMap = useKeyboard();
   const { listItem, clearList } = useListModel();
   const { resetSelectedModel } = useControlModel();

   useControls({
      "Clean Up": button(() => {
         clearList();
         resetSelectedModel();
      }),
   });
   return listItem?.map((model, index) => (
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
   ));
};
