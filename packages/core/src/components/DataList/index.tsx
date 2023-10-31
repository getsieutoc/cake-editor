import { ComponentType, useMemo, useState } from "react";
import { GridListProps, VirtuosoGrid } from "react-virtuoso";
import styled from "@emotion/styled";
import { Box, Input, HStack, Button } from "@/components";
import { ModelType } from "@/utils/types";
import { Item } from "./Item";
import { useListModel, useShowHide } from "@/globalStates";
import { fuzzySearch } from "@/utils/service";

type DataListTypes = {
   data: ModelType[];
   size?: (string & {}) | "sm" | "md" | "lg" | "xs";
};
export const DataList = (props: DataListTypes) => {
   const { data, size = "xs" } = props;
   const { showListModel, setShowListModel } = useShowHide();
   const { setListItem } = useListModel();
   const [text, setText] = useState("");

   const modelList = useMemo(() => {
      if (data.length) {
         const items = fuzzySearch(data, text);
         if (items.length) return items;
         return data;
      }
      return [];
   }, [data, text]);
   return (
      <Box>
         <HStack spacing={1}>
            <Box w="100%">
               <Input
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
                  onClick={() => setShowListModel(!showListModel)}
                  variant="outline"
                  rounded={3}
                  size={size}
               >
                  {showListModel ? `hide` : `show`}
               </Button>
            </Box>
         </HStack>

         {modelList.length && (
            <VirtuosoGrid
               style={{ height: 400 }}
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
                     onClick={() => setListItem(item)}
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
