import { create } from 'zustand';

import { ImageStore } from 'types';

export const useImage = create<ImageStore>((set) => ({
  image: null,
  setImage: (image) => set({ image }),
}));
