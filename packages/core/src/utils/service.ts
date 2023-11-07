import { __GROUP_MODEL__, __PRIMITIVE_MODEL__ } from "./constants";
import { ModelType, THREE_MESH } from "./types";

export const getGroupObjectSelected = (
   obj:
      | THREE_MESH
      | THREE.Group
      | THREE.Object3D<THREE.Object3DEventMap>
      | undefined
):
   | THREE_MESH
   | THREE.Group
   | THREE.Object3D<THREE.Object3DEventMap>
   | undefined => {
   if (!obj) return undefined;
   if (!obj.parent) return obj;
   return obj.parent;
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

export function getPrimitiveObject(
   obj: THREE_MESH | THREE.Object3D<THREE.Object3DEventMap> | undefined
) {
   if (!obj || !obj.parent) return undefined;
   if (obj.parent?.name === __PRIMITIVE_MODEL__) {
      return obj.parent;
   } else {
      return getPrimitiveObject(obj.parent);
   }
}
export const textToHtml = (text: string) => {
   const elem = document.createElement("div");
   return text
      .split(/\n\n+/)
      .map((paragraph) => {
         return (
            "<p>" +
            paragraph
               .split(/\n+/)
               .map((line) => {
                  elem.textContent = line;
                  return elem.innerHTML;
               })
               .join("<br/>") +
            "</p>"
         );
      })
      .join("");
};

export const benderText3D = (
   geometry: THREE.BufferGeometry,
   axis: string,
   angle: number
) => {
   let theta = 0;
   if (angle !== 0) {
      const v = (geometry.attributes.position as THREE.BufferAttribute)
         .array as unknown as number[];
      for (let i = 0; i < v.length; i += 3) {
         let x = v[i];
         let y = v[i + 1];
         let z = v[i + 2];

         switch (axis) {
            case "x":
               theta = z * angle;
               break;
            case "y":
               theta = x * angle;
               break;
            default:
               //z
               theta = x * angle;
               break;
         }

         let sinTheta = Math.sin(theta);
         let cosTheta = Math.cos(theta);

         switch (axis) {
            case "x":
               v[i] = x;
               v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
               v[i + 2] = -(y - 1.0 / angle) * sinTheta;
               break;
            case "y":
               v[i] = -(z - 1.0 / angle) * sinTheta;
               v[i + 1] = y;
               v[i + 2] = (z - 1.0 / angle) * cosTheta + 1.0 / angle;
               break;
            default:
               //z
               v[i] = -(y - 1.0 / angle) * sinTheta;
               v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle;
               v[i + 2] = z;
               break;
         }
      }
      geometry.attributes.position.needsUpdate = true;
   }
   return geometry;
};
