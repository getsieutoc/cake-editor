import { useMemo, useState } from "react";
import { Grid } from "react-virtualized";
import _ from "lodash";
import { Box, Input, HStack, Button } from "@/components";
import { ButtonProps, ModelType } from "@/utils/types";
import { Item } from "./Item";
import { useShowHide, useListModel } from "@/globalStates";
import { fuzzySearch } from "@/utils/service";

type DataListTypes = {
   data: ModelType[];
   size?: ButtonProps["size"];
};
export const DataList = (props: DataListTypes) => {
   const { data, size = "xs" } = props;
   const { showListModel, setShowListModel } = useShowHide();
   const { listItem, setListItem } = useListModel();

   const [text, setText] = useState("");

   const modelList = useMemo(() => {
      if (data.length) {
         const items = fuzzySearch(data, text);
         if (items.length) return items;
         return data;
      }
      return [];
   }, [data, text]);

   const handleSelect = (item: ModelType) => {
      const newItem = _.cloneDeep(item);
      newItem.isSelected = true;
      const x = 0;
      const y = 1.5;
      const z = 0;
      newItem.position = [x, y, z];
      const listWithoutItem = listItem.filter((o) => o.name !== newItem.name);
      const temp = _.cloneDeep(listWithoutItem);
      temp.push(newItem);
      setListItem(temp);
   };

   const rowCount =
      Math.floor(modelList.length / 4) <= 0
         ? 1
         : Math.floor(modelList.length / 4 + 1);
   return (
      <Box>
         <HStack spacing={1}>
            <Box width="100%">
               <Input
                  onFocus={() => setShowListModel(true)}
                  placeholder="Search..."
                  _placeholder={{ color: "white" }}
                  size={size}
                  onChange={(e) => setText(e.target.value)}
               />
            </Box>
            <Box>
               <Button
                  onClick={() => {
                     setShowListModel(!showListModel);
                  }}
                  variant="outline"
                  rounded={3}
                  size={size}
               >
                  {showListModel ? `hide` : `show`}
               </Button>
            </Box>
         </HStack>

         <>
            {showListModel && modelList.length && (
               <Grid
                  cellRenderer={({
                     columnIndex,
                     key,
                     rowIndex,
                     style,
                     ...rest
                  }) => {
                     const indexItem = rowIndex * 4 + columnIndex;
                     return (
                        <Box key={key} style={style}>
                           {modelList?.[indexItem] && (
                              <Item
                                 index={indexItem}
                                 item={modelList?.[indexItem]}
                                 onClick={() =>
                                    handleSelect(modelList[indexItem])
                                 }
                              />
                           )}
                        </Box>
                     );
                  }}
                  columnCount={4}
                  columnWidth={70}
                  rowHeight={73}
                  rowCount={rowCount}
                  height={rowCount * 100}
                  width={4 * 70}
               />
            )}
         </>
      </Box>
   );
};
