// import mock from '../../mock-data/mock.json'
// import { Product } from '../../models/models'
import styles from "./StoreItems.module.css";
import Item from "../../components/Item/Item";
import { useEffect, useState } from "react";
import { useProductsSlice } from "../../zustand/ProductSlice";
import { getStoreProducts } from "../../services/store-products-service";
import { ProductType } from "../../../../global-types/product";
import { renderProductsStore } from "../../zustand/should-refetch-slice";

// function sortProductsByCreatedAt(products: ProductType[]): ProductType[] {
//   return [...products].sort((a, b) => {
//     const dateA: any = a.createdAt && new Date(a.createdAt).getTime();
//     const dateB: any = b.createdAt && new Date(b.createdAt).getTime();
//     return ((dateB as number) - dateA) as number;
//   });
// }
import { SortOptionStore } from "../../zustand/sort-option-slice";

function sortProductsByCreatedAt(
  products: ProductType[],
  sortBy: "newest" | "oldest"
): ProductType[] {
  return [...products].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (sortBy === "newest") {
      return dateB - dateA;
    } else if (sortBy === "oldest") {
      return dateA - dateB;
    }
    return 0;
  });
}

function sortProductsByQuantity(products: ProductType[]): ProductType[] {
  return [...products].sort((a, b) => b.quantity - a.quantity);
}

function sortProductsByPrice(
  products: ProductType[],
  sortBy: "most expensive" | "least expensive"
): ProductType[] {
  return [...products].sort((a, b) => {
    if (sortBy === "most expensive") {
      return b.price - a.price;
    } else if (sortBy === "least expensive") {
      return a.price - b.price;
    }
    return 0;
  });
}
// function

function sortProductsHelper(
  products: ProductType[],
  option: string = "newest"
): ProductType[] {
  switch (option) {
    case "newest":
      return sortProductsByCreatedAt(products, "newest");
    case "oldest":
      return sortProductsByCreatedAt(products, "oldest");
    case "most expensive":
      return sortProductsByPrice(products, "most expensive");
    case "least expensive":
      return sortProductsByPrice(products, "least expensive");
    case "quantity":
      return sortProductsByQuantity(products);
    default:
      return products;
  }
}

export default function StoreItems() {
  // event.stopPropagation();
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

  const [selectedOption, setSelectedOption] = useState("newest");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  // useEffect(() => {
  //   console.log("selected option:", selectedOption);
  // }, [selectedOption]);

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

  function sortProducts() {}

  useEffect(() => {
    console.log("storeItems", storeItems);
    console.log("store:", storeItems);
    // setSortedStoreItems(
    //   // [...storeItems].sort((a, b) => b.quantity - a.quantity)
    //   const sorted = sortProductsHelper(storeItems, selectedOption);

    // );
    const sorted = sortProductsHelper(storeItems, selectedOption);
    setSortedStoreItems(sorted);
    console.log("selected option:", selectedOption);
    // change above to call the sorthelperFunc, with default to newest
  }, [storeItems, selectedOption]);

  // come back to sorting later

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id={styles.container}>
      <div id={styles.options}>
        <label htmlFor="options">Sort By:</label>
        <select
          id="options"
          name="options"
          onChange={handleOptionChange}
          defaultValue={"newest"}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most expensive">Most Expensive</option>
          <option value="least expensive">Least expensive</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
      <div className={styles.storeItems}>
        {sortedStoreItems.map(
          (product: ProductType) =>
            product.quantity >= 1 && <Item key={product.id} product={product} />
        )}
      </div>
    </div>
  );
}
