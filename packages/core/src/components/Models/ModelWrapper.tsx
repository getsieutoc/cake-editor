import { useListModel, useText3DList } from "@/globalStates";
import { Model, Text3DRender } from "@/components";

type ModelWrapperTypes = {};
export const ModelWrapper = (props: ModelWrapperTypes) => {
   const { listItem } = useListModel();
   const { textList } = useText3DList();
   console.log("textList :>> ", textList);
   return (
      <>
         {textList.map((textItem, idx) => (
            <Text3DRender
               key={idx}
               font={textItem.font}
               content={textItem.content}
               size={textItem.size}
               bevelSize={textItem.bevelSize}
               bevelThickness={textItem.bevelThickness}
               bevelEnabled={textItem.bevelEnabled}
               height={textItem.height}
               lineHeight={textItem.lineHeight}
               letterSpacing={textItem.letterSpacing}
               position={textItem.position}
               scale={textItem.scale}
               color={textItem.color}
               curveSegments={textItem.curveSegments}
            />
         ))}

         {listItem?.map((model, index) => (
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
         ))}
      </>
   );
};
