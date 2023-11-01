export type { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
   thumbnail?: string;
   path: string;
   position?: [number, number, number];
   scale?: [number, number, number];
   rotation?: [number, number, number];
   isSelected?: boolean;
};
export type THREE_MESH = THREE.Mesh & {
   material: {
      color: THREE.Color;
      name: string;
   };
};
export type ModeType = "translate" | "rotate" | "scale";
