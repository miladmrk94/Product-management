const titleElement = document.querySelector("#productTitle");
const priceElement = document.querySelector("#productPrice");
const removeElement = document.querySelector("#buttonRemove");

const productId = location.hash.substring(1);

let product = getSaveProducts();

let productW = product.find((item) => {
  return item.id === productId;
});

if (productW === undefined) {
  location.assign("/index.html");
}

titleElement.value = productW.title;
// titleElement.value = productW.price;

//-------------*** input changeName product & price
titleElement.addEventListener("input", (e) => {
  productW.title = e.target.value;
  saveProductInLocal(product);
});

priceElement.addEventListener("input", (e) => {
  productW.price = e.target.value;
  saveProductInLocal(product);
});

//-------------*** remove button
removeElement.addEventListener("click", () => {
  removeProduct(productW.id);
  saveProductInLocal(product);
  location.assign("./index.html");
});

//-------------*** live change
window.addEventListener("storage", (e) => {
  if (e.key === "localProduct") {
    product = JSON.parse(e.newValue);
    productW = product.find((item) => {
      return item.id === productId;
    });
    if (productW === undefined) {
      location.assign("/index.html");
    }
    titleElement.value = productW.title;
    // titleElement.value = productW.price;
  }
});
