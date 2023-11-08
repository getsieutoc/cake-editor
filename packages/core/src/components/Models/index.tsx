import { useRef, useMemo, useState } from "react";
import { THREE } from "@/components";
import { useGLTF, useDrag } from "@/hooks";
import {
   GroupProps,
   PrimitiveProps,
   THREE_MESH,
   DreiGLTF,
   ThreeEvent,
   ModelType,
} from "@/utils/types";
import {
   __GROUP_MODEL__,
   __PRIMITIVE_MODEL__,
   __SELECTED__,
} from "@/utils/constants";
import { useContextMenuPosition, useControlModel } from "@/globalStates";
import { Annotation } from "./Annotation";

type ModelTypes = GroupProps & {
   path: string;
   position?: number[];
   rotation?: number[];
   scale?: number[];
   defaultColor?: string;
   modelDetail: ModelType;
};

export function Model(props: ModelTypes) {
   const {
      path,
      position = [0, 0, 0],
      scale = [1, 1, 1],
      rotation,
      modelDetail,
      ...rest
   } = props;
   const gltf = useGLTF(path) as DreiGLTF;
   const modelRef = useRef<THREE.Group>(null);
   const primitiveRef = useRef<PrimitiveProps>(null);
   const { selectedModel, setModel, resetSelectedModel, isTransform } =
      useControlModel();
   const posContextMenu = useContextMenuPosition();
   const [pos2d, setPos2d] = useState({ x: 0, y: 0 });

   const annotations = useMemo(() => {
      if (modelDetail.annotations?.length) {
         const scene = gltf.scene;
         modelDetail.annotations.forEach((ann, i) => {
            const position = { x: 0, y: 0, z: 0 };

            scene?.children.forEach(
               (chil: THREE.Object3D<THREE.Object3DEventMap>) => {
                  const isObject =
                     chil.name &&
                     chil.name !== __PRIMITIVE_MODEL__ &&
                     chil.name !== __GROUP_MODEL__ &&
                     (chil.type === "Mesh" || chil.type === "Group") &&
                     (chil.position.x || chil.position.y || chil.position.z);
                  if (isObject) {
                     position.x = chil.position.x;
                     position.y = chil.position.y;
                     position.z = chil.position.z;
                     return;
                  }
               }
            );
            // store to scene for backup in local
            scene.userData = {
               ...scene.userData,
               [`${i}`]: {
                  id: `${i}`,
                  idModel: modelDetail.id,
                  content: ann,
                  position,
               },
            };
         });

         const anns = scene.userData;

         return Object.keys(anns)?.map((key, idx) => {
            const annItem = anns[key];
            if (annItem.id)
               return (
                  <Annotation
                     key={idx}
                     index={idx}
                     annotation={annItem}
                     scene={scene}
                  />
               );
         });
      }

      return [];
   }, [pos2d.x, pos2d.y, modelDetail.annotations]);

   const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (isTransform) return;

      const obj = e.object as THREE_MESH;
      obj.castShadow = true;
      obj.receiveShadow = true;
      setModel({
         id: obj.id,
         parentId: obj.parent?.id,
         displayName: modelDetail.name,
         name: obj.name,
         object: obj,
      });
   };
   const handlePointerMissed = (e: MouseEvent) => {
      if (e.type === "dblclick") {
         resetSelectedModel();
      }
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (selectedModel.id === e.object.id) {
         posContextMenu.setPosition({ x: e.x, y: e.y }, modelRef.current);
      }
   };
   const bind = useDrag(({ down, movement: [x, y] }) => {
      if (down) {
         setPos2d({ x, y });
      }
   });

   return (
      <group
         ref={modelRef}
         {...(bind() as GroupProps)}
         castShadow
         receiveShadow
         name={__GROUP_MODEL__}
         onClick={handleClickModel}
         onPointerMissed={handlePointerMissed}
         onContextMenu={handleContextMenu}
         onPointerOver={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
         }}
         onPointerOut={(e) => {
            document.body.style.cursor = "default";
         }}
         dispose={null}
         {...rest}
      >
         <primitive
            name={__PRIMITIVE_MODEL__}
            ref={primitiveRef}
            object={gltf.scene}
            scale={scale}
            rotation={rotation}
            position={position}
            castShadow
            receiveShadow
         >
            {annotations}
         </primitive>
      </group>
   );
}

export { ModelWrapper } from "./ModelWrapper";
export { Annotation } from "./Annotation";
export { FormInputAnnotation } from "./FormInput";
