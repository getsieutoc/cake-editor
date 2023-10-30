import { THREE_MESH } from "@/utils/types";
import { create } from "zustand";

type SelectedModelType = {
   id: string | null;
   parentId?: string | null;
   object?: THREE_MESH;
   name?: string;
   mode?: number;
};
type ControlModelTye = {
   selectedModel: SelectedModelType;
   setModel: (val: SelectedModelType) => void;
   resetSelectedModel: () => void;
};

export const useControlModel = create<ControlModelTye>()((set) => ({
   selectedModel: {
      id: null,
      parentId: null,
      name: "",
      mode: 0,
      object: undefined,
   },
   setModel: (newState?: SelectedModelType) => {
      set((state) => ({
         ...state,
         selectedModel: { ...state.selectedModel, ...newState },
      }));
   },
   resetSelectedModel: () => {
      set((state) => ({
         ...state,
         selectedModel: {
            id: null,
            object: undefined,
            parentId: null,
            name: "",
            mode: 0,
         },
      }));
   },
}));
