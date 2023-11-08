import { useState } from "react";
import _ from "lodash";
import {
   Box,
   Input,
   Button,
   HStack,
   Checkbox,
   Popover,
   Textarea,
   FormLabel,
   FontSelect,
   PopoverBody,
   PopoverContent,
   PopoverTrigger,
   AiOutlineCloseCircle,
} from "@/components";
import { ItemText3DType, useText3DList } from "@/globalStates";
import { fonts } from "@/utils/constants";

export const Add3DText = () => {
   const { openData, setOpen, textList, setTextList } = useText3DList();
   const isOpen = openData.x + openData.y > 0;
   const [text, setText] = useState<ItemText3DType>({
      content: "",
      font: fonts[0].path,
      color: "#d6617e",
      position: [0, 1, 0],
      scale: [1, 1, 0.1],
      size: 0.6,
      curveSegments: 24,
      letterSpacing: 0.02,
      lineHeight: 0.9,
      height: 1,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
   });
   const handleAddText = () => {
      if (!text.content.trim()) return;
      const temp = _.cloneDeep(textList);
      temp.push(text);
      setTextList(temp);
      onClose();
   };
   const onClose = () => setOpen({ x: 0, y: 0 });
   const handleChange = (
      fieldName:
         | "content"
         | "font"
         | "color"
         | "position"
         | "scale"
         | "size"
         | "curveSegments"
         | "letterSpacing"
         | "lineHeight"
         | "height"
         | "bevelEnabled"
         | "bevelThickness"
         | "bevelSize",
      value: any
   ) => {
      setText({ ...text, [fieldName]: value });
   };
   return (
      <Box
         position="absolute"
         top={openData.y}
         left={openData.x}
         display={isOpen ? "-moz-initial" : "none"}
      >
         <Popover
            isOpen={isOpen}
            closeOnBlur={false}
            onClose={onClose}
            isLazy
            lazyBehavior="keepMounted"
         >
            {isOpen && (
               <Box>
                  <PopoverTrigger>
                     <Button
                        leftIcon={<AiOutlineCloseCircle size={15} />}
                        onClick={onClose}
                        size="xs"
                     >
                        Close
                     </Button>
                  </PopoverTrigger>
               </Box>
            )}

            <PopoverContent>
               <PopoverBody>
                  <Box>
                     <Textarea
                        autoFocus
                        value={text.content}
                        onChange={(e) =>
                           handleChange("content", e.target.value)
                        }
                     />
                     <HStack>
                        <FontSelect
                           getFont={(font) => handleChange("font", font.path)}
                           size="xs"
                           rounded={5}
                        />
                        <Input
                           rounded={5}
                           size="xs"
                           type="color"
                           defaultValue={text.color}
                           onChange={(e) =>
                              handleChange("color", e.target.value)
                           }
                        />
                     </HStack>
                     <HStack>
                        <Checkbox
                           size="sm"
                           isChecked={text.bevelEnabled}
                           onChange={(e) =>
                              handleChange("bevelEnabled", e.target.checked)
                           }
                        >
                           Bevel enabled
                        </Checkbox>
                     </HStack>
                     <HStack>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Bevel thickness
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.bevelThickness}
                              isDisabled={!text.bevelEnabled}
                              onChange={(e) =>
                                 handleChange(
                                    "bevelThickness",
                                    Number(e.target.value)
                                 )
                              }
                           />
                        </Box>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Bevel size
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              isDisabled={!text.bevelEnabled}
                              value={text.bevelSize}
                              onChange={(e) =>
                                 handleChange(
                                    "bevelSize",
                                    Number(e.target.value)
                                 )
                              }
                           />
                        </Box>
                     </HStack>
                     <HStack>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Line height
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.lineHeight}
                              onChange={(e) =>
                                 handleChange(
                                    "lineHeight",
                                    Number(e.target.value)
                                 )
                              }
                           />
                        </Box>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Height
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.height}
                              onChange={(e) =>
                                 handleChange("height", Number(e.target.value))
                              }
                           />
                        </Box>
                     </HStack>
                     <HStack>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Letter spacing
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.letterSpacing}
                              onChange={(e) =>
                                 handleChange(
                                    "letterSpacing",
                                    Number(e.target.value)
                                 )
                              }
                           />
                        </Box>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Size
                           </FormLabel>
                           <Input
                              width="100px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.size}
                              onChange={(e) =>
                                 handleChange("size", Number(e.target.value))
                              }
                           />
                        </Box>
                     </HStack>
                     <HStack>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Position X
                           </FormLabel>
                           <Input
                              width="60px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.position?.[0] ?? 0}
                              onChange={(e) =>
                                 handleChange("position", [
                                    Number(e.target.value),
                                    text.position?.[1],
                                    text.position?.[2],
                                 ])
                              }
                           />
                        </Box>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Position Y
                           </FormLabel>
                           <Input
                              width="60px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.position?.[1] ?? 0}
                              onChange={(e) =>
                                 handleChange("position", [
                                    text.position?.[0],
                                    Number(e.target.value),
                                    text.position?.[2],
                                 ])
                              }
                           />
                        </Box>
                        <Box>
                           <FormLabel marginY={0} fontSize="xs">
                              Position Z
                           </FormLabel>
                           <Input
                              width="60px"
                              type="number"
                              size="xs"
                              rounded={5}
                              value={text.position?.[2] ?? 0}
                              onChange={(e) =>
                                 handleChange("position", [
                                    text.position?.[0],
                                    text.position?.[1],
                                    Number(e.target.value),
                                 ])
                              }
                           />
                        </Box>
                     </HStack>
                  </Box>
                  <Box paddingTop={1}>
                     <Button
                        onClick={handleAddText}
                        size="xs"
                        width="100%"
                        colorScheme="green"
                     >
                        ADD
                     </Button>
                  </Box>
               </PopoverBody>
            </PopoverContent>
         </Popover>
      </Box>
   );
};
