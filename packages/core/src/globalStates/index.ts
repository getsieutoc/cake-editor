import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { ModelType, THREE_MESH, TransformControlsProps } from "@/utils/types";

type SelectedModelType = {
   id: number | null;
   parentId?: number | null;
   object?: THREE_MESH;
   name?: string;
   mode?: number;
};
type ControlModelTye = {
   transformControlsRef?: TransformControlsProps | null;
   setTransformControlsRef: (trans: TransformControlsProps | null) => void;
   selectedModel: SelectedModelType;
   setModel: (val: SelectedModelType) => void;
   resetSelectedModel: () => void;
};

export const useControlModel = create<ControlModelTye>()((set) => ({
   transformControlsRef: null,
   setTransformControlsRef: (trans) => {
      set((state) => ({ ...state, transformControlsRef: trans }));
   },
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
         transformControlsRef: null,
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

type ShowHideTypes = {
   autoRotate: boolean;
   setAutoRotate: (val: boolean) => void;
   showPanelLeva: boolean;
   setShowPanelLeva: (val: boolean) => void;
   showHelper: boolean;
   setShowHelper: (val: boolean) => void;
   showListModel: boolean;
   setShowListModel: (val: boolean) => void;
};
export const useShowHide = create<ShowHideTypes>()(
   persist(
      (set, get) => ({
         showHelper: true,
         setShowHelper: (val: boolean) =>
            set((state) => ({ ...state, showHelper: val })),
         showListModel: true,
         setShowListModel: (val: boolean) =>
            set((state) => ({ ...state, showListModel: val })),
         showPanelLeva: true,
         setShowPanelLeva: (val: boolean) =>
            set((state) => ({ ...state, showPanelLeva: val })),
         autoRotate: true,
         setAutoRotate: (val: boolean) =>
            set((state) => ({ ...state, autoRotate: val })),
      }),
      {
         name: "shortcut-overlay-helper",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

type SelectItemTypes = {
   listItem: ModelType[];
   setListItem: (val: ModelType[]) => void;
   clearList: () => void;
};
export const useListModel = create<SelectItemTypes>()(
   persist(
      (set, get) => ({
         listItem: [],
         setListItem: (list: ModelType[]) =>
            set((state) => ({ ...state, listItem: [...list] })),
         clearList: () => set((state) => ({ ...state, listItem: [] })),
      }),
      {
         name: "selected-item-model-new",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

type Position2D = { x: number; y: number };
type ContextMenuPositionType = {
   position: Position2D;
   setPosition: (
      pos: Position2D,
      group?: THREE.Group<THREE.Object3DEventMap> | null
   ) => void;
   group?: THREE.Group<THREE.Object3DEventMap> | null;
   reset: () => void;
};
export const useContextMenuPosition = create<ContextMenuPositionType>()(
   (set) => ({
      position: {
         x: 0,
         y: 0,
      },
      setPosition: (
         pos: Position2D,
         group?: THREE.Group<THREE.Object3DEventMap> | null
      ) => {
         set((state) => ({
            ...state,
            group,
            position: { ...pos },
         }));
      },

      reset: () => {
         set((state) => ({
            ...state,
            position: {
               x: 0,
               y: 0,
            },
         }));
      },
   })
);
