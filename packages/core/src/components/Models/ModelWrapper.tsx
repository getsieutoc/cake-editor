import { useKeyboard } from "@/hooks";
import { useListModel } from "@/globalStates";
import { Model } from "@/components";

type ModelWrapperTypes = {};
export const ModelWrapper = (props: ModelWrapperTypes) => {
   const keyMap = useKeyboard();
   const { listItem } = useListModel();

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
