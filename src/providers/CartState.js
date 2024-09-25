import { create } from 'zustand';
import { persist } from 'zustand/middleware'


const useCart = create(persist(
    (set) => ({
        cart: [],
        totalAmount : 0,

        addInitialCartData: (initialCartData) => {
          set({ 
            cart: initialCartData.cart[0].products,
          });
        },
      
        addProduct: (product) => {
          set((state) => ({
            cart: state?.cart?.includes({_id: product.id}) ? [...state.cart.map((item) => item._id === product.id ? { ...item, quantity: item.quantity + 1 } : item)] : [...state.cart, product],
          }));
        },
      
        removeProduct: (productId) => {
          set((state) => ({
            cart: state.cart.filter((product) => product._id !== productId),
          }));
        },
      
        incrementQuantity: (productId) => {
          set((state) => ({
            cart: state.cart.map((product) =>
              product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            ),
          }));
        },
      
        decrementQuantity: (productId) => {
          set((state) => ({
            cart: state.cart.map((product) =>
              product._id === productId && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }));
        },
      
        getTotal: () => {
          set((state) => ({
            totalAmount: state?.cart?.map((product) => {
              state.totalAmount += product.quantity * Math.abs((product.price * (product.discount/100)) - product.price)
            })
          }))
        },
      }),
      { name: "store-cart" }
));

export default useCart;