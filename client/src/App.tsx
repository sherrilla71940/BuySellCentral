import "./App.css";
// import UploadWidget from "./components/product-form/upload-widget";

//// METHODS:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//// COMPONENTS:
import Navbar from "./components/navbar/Navbar";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Login from "./components/login/login";
import StoreItems from "./components/store-items/StoreItems";
import ItemDetails from "./components/item-details/ItemDetails";
import Menu from "./components/menu/menu";
import ProductForm from "./components/product-form/product-form";
//// State management:
import { userStore, UserState } from "./zustand/UserStore";
import SellerStore from "./components/seller-store/SellerStore";
// import { useStore } from 'zustand';
import { useEffect } from "react";
import { useCartSlice } from "./zustand/ShoppingCartSlice";
import { menuStore } from "./zustand/menuStore";

function App() {
  const { visible, setVisibility } = menuStore();
  const closeCart = useCartSlice((state) => state.closeCart);
  // const store = userStore();
  const { id, setID } = userStore();

  // // const { loggedIn } = userStore();
  // const { setLoggedIn, setID } = userStore();
  // // console.log(loggedIn)

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     setLoggedIn(true);
  //     console.log(localStorage.getItem("user"));
  //   }
  // }, []);

  useEffect(() => {
    console.log("getting id", localStorage.getItem("id"));
    const id = localStorage.getItem("id");
    console.log("id", id);
    if (id) {
      setID(id);
    }
  }, []);

  return (
    <>
      {/* <UploadWidget /> */}
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          <Route
            path={"/"}
            element={
              <div
                onClick={() => {
                  console.log("outer div clicked");
                  closeCart();
                  setVisibility(false);
                }}
              >
                <Navbar />
                <ShoppingCart />
                <Menu />
                <StoreItems />
                <div id="detail">{/* <Outlet /> */}</div>
              </div>
            }
          />

          <Route
            path={"/:id"}
            element={
              <>
                <Navbar />
                <ShoppingCart />
                <Menu />
                <ItemDetails />
                <div id="detail">{/* <Outlet /> */}</div>
              </>
            }
          />

          <Route
            path={"/sell"}
            element={
              <>
                <Navbar />
                <ShoppingCart />
                <Menu />
                <ProductForm />
              </>
            }
          />

          <Route
            path={`/sellers/${id}`}
            element={
              <>
                <Navbar />
                <ShoppingCart />
                <Menu />
                <SellerStore />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
