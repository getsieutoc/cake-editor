import { create } from "zustand";

type SelectedModelType = {
   id: string | null;
   name?: string;
   mode?: number;
};
type ControlModelTye = {
   selectedModel: SelectedModelType;
   setModel: (val: SelectedModelType) => void;
};

export const useControlModel = create<ControlModelTye>()((set) => ({
   selectedModel: {
      id: null,
      name: "",
      mode: 0,
   },
   setModel: (newState?: SelectedModelType) => {
      set((state) => ({
         ...state,
         selectedModel: { ...state.selectedModel, ...newState },
      }));
   },
}));
