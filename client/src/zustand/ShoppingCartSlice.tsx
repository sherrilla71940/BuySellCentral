// import { CartItemType, Product } from '../models/models'
import { create } from "zustand";
import { ShoppingCartProductType } from "../../../global-types/shopping-cart-product";

type ShoppingCartState = {
  isOpen: boolean;
  cartItems: ShoppingCartProductType[];
};

type ShoppingCartAction = {
  addItem: (newItem: ShoppingCartProductType) => void;
  increaseQuantity: (newItem: ShoppingCartProductType) => void;
  decreaseQuantity: (existingItem: ShoppingCartProductType) => void;
  removeFromCart: (existingItemID: number) => void;
  openCart: () => void;
  closeCart: () => void;
  emptyCart: () => void;
};

export const useCartSlice = create<ShoppingCartState & ShoppingCartAction>()(
  (set) => ({
    isOpen: false,
    cartItems: [],

    addItem: (newItem) =>
      set((state) => {
        console.log("newitem", newItem);
        // if there is no such item in the cart yet
        if (
          state.cartItems.find(
            (item) => item.productId === newItem.productId
          ) == undefined
        ) {
          return {
            cartItems: [...state.cartItems, { ...newItem, productQuantity: 1 }],
          };
        } else {
          return { cartItems: [...state.cartItems] };
        }
      }),

    increaseQuantity: (existingItem) =>
      set((state) => {
        const newState = state.cartItems.map((item) => {
          // if the item does exist in the cart
          if (existingItem.productQuantity && item.id === existingItem?.id) {
            // console.log("increase quantity", {
            //   ...existingItem,
            //   quantity: existingItem.productQuantity + 1,
            // });
            console.log("no existing item", item);
            console.log("existing item", existingItem);
            existingItem.productQuantity++;
            const productToCheckOut = {
              ...existingItem,
              productQuantity: existingItem.productQuantity,
            };
            console.log("increase quantity", productToCheckOut);
            return productToCheckOut;
          } else {
            return item;
          }
        });
        return { cartItems: newState };
      }),

    decreaseQuantity: (existingItem) =>
      set((state) => {
        // if there is no such item in the cart yet
        if (
          state.cartItems.find((item) => item === existingItem)
            ?.productQuantity === 1
        ) {
          return {
            cartItems: state.cartItems.filter(
              (item) => item.id != existingItem.id
            ),
          };
        } else {
          const newState = state.cartItems.map((item) => {
            // if the item does exist in the cart
            if (existingItem.productQuantity && item.id === existingItem?.id) {
              existingItem.productQuantity--;
              const productToCheckOut = {
                ...existingItem,
                productQuantity: existingItem.productQuantity,
                // was originally quantity
              };
              console.log("decrease quantity", productToCheckOut);
              return productToCheckOut;
            } else {
              return item;
            }
          });
          return { cartItems: newState };
        }
      }),

    removeFromCart: (existingItemID) =>
      set((state) => {
        return {
          cartItems: state.cartItems.filter(
            (item) => item.id != existingItemID
          ),
        };
      }),

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    emptyCart: () =>
      set((state) => {
        return { cartItems: [] };
      }),
  })
);
