import { SelectChakra as Select } from "@/components";
import { fonts } from "@/utils/constants";
import { SelectProps } from "@/utils/types";

type FontItem = { name: string; path: string };
type FontSelectTypes = SelectProps & {
   getFont: (font: FontItem) => void;
};
export const FontSelect = (props: FontSelectTypes) => {
   const { getFont, ...rest } = props;
   return (
      <Select
         {...(rest as any)}
         onChange={(e) =>
            getFont(fonts.find((o) => o.path === e.target.value) as FontItem)
         }
      >
         {fonts.map((o, idx) => (
            <option key={idx} value={o.path}>
               {o.name}
            </option>
         ))}
      </Select>
   );
};
