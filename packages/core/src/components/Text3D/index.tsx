import { useRef } from "react";
import { Text3D, Center } from "@/components";
import { THREE_MESH } from "@/utils/types";
import { ItemText3DType } from "@/globalStates";

type Text3DRenderTypes = ItemText3DType & {};
export const Text3DRender = (props: Text3DRenderTypes) => {
   const { font, content, color = "pink", ...rest } = props;
   const ref = useRef<THREE_MESH>(null);
   // const { width: w, height: h } = useThree((state) => state.viewport);
   console.log("ref.current :>> ", ref.current);
   return (
      <Text3D ref={ref} font={font} {...rest}>
         {content}
         <meshMatcapMaterial color={color} />
      </Text3D>
   );
};

export { Add3DText } from "./AddText";
export { FontSelect } from "./FontSelect";
