import { Box, Input } from "@/components";
import { BoxProps } from "@/utils/types";

type ColorPickerTypes = BoxProps & {
   name?: string;
};
export const ColorPicker = (props: ColorPickerTypes) => {
   const { name = "", ...rest } = props;
   return (
      <Box {...rest}>
         <Box
            textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
            color="white"
         >
            {name}
         </Box>
         <Input
            m={0}
            p={0}
            type="color"
            rounded={0}
            onChange={rest.onChange}
            value={"#" + rest.defaultValue}
         />
      </Box>
   );
};
