import { useRef } from "react";
import { Text3D } from "@/components";
import { THREE_MESH, ThreeEvent } from "@/utils/types";
import { __GROUP_MODEL__, __TEXT_3D__ } from "@/utils/constants";
import {
   ItemText3DType,
   useContextMenuPosition,
   useControlModel,
} from "@/globalStates";

type Text3DRenderTypes = ItemText3DType & {};
export const Text3DRender = (props: Text3DRenderTypes) => {
   const { font, content, color = "pink", ...rest } = props;
   const { selectedModel, setModel, resetSelectedModel } = useControlModel();
   const posContextMenu = useContextMenuPosition();
   const textRef = useRef<THREE_MESH & THREE.Group<THREE.Object3DEventMap>>(
      null
   );
   const groupRef = useRef<THREE.Group>(null);
   const handleClickText = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      const obj = textRef.current as THREE_MESH;
      if (!obj) return alert("Text is not found");

      setModel({
         id: obj.id,
         parentId: obj.parent?.id,
         name: obj.name,
         object: obj,
      });
   };
   const handlePointerMissed = (e: MouseEvent) => {
      e.type === "dblclick" && resetSelectedModel();
   };
   const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (selectedModel.id === e.object.id) {
         posContextMenu.setPosition({ x: e.x, y: e.y }, groupRef.current);
      }
   };

   return (
      <group
         ref={groupRef}
         name={__GROUP_MODEL__}
         onClick={handleClickText}
         onPointerMissed={handlePointerMissed}
         onContextMenu={handleContextMenu}
         onPointerOver={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
         }}
         onPointerOut={(e) => (document.body.style.cursor = "default")}
         dispose={null}
      >
         <Text3D
            ref={textRef}
            font={font}
            name={__TEXT_3D__}
            receiveShadow
            castShadow
            dispose={null}
            {...rest}
         >
            {content}
            <meshMatcapMaterial color={color} />
            {/* <meshNormalMaterial /> */}
         </Text3D>
      </group>
   );
};

export { Add3DText } from "./AddText";
export { FontSelect } from "./FontSelect";
