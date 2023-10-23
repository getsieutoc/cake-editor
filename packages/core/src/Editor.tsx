import { ChakraProvider } from "@chakra-ui/react";
export interface EditorProps {
   title?: string;
}

export function Editor(props: EditorProps) {
   return <ChakraProvider>Editor</ChakraProvider>;
}

Editor.displayName = "Editor";
