import { __GROUP_MODEL__ } from "./constants";

export const getGroupObjectSelected = (
   obj: THREE.Mesh | THREE.Group
): THREE.Mesh | THREE.Group | undefined => {
   if (!obj) return undefined;
   if (obj.parent?.name === __GROUP_MODEL__) {
      return obj;
   } else {
      return getGroupObjectSelected(obj?.parent as THREE.Group);
   }
};
