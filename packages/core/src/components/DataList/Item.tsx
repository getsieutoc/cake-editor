import { Box, Image, Tooltip } from "@/components";
import { BoxProps, ModelType } from "@/utils/types";

type ItemTypes = BoxProps & {
   index: number;
   item: ModelType;
};
export const Item = (props: ItemTypes) => {
   const { item, ...rest } = props;

   return (
      <Box
         cursor="pointer"
         _hover={{
            border: "1px solid black",
         }}
         {...rest}
      >
         <Tooltip label={item.name} hasArrow>
            <Image src={item.thumbnail} boxSize="70px" />
         </Tooltip>
      </Box>
   );
};
