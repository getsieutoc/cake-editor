import { ComponentType, useMemo, useState } from "react";
import { GridListProps, VirtuosoGrid } from "react-virtuoso";
import _ from "lodash";
import styled from "@emotion/styled";
import { Box, Input, HStack, Button } from "@/components";
import { ModelType } from "@/utils/types";
import { Item } from "./Item";
import { useShowHide, useListModel } from "@/globalStates";
import { fuzzySearch } from "@/utils/service";

type DataListTypes = {
   data: ModelType[];
   size?: (string & {}) | "sm" | "md" | "lg" | "xs";
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
      const x = -1;
      const y = 1.5;
      const z = 0;
      newItem.position = [x, y, z];
      const listWithoutItem = listItem.filter((o) => o.name !== newItem.name);
      const temp = _.cloneDeep(listWithoutItem);
      temp.push(newItem);
      setListItem(temp);
   };
   return (
      <Box>
         <HStack spacing={1}>
            <Box w="100%">
               <Input
                  onFocus={() => setShowListModel(true)}
                  placeholder="Search..."
                  _placeholder={{ color: "white" }}
                  size={size}
                  onChange={(e) => {
                     setText(e.target.value);
                  }}
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

         {showListModel && (
            <VirtuosoGrid
               style={{
                  maxHeight: 500,
                  height: (modelList.length / 4) * 100,
                  // borderRadius: "3px",
                  // border: "1px solid #bebebe",
               }}
               totalCount={modelList.length}
               data={modelList}
               overscan={200}
               components={{
                  Item: ItemContainer,
                  List: ListContainer as ComponentType<GridListProps>,
                  ScrollSeekPlaceholder: ({ height, width, index }) => (
                     <ItemContainer>
                        <ItemWrapper>{"--"}</ItemWrapper>
                     </ItemContainer>
                  ),
               }}
               itemContent={(index, item) => (
                  <Item
                     onClick={() => handleSelect(item)}
                     index={index}
                     item={item}
                  />
               )}
               scrollSeekConfiguration={{
                  enter: (velocity) => Math.abs(velocity) > 200,
                  exit: (velocity) => Math.abs(velocity) < 30,
                  change: (_, range) => console.log({ range }),
               }}
            />
         )}
      </Box>
   );
};
const ItemContainer = styled.div`
   padding: 1px;
   width: 71px;
   display: flex;
   flex: none;
   align-content: stretch;
`;

const ItemWrapper = styled.div`
   flex: 1;
   text-align: center;
   font-size: 80%;
   border: 1px solid var(gray);
   white-space: nowrap;
`;

const ListContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
`;
