import { useEffect, useState } from "react";
import _ from "lodash";
import {
   Box,
   FormLabel,
   Input,
   Popover,
   Textarea,
   PopoverTrigger,
   PopoverBody,
   PopoverContent,
   Button,
   SelectChakra as Select,
   NumberDecrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   NumberIncrementStepper,
} from "@/components";
import { useControlModel } from "@/globalStates";
import { BoxProps } from "@/utils/types";
import { benderText3D } from "@/utils/service";

type AxisType = "x" | "y" | "z";
type StateType = {
   text: string;
   axis: AxisType;
   angle: number;
};
type BenderText3DTypes = BoxProps & {};
export const BenderText3D = (props: BenderText3DTypes) => {
   const { ...rest } = props;
   const { selectedModel, resetSelectedModel } = useControlModel();
   const [state, setState] = useState<StateType>({
      text: "",
      angle: 0,
      axis: "y",
   });
   const isOpen = !!selectedModel.id;
   const onClose = () => resetSelectedModel();

   const debounce = _.debounce(function (value: string) {
      setState({ ...state, text: value });
   }, 300);

   useEffect(() => {
      if (selectedModel.object?.geometry) {
         selectedModel.object.geometry.dispose();
         benderText3D(selectedModel.object?.geometry, state.axis, state.angle);
      }
   }, [state]);

   return (
      <Box {...rest}>
         <Popover
            isLazy
            isOpen={isOpen}
            closeOnBlur={false}
            onClose={onClose}
            lazyBehavior="keepMounted"
         >
            <PopoverContent maxW="150px" rounded={3}>
               <PopoverBody>
                  {/* <FormLabel fontSize={12} margin={0}>
                     Text
                  </FormLabel>
                  <Textarea
                     onChange={(e) => debounce(e.target.value)}
                     size="xs"
                     rows={1}
                  /> */}
                  <FormLabel fontSize={12} margin={0}>
                     Axis
                  </FormLabel>
                  <Select
                     onChange={(e) =>
                        setState({ ...state, axis: e.target.value as AxisType })
                     }
                     size="xs"
                     fontWeight={600}
                     defaultValue={state.axis}
                  >
                     <option value="x">x</option>
                     <option value="y">y</option>
                     <option value="z">z</option>
                  </Select>
                  <FormLabel fontSize={12} margin={0}>
                     Angle
                  </FormLabel>
                  <NumberInput
                     step={0.01}
                     min={-Math.PI / 2}
                     max={Math.PI / 2}
                     size="xs"
                     value={state.angle}
                     onChange={(value) => {
                        let v = Number(value);
                        if (
                           (v > 0 && v < state.angle) ||
                           (v < 0 && v > state.angle)
                        ) {
                           v = 0;
                        }
                        setState({ ...state, angle: v });
                     }}
                     clampValueOnBlur
                     inputMode="numeric"
                  >
                     <NumberInputField />
                     <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                     </NumberInputStepper>
                  </NumberInput>
               </PopoverBody>
            </PopoverContent>
         </Popover>
      </Box>
   );
};
