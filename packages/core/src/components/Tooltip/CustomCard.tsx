import { forwardRef } from "react";
import { Box } from "@/components";
import { BoxProps } from "@/utils/types";

export const CustomCard = forwardRef(({ children, ...rest }: BoxProps, ref) => (
   <Box ref={ref} {...(rest as BoxProps)}>
      {children}
   </Box>
));
