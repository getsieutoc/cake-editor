import { ChakraProvider } from "@chakra-ui/react";
import { CakeEditor } from "@/components";
import { ModelType } from "./utils/types";
export interface EditorProps {
   title?: string;
   background?: string;
   models: ModelType[];
}

export function Editor(props: EditorProps) {
   return (
      <ChakraProvider>
         <CakeEditor {...props} />
      </ChakraProvider>
   );
}

Editor.displayName = "Editor";
