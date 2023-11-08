import { useEffect, useRef } from "react";

type KeyMapType = {
   [key: string]: boolean;
};
export function useKeyboard() {
   const keyMap = useRef<KeyMapType>({});

   useEffect(() => {
      const onDocumentKey = (e: KeyboardEvent) => {
         keyMap.current[e.code] = e.type === "keydown";
      };
      document.addEventListener("keydown", onDocumentKey);
      document.addEventListener("keyup", onDocumentKey);
      return () => {
         document.removeEventListener("keydown", onDocumentKey);
         document.removeEventListener("keyup", onDocumentKey);
      };
   }, []);
   return keyMap.current;
}
