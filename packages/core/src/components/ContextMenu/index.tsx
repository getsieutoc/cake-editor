import { useEffect, useState } from "react";
import { Box, Menu, MenuList, MenuItem } from "@/components";
import {
   useContextMenuPosition,
   useControlModel,
   useListModel,
   useText3DList,
} from "@/globalStates";
import _ from "lodash";
import { getGroupObjectSelected, getPrimitiveObject } from "@/utils/service";
import { THREE_MESH } from "@/utils/types";
import { __PRIMITIVE_MODEL__, __TEXT_3D__ } from "@/utils/constants";

export const ContextMenu = () => {
   const { position, group } = useContextMenuPosition();
   const [show, setShow] = useState(false);
   const { selectedModel, setModel, resetSelectedModel, transformControlsRef } =
      useControlModel();
   const { setOpen: setOpenAdd3DText } = useText3DList();
   const { listItem, setListItem } = useListModel();
   const isDisabledObjAnd3DText =
      !selectedModel.id || selectedModel.name === __TEXT_3D__;

   useEffect(() => {
      if (position.x + position.y > 0) {
         setShow(true);
      }
   }, [position.x, position.y]);

   const handleCopy = () => {
      if (!selectedModel.object) return alert("The object must be selected");

      const clonedModel = selectedModel.object.clone();
      const currentPos = clonedModel.position.clone();

      clonedModel.position.set(
         currentPos.x * Math.random() + 1,
         Math.random() + 1,
         Math.random() + 1
      );
      group?.add(clonedModel); // Add the cloned model to the scene
   };
   const handleRemove = () => {
      if (!selectedModel.object) return alert("The object must be selected");
      transformControlsRef &&
         transformControlsRef.detach &&
         transformControlsRef.detach();
      selectedModel.object.material = undefined;
      selectedModel.object.geometry = undefined;
      selectedModel.object.parent?.remove(selectedModel.object);

      resetSelectedModel();
   };
   const handleGroupAndMove = () => {
      if (!selectedModel.object) return alert("The object must be selected");
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
               <MenuItem onClick={() => setOpenAdd3DText(position)}>
                  Add text
               </MenuItem>
               <MenuItem
                  onClick={() => {
                     const objectModel = getPrimitiveObject(
                        selectedModel.object
                     );

                     const idModel = objectModel?.userData["0"].idModel;
                     listItem.forEach((o) => {
                        if (o.id === idModel) {
                           o.annotations.push("New label");
                           return;
                        }
                     });
                     setListItem(_.cloneDeep(listItem));
                  }}
                  isDisabled={!selectedModel.id}
               >
                  Add label (Object selected)
               </MenuItem>
               <MenuItem
                  onClick={handleCopy}
                  isDisabled={isDisabledObjAnd3DText}
               >
                  Duplicate
               </MenuItem>
               <MenuItem
                  onClick={() => setModel({ ...selectedModel, mode: 1 })}
                  isDisabled={!selectedModel.id}
               >
                  Rotate [R]
               </MenuItem>
               <MenuItem
                  onClick={() => setModel({ ...selectedModel, mode: 2 })}
                  isDisabled={!selectedModel.id}
               >
                  Scale [S]
               </MenuItem>
               <MenuItem
                  onClick={() => setModel({ ...selectedModel, mode: 0 })}
                  isDisabled={!selectedModel.id}
               >
                  Translate [G]
               </MenuItem>
               <MenuItem
                  onClick={handleGroupAndMove}
                  isDisabled={isDisabledObjAnd3DText}
               >
                  Group and transform
               </MenuItem>
               <MenuItem onClick={handleRemove} isDisabled={!selectedModel.id}>
                  Delete [Delete]
               </MenuItem>
            </MenuList>
         </Menu>
      </Box>
   );
};
