// import { Product } from '../models/models'
import { create } from "zustand";
import { ProductType } from "../../../global-types/product";
import StoreItems from "../components/store-items/StoreItems";

type ProductsState = {
  storeItems: ProductType[];
};

type ProductsAction = {
  addProduct: (newProduct: ProductType) => void;
  checkRemoveProduct: (fetchedProducts: ProductType[]) => void;
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
          console.log("new product", newProduct);
          console.log("original product", updatedItems[foundIndex]);
          updatedItems[foundIndex] = newProduct;
          console.log("updated items", updatedItems[foundIndex]);
          // updatedItems[foundIndex].quantity++;
          if (updatedItems[foundIndex].quantity === 0) {
            updatedItems.splice(foundIndex, 1); // Remove the item from the array
          }
          return { storeItems: updatedItems };
        } else {
          return { storeItems: [...state.storeItems, { ...newProduct }] };
        }
      }); // Missing closing parenthesis here
    },

    checkRemoveProduct: (fetchedProducts: ProductType[]) => {
      // set((state) => {
      //   // const foundIndex = state.storeItems.findIndex((item) => item.id === id);
      //   // if (foundIndex !== -1) {
      //   //   // const updatedItems = [...state.storeItems];
      //   //   const updatedItems = [...state.storeItems].slice(foundIndex, 1); // Remove the item from the array
      //   //   return { storeItems: updatedItems };
      //   // }
      //   // return state; // Return the state as is if the item was not found
      //   state.storeItems.forEach((product: ProductType) => {
      //     if (!fetchedProducts.includes(product)) {
      //       const index = state.storeItems.indexOf(product);
      //       const updatedItems = [...state.storeItems].slice(index, 1); // Remove the item from the array
      //       return { storeItems: updatedItems };
      //     }
      //     return { storeItems: [...state.storeItems] };
      //   });
      // });

      set((state) => {
        let updatedItems = [...state.storeItems]; // Create a copy of the storeItems array

        state.storeItems.forEach((product: ProductType) => {
          if (!fetchedProducts.includes(product)) {
            const index = updatedItems.indexOf(product);
            updatedItems.splice(index, 1); // Remove the item from the array
          }
        });

        return { storeItems: updatedItems }; // Return the updated state
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
