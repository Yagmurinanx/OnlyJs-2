import create from "zustand";
import { persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    (set) => ({
      photos: [],
      posts: [],
      addFavoritePhoto: (photo) =>
        set((state) => ({
          photos: [...state.photos, photo],
        })),
      removeFavoritePhoto: (photoId) =>
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== photoId),
        })),
      addFavoritePost: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),
      removeFavoritePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
    }),
    {
      name: "favorites-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useFavoritesStore;
