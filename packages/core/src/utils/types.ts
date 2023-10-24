export type * from "@chakra-ui/react";
export type { MeshProps } from "@react-three/fiber";
export type ModelType = {
   name?: string;
   path: string;
   position?: [number, number, number];
   scale?: [number, number, number];
   rotate?: [number, number, number];
};
