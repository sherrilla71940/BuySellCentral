import styles from "./SellerStore.module.css";
import { useEffect, useState } from "react";
import Item from "../Item/Item";
// import { Product } from '../../models/models'
import { ProductType } from "../../../../global-types/product";
import { getSellerProducts } from "../../services/seller-service";
import { userStore } from "../../zustand/UserStore";
import { renderProductsStore } from "../../zustand/should-refetch-slice";

export default function SellerStore() {
  const [products, setProducts] = useState<ProductType[]>([]);
  console.log(products);
  const { id } = userStore();
  const { shouldReRender } = renderProductsStore();
  //   console.log("id", id);
  //   console.log("storage id", localStorage.getItem("id"));
  // });

  useEffect(() => {
    const fetchProducts = async () => {
      // console.log("id", id);
      try {
        const products: ProductType[] | undefined = await getSellerProducts(id);
        if (Array.isArray(products)) {
          setProducts(products);
        }
      } catch (error) {
        console.log("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [id, shouldReRender]);

  return (
    <div>
      <h1 className={styles.heading}>MY STORE:</h1>
      {
        // {products.length &&
        <div className={styles.storeItems}>
          {products.map((product: ProductType) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      }
    </div>
  );
}
