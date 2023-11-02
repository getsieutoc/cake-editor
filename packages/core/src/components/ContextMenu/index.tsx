import { useEffect, useState } from "react";
import { Box, Menu, MenuList, MenuItem } from "@/components";
import { useContextMenuPosition, useControlModel } from "@/globalStates";
import { getGroupObjectSelected } from "@/utils/service";
import { THREE_MESH } from "@/utils/types";

type ContextMenuTypes = {};
export const ContextMenu = (props: ContextMenuTypes) => {
   const { position, group } = useContextMenuPosition();
   const [show, setShow] = useState(false);
   const { selectedModel, setModel, resetSelectedModel, transformControlsRef } =
      useControlModel();

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
   const handleRemove = () => {
      transformControlsRef &&
         transformControlsRef.detach &&
         transformControlsRef.detach();
      selectedModel.object?.parent?.remove(selectedModel.object);
      resetSelectedModel();
   };
   const handleGroupAndMove = () => {
      const group = getGroupObjectSelected(selectedModel.object);
      if (group) {
         setModel({
            id: group?.id,
            name: group?.name,
            object: group as THREE_MESH,
            parentId: group.parent?.id,
         });
      }
   };
   return (
      <Box position="absolute" top={position.y} left={position.x}>
         <Menu isOpen={show} onClose={() => setShow(false)} isLazy>
            <MenuList fontSize={12} p={0}>
               <MenuItem onClick={handleCopy}>Duplicate</MenuItem>
               <MenuItem onClick={handleGroupAndMove}>
                  Group and transform
               </MenuItem>
               <MenuItem onClick={handleRemove}>Delete</MenuItem>
            </MenuList>
         </Menu>
      </Box>
   );
};
