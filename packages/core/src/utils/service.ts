import { __GROUP_MODEL__, __PRIMITIVE_MODEL__ } from "./constants";

export const getGroupObjectSelected = (
   obj:
      | THREE.Mesh
      | THREE.Group
      | THREE.Object3D<THREE.Object3DEventMap>
      | undefined
):
   | THREE.Mesh
   | THREE.Group
   | THREE.Object3D<THREE.Object3DEventMap>
   | undefined => {
   if (!obj) return undefined;
   if (obj?.name === __PRIMITIVE_MODEL__) {
      return obj;
   } else {
      return getGroupObjectSelected(obj?.parent as THREE.Group);
   }
};
