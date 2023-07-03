export async function addToShoppingCart(body: any) {
  try {
    const response = await fetch("http://localhost:3003/shoppingcart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      console.log("added to cart", data);
      return data;
    } else {
      throw new Error("Failed to add product to shopping cart");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductFromShoppingCart(body: any) {
  try {
    const response = await fetch("http://localhost:3003/shoppingcart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      return data;
    } else {
      throw new Error("Failed to delete product from shopping cart");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getShoppingCartProducts(uid: string) {
  try {
    console.log("fetch cart products", uid);
    const response = await fetch(
      `http://localhost:3003/shoppingcartproducts/${uid}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(body)
      }
    );

    if (response.ok) {
      const data = await response.json();
      // console.log('DATA: ', data)
      console.log("fetch cart products", data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getShoppingCartProduct(pid: number) {
  try {
    const response = await fetch(
      `http://localhost:3003/shoppingcartproduct/${pid}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(body),
      }
    );
    // console.log('RESPONSE: ', response)
    if (response.ok) {
      const data = await response.json();
      // console.log('DATA: ', data)
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateCartProductQuantityService(body: {
  userId: string;
  productId: number;
  action: string;
}) {
  console.log("update prod quantity service being called");
  try {
    const response = await fetch("http://localhost:3003/shoppingcartproduct", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      return data;
    } else {
      throw new Error("Failed to update product quantity");
    }
  } catch (error) {
    console.error(error);
  }
}
