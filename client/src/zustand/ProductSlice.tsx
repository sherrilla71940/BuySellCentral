// import { Product } from '../models/models'
import { create } from "zustand";
import { ProductType } from "../../../global-types/product";

type ProductsState = {
  storeItems: ProductType[];
};

type ProductsAction = {
  addProduct: (newProduct: ProductType) => void;
  removeProduct: (id: number) => void;
};

// export const useProductsSlice = create<ProductsState & ProductsAction>()(
//   (set) => ({
//     storeItems: [],

//     addProduct: (newProduct: ProductType) => {
//       set((state) => {

// let foundIndex = state.storeItems.findIndex(prod => prod.id === newProduct.id);

//   if (foundIndex !== -1) {
//     const updatedItems = [...state.storeItems];
//     updatedItems[foundIndex] = newProduct;
//     return {storeItems: updatedItems}
//   } else {
//     return {storeItems: [...state.storeItems, {...newProduct}]}
//   }
// }
// )}});
export const useProductsSlice = create<ProductsState & ProductsAction>()(
  (set) => ({
    storeItems: [],

    addProduct: (newProduct: ProductType) => {
      set((state) => {
        let foundIndex = state.storeItems.findIndex(
          (prod) => prod.id === newProduct.id
        );

        if (foundIndex !== -1) {
          const updatedItems = [...state.storeItems];
          updatedItems[foundIndex] = newProduct;
          return { storeItems: updatedItems };
        } else {
          return { storeItems: [...state.storeItems, { ...newProduct }] };
        }
      }); // Missing closing parenthesis here
    },

    removeProduct: (id: number) => {
      set((state) => {
        const foundIndex = state.storeItems.findIndex((item) => item.id === id);
        if (foundIndex !== -1) {
          const updatedItems = [...state.storeItems];
          updatedItems.splice(foundIndex, 1); // Remove the item from the array
          return { storeItems: updatedItems };
        }
        return state; // Return the state as is if the item was not found
      });
    },
  })
);

// export const useProductsSlice = create<ProductsState & ProductsAction>()(
//   (set) => ({
//     storeItems: [],

//     addProduct: (newProduct: ProductType) => {
//       set((state) => {
//         const existingProductIndex = state.storeItems.findIndex(
//           (product) => product.id === newProduct.id
//         );

//         if (existingProductIndex !== -1) {
//           // Product already exists, update it
//           const updatedItems = [...state.storeItems];
//           updatedItems[existingProductIndex] = newProduct;
//           return { storeItems: updatedItems };
//         } else {
//           // Product doesn't exist, add it
//           return { storeItems: [...state.storeItems, newProduct] };
//         }
//       });
//     },
//   })
// );
