// import mock from '../../mock-data/mock.json'
// import { Product } from '../../models/models'
import styles from "./StoreItems.module.css";
import Item from "../../components/Item/Item";
import { useEffect, useState } from "react";
import { useProductsSlice } from "../../zustand/ProductSlice";
import { getStoreProducts } from "../../services/store-products-service";
import { ProductType } from "../../../../global-types/product";
import { renderProductsStore } from "../../zustand/should-refetch-slice";

export default function StoreItems() {
  const { shouldReRender, setRerender } = renderProductsStore();
  const storeItems = useProductsSlice((state) => state.storeItems);
  const addProduct = useProductsSlice((state) => state.addProduct);
  const checkRemoveProduct = useProductsSlice(
    (state) => state.checkRemoveProduct
  );
  // const removeProduct = useProductsSlice((state) => state.removeProduct);
  const isLoading = storeItems.length === 0;

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [sortedStoreItems, setSortedStoreItems] = useState([...storeItems]);

  // when adding multiple products to cart, checkout does not update quantity on each product on products page

  useEffect(() => {
    const fetchAllStoreProducts = async () => {
      try {
        const storeProducts = await getStoreProducts();
        // setFetchedProducts(storeProducts);
        checkRemoveProduct(storeProducts);

        storeProducts.forEach((product: ProductType) => {
          // removeProduct(product.id);
          addProduct(product);
          // removeProduct(product.id);
          console.log("product quantity is", product.quantity);
        });

        // checkRemoveProduct(storeProducts);

        console.log("storeProducts", storeProducts);
        console.log("storeItems", storeItems);
        console.log("24: ", storeItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllStoreProducts();
    console.log("store:", storeItems);
    console.log(shouldReRender);
  }, [shouldReRender]);

  useEffect(() => {
    console.log("storeItems", storeItems);
    console.log("store:", storeItems);
    setSortedStoreItems(
      [...storeItems].sort((a, b) => b.quantity - a.quantity)
    );
  }, [storeItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.storeItems}>
      {sortedStoreItems.map(
        (product: ProductType) =>
          product.quantity >= 1 && <Item key={product.id} product={product} />
      )}
    </div>
  );
}
