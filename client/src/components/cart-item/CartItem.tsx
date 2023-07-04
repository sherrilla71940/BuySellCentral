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
import {
  getShoppingCartProducts,
  updateCartProductQuantityService,
} from "../../services/shopping-cart-service";
// import { useState } from 'react';
import CloseIcon from "../../assets/close-icon.svg";
import UpvoteIcon from "../../assets/upvote.svg";
import DownvoteIcon from "../../assets/downvote.svg";

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
        console.log("shoppingcartproduct", shoppingCartProduct);
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

  async function updateQuantityStateAndInBackend(
    action: "increase" | "decrease",
    cartItem: ShoppingCartProductType
  ) {
    console.log("before switch", cartItem);
    switch (action) {
      case "increase":
        increaseQuantity(cartItem);
        await updateCartProductQuantityService({
          userId: id,
          productId: cartItem.productId,
          action: "increase",
        });
        // make async req to backend API here if I can await
        break;
      case "decrease":
        decreaseQuantity(cartItem);
        await updateCartProductQuantityService({
          userId: id,
          productId: cartItem.productId,
          action: "decrease",
        });
        break;
      // same here
    }
    console.log("after switch", cartItem);
    const products = await getShoppingCartProducts(id);
    console.log("fetch after switch", products);
  }
  // useEffect(() => console.log(fetchedItem), [fetchedItem]);

  // console.log('CART ITEM: ', cartItem)
  console.log(fetchedItem?.pictureUrl);
  return (
    <div className={styles.container}>
      {/* <div id={styles.closeWrapper}>
        <p
          className={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            deleteProductFromShoppingCart({
              userId: id,
              productId: cartItem.productId,
            });
            removeFromCart(cartItem.id);
          }}
        >
          +
        </p>
      </div> */}
      <div id={styles.closeWrapper}>
        <img
          className={styles.delete}
          src={CloseIcon}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            deleteProductFromShoppingCart({
              userId: id,
              productId: cartItem.productId,
            });
            removeFromCart(cartItem.id);
          }}
        />
      </div>
      <div id={styles.imageAndDetailsWrapper}>
        <img
          className={styles.img}
          src={fetchedItem?.pictureUrl}
          // alt="Product Image"
        />
        <div className={styles.itemInfo}>
          {/* <div className={styles.left}> */}
          <p className={styles.name} id={styles.price}>
            {fetchedItem?.name}
          </p>
          <p className={styles.price} id={styles.price}>
            ${fetchedItem?.price}
          </p>
          <p className={styles.name}>{fetchedItem?.quantity} in stock</p>
          {/* </div> */}
          <div id={styles.changeQuantity}>
            {/* <p
              className={styles.decrease}
              onClick={(e) => {
                e.stopPropagation();
                cartItem.productQuantity > 1 &&
                  updateQuantityStateAndInBackend("decrease", cartItem);
              }}
            >
              -
            </p> */}
            <img
              className={styles.vote}
              src={DownvoteIcon}
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                cartItem.productQuantity > 1 &&
                  updateQuantityStateAndInBackend("decrease", cartItem);
              }}
            />
            <div id={styles.pWrapperVote}>
              <p>{cartItem?.productQuantity}</p>
            </div>
            {/* <p
              className={styles.increase}
              onClick={(e) => {
                e.stopPropagation();
                console.log("q cartitem", cartItem);
                if (
                  (cartItem.stockQuantity as number) <= cartItem.productQuantity
                ) {
                  // alert("Cannot add more of a product than what is in stock");
                  return;
                }
                cartItem.productQuantity &&
                  updateQuantityStateAndInBackend("increase", cartItem);
              }}
            >
              +
            </p> */}
            <img
              className={styles.vote}
              src={UpvoteIcon}
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                console.log("q cartitem", cartItem);
                if (
                  (cartItem.stockQuantity as number) <= cartItem.productQuantity
                ) {
                  // alert("Cannot add more of a product than what is in stock");
                  return;
                }
                cartItem.productQuantity &&
                  updateQuantityStateAndInBackend("increase", cartItem);
              }}
            />
          </div>
        </div>
      </div>

      {/* <div id={styles.changeQuantity}>
        <p
          className={styles.decrease}
          onClick={(e) => {
            e.stopPropagation();
            cartItem.productQuantity > 1 &&
              updateQuantityStateAndInBackend("decrease", cartItem);
          }}
        >
          -
        </p>
        <p>{cartItem?.productQuantity}</p>
        <p
          className={styles.increase}
          onClick={(e) => {
            e.stopPropagation();
            console.log("q cartitem", cartItem);
            if (
              (cartItem.stockQuantity as number) <= cartItem.productQuantity
            ) {
              // alert("Cannot add more of a product than what is in stock");
              return;
            }
            cartItem.productQuantity &&
              updateQuantityStateAndInBackend("increase", cartItem);
          }}
        >
          +
        </p>
      </div> */}
    </div>
  );
}
