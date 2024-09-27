import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useWishlist = create(persist(
    (set) => ({
        wishlist: [],
              
        addProductInWishlist: (product) => {
          set((state) => ({
            wishlist: state.wishlist?.includes({productId: product.id}) ? false : [...state.wishlist, product],
          }));
        },
      
        removeProductInWishlist: (productId) => {
          set((state) => ({
            wishlist: state.wishlist.filter((product) => product.id !== productId),
          }));
        }
      }),

      { name: "store-wishlist" }
));

export default useWishlist;