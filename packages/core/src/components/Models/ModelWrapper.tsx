import { useListModel } from "@/globalStates";
import { Model } from "@/components";

type ModelWrapperTypes = {};
export const ModelWrapper = (props: ModelWrapperTypes) => {
   const { listItem } = useListModel();

   return listItem?.map((model, index) => (
      <Model
         key={index}
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
