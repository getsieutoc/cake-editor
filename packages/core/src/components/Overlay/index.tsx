import { useShowHide } from "@/globalStates";
import {
   Box,
   Icon,
   BiHide,
   HStack,
   BiShowAlt,
   AiOutlineArrowLeft,
   AiOutlineArrowRight,
   AiOutlineArrowDown,
   AiOutlineArrowUp,
} from "@/components";

export function ShortCutOverlay() {
   const { showHelper, setShowHelper } = useShowHide();

   return (
      <Box
         color="white"
         background="black"
         fontFamily="monospace"
         opacity={0.5}
         textShadow="1px 1px 2px black"
         paddingY={1}
      >
         <HStack paddingX={1} spacing={1}>
            <Box>Active when the object is select</Box>
            <Box textAlign="right">
               <Icon
                  boxSize={6}
                  cursor="pointer"
                  onClick={() => setShowHelper(!showHelper)}
                  as={showHelper ? BiShowAlt : BiHide}
               />
            </Box>
         </HStack>
         {showHelper && (
            <Box>
               <HStack paddingX={1} spacing={1}>
                  <Icon as={AiOutlineArrowUp} />
                  <Icon as={AiOutlineArrowDown} />
                  <Icon as={AiOutlineArrowLeft} />
                  <Icon as={AiOutlineArrowRight} />
                  <Box>to move the cake selected.</Box>
               </HStack>

               <Box>
                  <Box
                     marginLeft={1}
                     paddingX={1}
                     border="1px solid gray"
                     display="inline"
                  >
                     S
                  </Box>
                  {` Scale`}
               </Box>
               <Box>
                  <Box
                     marginLeft={1}
                     paddingX={1}
                     border="1px solid gray"
                     display="inline"
                  >
                     R
                  </Box>
                  {` Rotate`}
               </Box>
               <Box>
                  <Box
                     marginLeft={1}
                     paddingX={1}
                     border="1px solid gray"
                     display="inline"
                  >
                     G
                  </Box>
                  {` Move/Grab`}
               </Box>
               <Box>
                  <Box
                     marginLeft={1}
                     paddingX={1}
                     border="1px solid gray"
                     display="inline"
                  >
                     Delete
                  </Box>
                  {` Delete`}
               </Box>
               <Box>
                  <Box
                     marginLeft={1}
                     paddingX={1}
                     border="1px solid gray"
                     display="inline"
                  >
                     Double click outside
                  </Box>
                  {` Unselected`}
               </Box>
            </Box>
         )}
      </Box>
   );
}
