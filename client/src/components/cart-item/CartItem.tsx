import styles from "./CartItem.module.css";
import { useCartSlice } from "../../zustand/ShoppingCartSlice";
import { userStore } from "../../zustand/UserStore";
import {
  deleteProductFromShoppingCart,
  getShoppingCartProduct,
} from "../../services/shopping-cart-service";
import { useEffect, useState } from "react";
import { ProductType } from "../../../../global-types/product";
import { ShoppingCartProductType } from "../../../../global-types/shopping-cart-product";

export default function CartItem({
  cartItem,
}: {
  cartItem: ShoppingCartProductType;
}) {
  const id = userStore((state) => state.id);

  const increaseQuantity = useCartSlice((state) => state.increaseQuantity);
  const decreaseQuantity = useCartSlice((state) => state.decreaseQuantity);
  const removeFromCart = useCartSlice((state) => state.removeFromCart);

  console.log("->", cartItem.productId);
  const [fetchedItem, setFetchedItem] = useState<ProductType>();

  useEffect(() => {
    const fetchShoppingCartProduct = async () => {
      try {
        const shoppingCartProduct = await getShoppingCartProduct(
          cartItem.productId
        );
        // console.log('shoppingCartProducts: ', shoppingCartProducts)

        if (shoppingCartProduct.name) {
          setFetchedItem(shoppingCartProduct);
          // console.log('PRODUCT SC: ', shoppingCartProducts)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShoppingCartProduct();
  }, []);

  function updateQuantityStateAndInBackend(
    action: "increase" | "decrease",
    cartItem: ShoppingCartProductType
  ) {
    console.log("before switch", cartItem);
    switch (action) {
      case "increase":
        increaseQuantity(cartItem);
        // make async req to backend API here if I can await
        break;
      case "decrease":
        decreaseQuantity(cartItem);
        break;
      // same here
    }
    console.log("after switch", cartItem);
  }
  // useEffect(() => console.log(fetchedItem), [fetchedItem]);

  // console.log('CART ITEM: ', cartItem)
  console.log(fetchedItem?.pictureUrl);
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={fetchedItem?.pictureUrl}
        alt="small product image"
      />
      <div className={styles.itemInfo}>
        <div className={styles.left}>
          <p className={styles.name}>{fetchedItem?.name}</p>
          {/* <p className={styles.size}>{fetchedItem?.size}</p> */}
          <p className={styles.price}>{fetchedItem?.price}</p>
        </div>

        <div className={styles.right}>
          <p
            className={styles.decrease}
            onClick={() =>
              updateQuantityStateAndInBackend("decrease", cartItem)
            }
          >
            -
          </p>
          <p className={styles.size}>{cartItem?.productQuantity}</p>
          <p
            className={styles.increase}
            onClick={() =>
              updateQuantityStateAndInBackend("increase", cartItem)
            }
          >
            +
          </p>
        </div>

        <p
          className={styles.delete}
          onClick={() => {
            deleteProductFromShoppingCart({
              userId: id,
              productId: cartItem.productId,
            });
            removeFromCart(cartItem.id);
          }}
        >
          +
        </p>
      </div>
    </div>
  );
}
