export type {
   OrbitControlsProps,
   TransformControlsProps,
} from "@react-three/drei";

export type * from "@chakra-ui/react";
export type {
   MeshProps,
   ThreeEvent,
   GroupProps,
   PrimitiveProps,
} from "@react-three/fiber";
export type ModelType = {
   name?: string;
   path: string;
   position?: [number, number, number];
   scale?: [number, number, number];
   rotation?: [number, number, number];
};

export type ModeType = "translate" | "rotate" | "scale";
