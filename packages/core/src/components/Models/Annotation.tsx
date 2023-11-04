import { useRef, useState } from "react";
import _ from "lodash";
import {
   Box,
   Button,
   VStack,
   HStack,
   Html,
   Input,
   Textarea,
   Tooltip,
   FormLabel,
   CustomCard,
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
      setItemEdit(value ? initAnnotation : _.cloneDeep(annotation));
   };

   return (
      <Html
         position={[
            annotation.position.x + 0.7,
            annotation.position.y + (index + 1) / 10,
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
                     <VStack>
                        <Textarea
                           color="black"
                           rows={3}
                           defaultValue={annotation.content}
                           onChange={(e) =>
                              setItemEdit({
                                 ...itemEdit,
                                 content: e.target.value,
                              })
                           }
                        />
                        <Box>
                           <HStack>
                              <Box>
                                 <FormLabel marginY={0} fontSize="15px">
                                    Pos X
                                 </FormLabel>
                                 <Input
                                    width="60px"
                                    type="number"
                                    size="xs"
                                    rounded={5}
                                    color="black"
                                    isDisabled
                                    defaultValue={itemEdit.position.x}
                                    onChange={(e) => {
                                       setItemEdit({
                                          ...itemEdit,
                                          position: {
                                             x: Number(e.target.value),
                                             y: itemEdit.position.y,
                                             z: itemEdit.position.z,
                                          },
                                       });
                                    }}
                                 />
                              </Box>
                              <Box px={1}>
                                 <FormLabel marginY={0} fontSize="15px">
                                    Pos Y
                                 </FormLabel>
                                 <Input
                                    type="number"
                                    size="xs"
                                    rounded={5}
                                    width="60px"
                                    color="black"
                                    isDisabled
                                    defaultValue={itemEdit.position.y}
                                    onChange={(e) => {
                                       setItemEdit({
                                          ...itemEdit,
                                          position: {
                                             x: itemEdit.position.x,
                                             y: Number(e.target.value),
                                             z: itemEdit.position.z,
                                          },
                                       });
                                    }}
                                 />
                              </Box>
                              <Box>
                                 <FormLabel marginY={0} fontSize="15px">
                                    Pos Z
                                 </FormLabel>
                                 <Input
                                    width="60px"
                                    color="black"
                                    type="number"
                                    size="xs"
                                    rounded={5}
                                    isDisabled
                                    defaultValue={itemEdit.position.z}
                                    onChange={(e) => {
                                       setItemEdit({
                                          ...itemEdit,
                                          position: {
                                             x: itemEdit.position.x,
                                             y: itemEdit.position.y,
                                             z: Number(e.target.value),
                                          },
                                       });
                                    }}
                                 />
                              </Box>
                           </HStack>
                        </Box>
                        <HStack>
                           <Box width="100%">
                              <Button
                                 size="xs"
                                 background="green"
                                 color="white"
                                 padding={3}
                                 rounded={5}
                                 onClick={handleSave}
                              >
                                 Save
                              </Button>
                           </Box>
                           <Box width="100%">
                              <Button
                                 size="xs"
                                 background="red"
                                 color="white"
                                 padding={3}
                                 rounded={5}
                                 onClick={() => handleOnOff(true)}
                              >
                                 Cancel
                              </Button>
                           </Box>
                        </HStack>
                     </VStack>
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
