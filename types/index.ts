export interface IconClass {
  iconClass: string;
}

export interface ImageStoreState {
  image: string | null;
}

export interface ImageStoreActions extends ImageStoreState {
  setImage: (newImage: string) => void;
}

export interface Color {
  rgb: number[];
}

export interface PaletteStore {
  palette: null | Color[];
  paletteName: null | string;
  colorNames: null | string[];
  communityPalettes: null | CommunityPalette[];
}

export interface PaletteStoreActions extends PaletteStore {
  setPalette: (newPalette: Color[]) => void;
  setPaletteName: (newPaletteName: string) => void;
  setColorNames: (newColorNames: string[]) => void;
  setCommunityPalettes: (data: CommunityPalette[]) => void;
}

export interface StockImage {
  url: string;
}

export interface StockImageIndexStore {
  currentIndex: number;
}
export interface StockImageIndexStoreActions extends StockImageIndexStore {
  increaseStockImageIndex: () => void;
}

export interface SortBy {
  sortBy: "createdAt" | "like";
}

export interface Order {
  order: "ascending" | "descending";
}

export interface SortStoreActions extends SortBy, Order {
  setSortBy: (newSortBy: "createdAt" | "like") => void;
  setOrder: (newOrder: "ascending" | "descending") => void;
}

export interface CommunityPalette {
  name: string;
  slug: string;
  like: number;
  createdAt: number;
}

export interface CommunityPaletteComponentProps {
  name: string;
  slug: string;
  like: number;
  savedPalettes: string[];
  setSavedPalettes: (newSaved: string[]) => void;
}

export interface AddPaletteResponse {
  status: number;
  palette?: CommunityPalette;
  error: string;
}
