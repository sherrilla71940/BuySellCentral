import styles from "./Navbar.module.css";
import BagIcon from "../../assets/bag-icon.svg";
import { useNavigate } from "react-router-dom";
import { useCartSlice } from "./../../zustand/ShoppingCartSlice";
import { userStore } from "./../../zustand/UserStore";
import { menuStore } from "../../zustand/menuStore";
import firebase from "firebase/compat/app";
// import logo from './../../assets/logo.png'
import { useEffect, useState } from "react";
import { getSpecificUser } from "../../services/store-products-service";
// import { useCartSlice } from './../../zustand/ShoppingCartSlice';
import { renderProductsStore } from "../../zustand/should-refetch-slice";

export default function Navbar() {
  const navigate = useNavigate();

  const openCart = useCartSlice((state) => state.openCart);
  const closeCart = useCartSlice((state) => state.closeCart);
  const cartItems = useCartSlice((state) => state.cartItems);

  const { loggedIn, username, email, setUsername } = userStore();
  const { shouldReRender, setRerender } = renderProductsStore();
  const { visible, setVisibility } = menuStore();

  const [loggedInUser, setLoggedInUser] = useState("");

  // useEffect(() => {
  //   localStorage.getItem("");
  //   console.log("username", username);
  // });

  function redirect() {
    navigate("/login");
  }

  function clickAvatar() {
    closeCart();
    setVisibility(true);
  }

  function switchBar() {
    console.log("should switch");
    openCart();
    setVisibility(false);
  }

  // const { loggedIn } = userStore();
  const { setLoggedIn, setID } = userStore();
  // console.log(loggedIn)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
      console.log(localStorage.getItem("user"));
    }

    console.log("username is", username);
    async function fetchUserName() {
      console.log("inside async");
      await getSpecificUser(localStorage.getItem("id") as string, setUsername);
      console.log("inside use effect");
    }
    fetchUserName();
  }, []);

  return (
    <nav className={styles.navbarContainerSticky}>
      <div className={styles.navbarContainerBlock}>
        {/* <img className={styles.img} alt='store_logo' src={logo} /> */}
        <h1 className={styles.navbarLeft} onClick={() => navigate("/")}>
          BuySellCentral
        </h1>

        <input className={styles.navbarCenter} />

        <div className={styles.navbarRight}>
          {!loggedIn ? null : (
            <>
              <div className={styles.cartItems} onClick={switchBar}>
                {cartItems.reduce((total: any, cartItem: any) => {
                  return total + cartItem.productQuantity;
                }, 0)}
              </div>

              <img
                src={BagIcon}
                className={styles.cartItemsIcon}
                alt="logo"
                onClick={switchBar}
              />
            </>
          )}
          {loggedIn ? (
            <div>
              <img
                src="https://source.boringavatars.com/"
                className={styles.userThumbnail}
                alt="user pic"
                onClick={clickAvatar}
              />
              {/* <span>{localStorage.getItem("email")}</span> */}
              <span>username is {username}</span>
            </div>
          ) : (
            <button className={styles.button} onClick={redirect}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
