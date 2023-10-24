export type { OrbitControlsProps } from "@react-three/drei";

export type * from "@chakra-ui/react";
export type { MeshProps, ThreeEvent } from "@react-three/fiber";
export type ModelType = {
   name?: string;
   path: string;
   position?: [number, number, number];
   scale?: [number, number, number];
   rotate?: [number, number, number];
};

export type ModeType = "translate" | "rotate" | "scale";
