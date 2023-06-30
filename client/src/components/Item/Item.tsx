// import { Product } from '../../models/models'
import styles from "./Item.module.css";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../../global-types/product";
// import { Product } from '../../models/models'
import { generateTimeAgo } from "../../helpers/date";
import { useEffect, useState } from "react";
import { renderProductsStore } from "../../zustand/should-refetch-slice";

type Props = {
  key: number;
  product: ProductType;
  // product: Product
};

export default function Item({ product }: Props) {
  const { shouldReRender } = renderProductsStore();
  const [timeAgo, setTimeAgo] = useState(
    generateTimeAgo(product.createdAt as string)
  );
  console.log(product.pictureUrl);
  const navigate = useNavigate();
  // if (product.quantity < 1) return;

  useEffect(() => {
    // console.log("haha");
    console.log("zzz", product.createdAt);
    console.log("getting time", generateTimeAgo(product.createdAt as string));
    setTimeAgo(generateTimeAgo(product.createdAt as string));
  }, []);

  return (
    <div>
      {product.quantity && (
        <div
          className={styles.storeItem}
          onClick={(e) => {
            e.stopPropagation();
            console.log("item clicked");
            navigate(`/${product.id}`);
          }}
        >
          <div className={styles.pwrapper}>
            <p>{product.name}</p>

            <p>$ {product.price} USD</p>
            <p>
              {product.quantity}
              {product.quantity > 0 && product.quantity === 1
                ? " product in stock"
                : " products in stock"}
            </p>
            <p>Category: {product.category}</p>
            <p>Seller: {product.sellerName}</p>
            <p>Listed: {timeAgo}</p>
          </div>
          {/* <p>Listed: {getTimeDifference(p)}</p> */}
          <img className={styles.img} src={product.pictureUrl}></img>
        </div>
      )}
    </div>
  );
}
