import { useEffect, useState } from "react";
import {
   Box,
   Menu,
   MenuButton,
   Button,
   MenuList,
   MenuItem,
} from "@/components";
import { useContextMenuPosition, useControlModel } from "@/globalStates";

type ContextMenuTypes = {};
export const ContextMenu = (props: ContextMenuTypes) => {
   const { position, group } = useContextMenuPosition();
   const [show, setShow] = useState(false);
   const { selectedModel } = useControlModel();

   useEffect(() => {
      if (position.x + position.y > 0) {
         setShow(true);
      }
   }, [position.x, position.y]);

   const handleCopy = () => {
      if (selectedModel.object) {
         const clonedModel = selectedModel.object.clone();
         const currentPos = clonedModel.position.clone();

         clonedModel.position.set(
            currentPos.x * Math.random() + 1,
            Math.random() + 1,
            Math.random() + 1
         );
         group?.add(clonedModel); // Add the cloned model to the scene
      }
   };
   return (
      <Box position="absolute" top={position.y} left={position.x}>
         <Menu isOpen={show} onClose={() => setShow(false)} isLazy>
            <MenuList fontSize={12} p={0}>
               <MenuItem onClick={handleCopy}>Duplicate</MenuItem>
               <MenuItem>Delete</MenuItem>
            </MenuList>
         </Menu>
      </Box>
   );
};
