export async function getStoreProducts() {
  try {
    const response = await fetch("http://localhost:3003/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // console.log('RESPONSE: ', response)
    if (response.ok) {
      const data = await response.json();
      // console.log('DATA: ', data)
      console.log("sellersData", data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSpecificProduct(pid: string) {
  try {
    const response = await fetch(`http://localhost:3003/products/${pid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // console.log('RESPONSE: ', response)
    if (response.ok) {
      const product = await response.json();
      // console.log('DATA: ', data)
      console.log("getting product is", product);
      return product;
    }
  } catch (error) {
    console.error(error);
  }
}
