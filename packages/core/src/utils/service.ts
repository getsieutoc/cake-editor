import { __GROUP_MODEL__, __PRIMITIVE_MODEL__ } from "./constants";
import { ModelType } from "./types";

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
   // case for root object (__PRIMITIVE_MODEL__)
   // case for object copied (__GROUP_MODEL__)
   else if (
      obj?.name === __PRIMITIVE_MODEL__ ||
      obj?.name === __GROUP_MODEL__
   ) {
      return obj;
   } else {
      return getGroupObjectSelected(obj?.parent as THREE.Group);
   }
};

function levenshteinDistance(a: string, b: string) {
   if (a.length === 0) return b.length;
   if (b.length === 0) return a.length;

   const matrix = [];

   for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
   }

   for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
   }

   for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
         if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
         } else {
            matrix[i][j] = Math.min(
               matrix[i - 1][j - 1] + 1,
               Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
            );
         }
      }
   }

   return matrix[b.length][a.length];
}

// Fuzzy search function
export function fuzzySearch(
   array: ModelType[],
   searchValue: string,
   threshold = 3
) {
   return array.filter((item) => {
      // Assuming the property to search is "name"
      const distance = levenshteinDistance(
         searchValue.toLowerCase(),
         item?.name?.toLowerCase() ?? ""
      );
      return distance <= threshold;
   });
}

// Perform a fuzzy search
// const searchResult = fuzzySearch(complexObjectArray, "John", 2);
// console.log(searchResult);
