import {
   Box,
   VStack,
   HStack,
   Button,
   Textarea,
   FormLabel,
   Input,
} from "@/components";
import { textToHtml } from "@/utils/service";
import { AnnotationType } from "@/utils/types";

type FormInputAnnotationTypes = {
   annotation: AnnotationType;
   itemEdit: AnnotationType;
   setItemEdit: (item: AnnotationType) => void;
   handleSave: () => void;
   handleOnOff: (val: boolean) => void;
   handleDelete: () => void;
};
export const FormInputAnnotation = (props: FormInputAnnotationTypes) => {
   const {
      annotation,
      itemEdit,
      setItemEdit,
      handleOnOff,
      handleSave,
      handleDelete,
   } = props;
   return (
      <VStack>
         <Textarea
            color="black"
            rows={3}
            defaultValue={annotation.content}
            onChange={(e) => {
               const newVal = textToHtml(e.target.value);
               setItemEdit({
                  ...itemEdit,
                  content: newVal,
               });
            }}
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
                  background="orange"
                  color="white"
                  padding={3}
                  rounded={5}
                  onClick={() => handleOnOff(true)}
               >
                  Cancel
               </Button>
            </Box>
            <Box width="100%">
               <Button
                  size="xs"
                  background="red"
                  color="white"
                  padding={3}
                  rounded={5}
                  onClick={handleDelete}
               >
                  Delete
               </Button>
            </Box>
         </HStack>
      </VStack>
   );
};
