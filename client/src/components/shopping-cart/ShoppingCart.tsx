import styles from "./ShoppingCart.module.css";
// import { checkout } from "./checkoutFunction";
import { useCartSlice } from "../../zustand/ShoppingCartSlice";
import CartItem from "../cart-item/CartItem";
import { getShoppingCartProducts } from "../../services/shopping-cart-service";
import { useEffect } from "react";
import { ShoppingCartProductType } from "../../../../global-types/shopping-cart-product";
import { userStore } from "../../zustand/UserStore";

import { renderProductsStore } from "../../zustand/should-refetch-slice";
import { useNavigate } from "react-router-dom";
import { empty } from "uuidv4";
import StoreItems from "../store-items/StoreItems";
import { useProductsSlice } from "../../zustand/ProductSlice";

import { useRef } from "react";

// function scrollToBottom(elementClassName: string) {
//   const divElement = document.querySelector(`.${elementClassName}`);
//   if (divElement) {
//     divElement.scrollTop = divElement.scrollHeight;
//   }
// }

export default function ShoppingCart() {
  const { shouldReRender, setRerender } = renderProductsStore();
  // const removeProduct = useProductsSlice((state) => state.removeProduct);
  // const { shouldReRender, setRerender } = renderCartStore();
  const id = userStore((state) => state.id);
  // let id;
  const counter = useRef(0);

  // (async () => {
  //   id = userStore((state) => state.id
  // })()s
  const navigate = useNavigate();

  const cartItems = useCartSlice((state) => state.cartItems);
  const isOpen = useCartSlice((state) => state.isOpen);
  const addItem = useCartSlice((state) => state.addItem);
  const closeCart = useCartSlice((state) => state.closeCart);
  const emptyCart = useCartSlice((state) => state.emptyCart);

  // console.log("outside of effect and if", shouldReRender);

  useEffect(() => {
    emptyCart();
  }, []);

  useEffect(() => {
    if (id) {
      // console.log("in use effect ", shouldReRender);
      console.log(id);
      const fetchAllShoppingCartProducts = async () => {
        try {
          // id = userStore((state) => state.id);
          // console.log(id);
          console.log("id change!!");
          const shoppingCartProducts = await getShoppingCartProducts(id);
          // console.log('shoppingCartProducts: ', shoppingCartProducts)
          if (Array.isArray(shoppingCartProducts)) {
            shoppingCartProducts.forEach((product: ShoppingCartProductType) => {
              addItem(product);
              // scrollToBottom("_container_sbzq6_1");
              setRerender(!shouldReRender);
            });
            console.log(cartItems);
            console.log(shoppingCartProducts);
            // set false might trigger useeffect again
          }
        } catch (error) {
          console.log(error);
        }
      };
      console.log("fetching");
      fetchAllShoppingCartProducts();
      console.log(cartItems);
      console.log(id);
    }
  }, [id]);
  // useEffect(() => {
  //   const fetchAllShoppingCartProducts = async () => {
  //     try {
  //       // id = userStore((state) => state.id);
  //       console.log(id);
  //         const shoppingCartProducts = await getShoppingCartProducts(id);
  //         // console.log('shoppingCartProducts: ', shoppingCartProducts)
  //         if (Array.isArray(shoppingCartProducts)) {
  //           shoppingCartProducts.forEach((product: ShoppingCartProductType) => {
  //             addItem(product);
  //           });
  //         }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchAllShoppingCartProducts();
  // }, []);

  async function getShoppingCartId() {
    const response = await fetch(
      `http://localhost:3003/getoneshoppingcart/${id}`
    );
    const data = await response.json();
    const cartId = data.id;
    return Number(cartId);
  }

  // async function postShoppingCart(userId: string, cartId: string) {
  //   const response =
  // }

  async function checkout() {
    const cartId = await getShoppingCartId();
    // console.log(cartId);
    // console.log(id);
    if (typeof cartId === "number") {
      let payload = {
        cartId: cartId,
        buyerId: id,
      };
      console.log(payload);
      // console.log(payload);
      const response = await fetch("http://localhost:3003/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // console.log(response);
      const data = await response.json();
      console.log("data", data);
      // console.log(payload);
      if (data === "ran into error in checkout") {
        alert("can't checkout more than what's in stock");
        emptyCart();
        closeCart();
      }

      // set state to rerender
      console.log("current", counter);
      counter.current++;
      console.log("current", counter.current);
      console.log("useEffect called");
      console.log("before changing render value", shouldReRender);
      setRerender(!shouldReRender);
      // setRerender((prevShouldReRender: boolean) => {
      //   return !prevShouldReRender;
      // });
      console.log("after changing render value", shouldReRender);
      // setRerender();
      // setTimeout(() => {
      emptyCart();
      closeCart();
      navigate("/");
      // location.reload();
      // });
    }
  }

  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.cartHeader}>
            <h1>Cart</h1>
            <h1
              className={styles.closeCart}
              onClick={(e) => {
                e.stopPropagation();
                closeCart();
              }}
            >
              +
            </h1>
          </div>

          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                {cartItem.productQuantity > 0 && (
                  <CartItem cartItem={cartItem} />
                )}
              </li>
            ))}
          </ul>

          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <h3>Total</h3>
              {/* <h3
                className={styles.totalValue}
              >
                {cartItems.reduce((total, cartItem) => {
                  console.log(cartItem)
                  return total + (cartItem.price * cartItem.quantity)
                }, 0)}
              </h3> */}
            </div>

            <button
              className={styles.checkout}
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked checkout");
                // const cartId = getShoppingCartId();
                if (!cartItems.length) {
                  alert("Cannot checkout empty cart");
                  return;
                }
                checkout();
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
