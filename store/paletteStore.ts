import { Color, PaletteStoreActions } from "@/types";
import { create } from "zustand";

export const usePaletteStore = create<PaletteStoreActions>((set) => ({
  palette: null,
  paletteName: null,
  colorNames: null,
  setPalette: (newPalette: Color[]) => {
    set({
      palette: newPalette,
    });
  },
  setPaletteName: (newPaletteName: string) => {
    set({ paletteName: newPaletteName });
  },
  setColorNames: (newColorNames: string[]) => {
    set({
      colorNames: newColorNames,
    });
  },
}));
