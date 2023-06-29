// import { CartItemType, Product } from '../models/models'
import { create } from "zustand";
import { ShoppingCartProductType } from "../../../global-types/shopping-cart-product";
import { ProductType } from "../../../global-types/product";
import Item from "../components/Item/Item";

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
  (set, get) => ({
    isOpen: false,
    cartItems: [],

    addItem: (newItem) =>
      set((state) => {
        // console.log("newitem", newItem);
        // if there is no such item in the cart yet
        if (
          state.cartItems.find(
            (item) =>
              item.productId === newItem.productId && item.productQuantity >= 1
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
          if (
            existingItem.productQuantity >= 1 &&
            item.id === existingItem?.id
          ) {
            // console.log("increase quantity", {
            //   ...existingItem,
            //   quantity: existingItem.productQuantity + 1,
            // });
            console.log("no existing item", item);
            console.log("existing item", existingItem);
            const qCopy = existingItem.productQuantity + 1;
            // existingItem.productQuantity++;
            const productToCheckOut = {
              ...existingItem,
              // productQuantity: existingItem.productQuantity,
              productQuantity: qCopy,
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
        const itemFoundAndOnly1InStock = state.cartItems.find(
          (item) => item === existingItem
        )?.productQuantity;
        if (itemFoundAndOnly1InStock) {
          const itemIdToRemove = itemFoundAndOnly1InStock;
          console.log("logging 1", itemIdToRemove);
          state.removeFromCart(itemIdToRemove);
          // return { cartItems: newState } as {
          //   cartItems: ShoppingCartProductType[];d
          // };
          console.log("logging", state.cartItems);
          return { cartItems: state.cartItems };
        } else {
          const newState: ShoppingCartProductType[] = [];
          state.cartItems.forEach((item) => {
            // if the item does exist in the cart
            if (item.id === existingItem?.id) {
              const qCopy = existingItem.productQuantity - 1;
              const productToCheckOut = {
                ...existingItem,
                productQuantity: qCopy,
              };
              console.log("decrease quantity", productToCheckOut);
              // return productToCheckOut;
              if (productToCheckOut.productQuantity > 0) {
                // return productToCheckOut;
                newState.push(productToCheckOut);
              }
            } else if (item.id === existingItem.id) {
              get().removeFromCart(item.id);
              // return '';
              // return '';
            } else {
              // return item;
              newState.push(item);
            }
          });
          return { cartItems: newState };
        }
      }),

    // decreaseQuantity: (existingItem) =>
    //   set((state) => {
    //     if (existingItem.productQuantity === 1) {
    //       state.removeFromCart(existingItem.id);
    //       return { cartItems: state.cartItems };
    //     } else {
    //       const newState = state.cartItems.map((item) => {
    //         if (item.id === existingItem.id) {
    //           return {
    //             ...item,
    //             productQuantity: item.productQuantity - 1,
    //           };
    //         } else {
    //           return item;
    //         }
    //       });
    //       return { cartItems: newState };
    //     }
    //   }),

    removeFromCart: (existingItemID) =>
      set((state) => {
        console.log("remove from cart being called");
        console.log(
          "state items",
          state.cartItems.filter((item) => item.id !== existingItemID)
        );
        return {
          cartItems: state.cartItems.filter(
            (item) => item.id !== existingItemID
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
