import { useRef, useState } from "react";
import _ from "lodash";
import {
   Box,
   Html,
   Tooltip,
   CustomCard,
   FormInputAnnotation,
} from "@/components";
import { AnnotationType } from "@/utils/types";
import { useControlModel, useListModel } from "@/globalStates";

type AnnotationTypes = {
   index: number;
   annotation: AnnotationType;
   scene: THREE.Group<THREE.Object3DEventMap>;
};
const initAnnotation = {
   content: "",
   id: "",
   idModel: "",
   position: { x: 0, y: 0, z: 0 },
};
export const Annotation = (props: AnnotationTypes) => {
   const { annotation, scene, index } = props;
   const textRef = useRef(null);
   const [itemEdit, setItemEdit] = useState<AnnotationType>(initAnnotation);
   const { setEnableOrbitControl } = useControlModel();
   const { listItem, setListItem } = useListModel();

   const handleSave = () => {
      const listTemp = _.cloneDeep(listItem);

      Object.keys(scene.userData).map((key, i) => {
         if (key === annotation.id) {
            scene.userData[key].content = itemEdit.content;
            listTemp.map((o) => {
               if (o.id === annotation.idModel && o.annotations) {
                  o.annotations[Number(annotation.id)] = itemEdit.content;
               }
            });
         }
      });
      setListItem(listTemp);
      handleOnOff(true);
   };
   const handleOnOff = (value: boolean) => {
      // value = true for enable orbitcontrol
      setEnableOrbitControl(value);
      setItemEdit(
         value ? _.cloneDeep(initAnnotation) : _.cloneDeep(annotation)
      );
   };
   const handleDelete = () => {
      const listTemp = _.cloneDeep(listItem);

      Object.keys(scene.userData).map((key, i) => {
         if (key === annotation.id) {
            delete scene.userData[key];
            listTemp.map((o) => {
               if (o.id === annotation.idModel && o.annotations) {
                  delete o.annotations[Number(annotation.id)];
               }
            });
         }
      });
      setListItem(listTemp);
      handleOnOff(true);
   };
   return (
      <Html
         position={[
            annotation.position.x + 0.7,
            annotation.position.y + index / 8,
            annotation.position.z,
         ]}
         distanceFactor={3}
         ref={textRef}
      >
         <Tooltip
            label={
               <Box fontSize="12px" padding={3} color="white">
                  Double click to edit label
               </Box>
            }
            background="black"
            rounded={5}
            hasArrow
            placement="auto"
         >
            <CustomCard
               onDoubleClick={(e) => handleOnOff(false)}
               display={annotation.content ? "-moz-initial" : "none"}
               cursor="pointer"
               fontSize="20px"
               width="max-content"
               maxW="500px"
               transform="translate3d(calc(15%), calc(-50%), 0)"
               textAlign="left"
               userSelect="none"
               fontFamily="var(--leva-fonts-mono)"
               background="black"
               color="white"
               rounded={10}
               paddingX={10}
               opacity={itemEdit.id ? 1 : 0.5}
               _hover={{
                  opacity: 1,
               }}
               _before={{
                  content: `""`,
                  position: "absolute",
                  top: "20px",
                  left: "-100px",
                  height: "1px",
                  width: "100px",
                  background: "black",
               }}
            >
               <>
                  {itemEdit.id ? (
                     <FormInputAnnotation
                        annotation={annotation}
                        handleOnOff={handleOnOff}
                        handleSave={handleSave}
                        itemEdit={itemEdit}
                        setItemEdit={setItemEdit}
                        handleDelete={handleDelete}
                     />
                  ) : (
                     <Box
                        dangerouslySetInnerHTML={{ __html: annotation.content }}
                     />
                  )}
               </>
            </CustomCard>
         </Tooltip>
      </Html>
   );
};
