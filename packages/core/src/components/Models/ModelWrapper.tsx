import { useControlModel, useListModel, useText3DList } from "@/globalStates";
import { Model, Text3DRender } from "@/components";
import { useFrame, useKeyboard } from "@/hooks";
import { SHORT_CUTS } from "@/utils/constants";

type ModelWrapperTypes = {};
export const ModelWrapper = (props: ModelWrapperTypes) => {
   const { listItem } = useListModel();
   const { textList } = useText3DList();
   const { selectedModel, setModel, transformControlsRef } = useControlModel();
   const keyMap = useKeyboard();

   useFrame((state, delta) => {
      if (selectedModel.object) {
         // move object
         keyMap?.[SHORT_CUTS.ArrowLeft] &&
            (selectedModel.object.position.x -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowRight] &&
            (selectedModel.object.position.x += 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowUp] &&
            (selectedModel.object.position.z -= 1 * delta);
         keyMap?.[SHORT_CUTS.ArrowDown] &&
            (selectedModel.object.position.z += 1 * delta);
         // transform object
         keyMap?.[SHORT_CUTS.KeyG] &&
            setModel({
               ...selectedModel,
               mode: 0,
            });

         keyMap?.[SHORT_CUTS.KeyR] &&
            setModel({
               ...selectedModel,
               mode: 1,
            });
         keyMap?.[SHORT_CUTS.KeyS] &&
            setModel({
               ...selectedModel,
               mode: 2,
            });
         // delete object
         keyMap?.[SHORT_CUTS.Delete] &&
            (function () {
               if (!selectedModel.object || !transformControlsRef)
                  return alert("The object must be selected");
               transformControlsRef.detach && transformControlsRef.detach();
               selectedModel.object.material = undefined;
               selectedModel.object.geometry = undefined;
               selectedModel.object.parent?.remove(selectedModel.object);
            })();
      }
   });

   return (
      <>
         {textList?.map((textItem, idx) => (
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
               modelDetail={model}
               castShadow
               receiveShadow
               dispose={null}
            />
         ))}
      </>
   );
};
