//-------------*** check empty or no
const getSaveProducts = () => {
  const getProductOnLocal = localStorage.getItem("localProduct");
  if (getProductOnLocal != null) {
    return JSON.parse(getProductOnLocal);
  } else {
    return [];
  }
};

//--------------*** save product in localStorage
const saveProductInLocal = (product) => {
  localStorage.setItem("localProduct", JSON.stringify(product));
};

//--------------*** remove product in localStorage
const removeProduct = (id) => {
  const index = product.findIndex((item) => {
    return item.id === id;
  });
  if (index > -1) {
    product.splice(index, 1);
  }
};

const toggleProduct = (id) => {
  const value = product.find((item) => {
    return item.id === id;
  });
  if (value !== undefined) {
    value.exist = !value.exist;
  }
};

//-------------*** searching
const searching = (product, productName) => {
  let value = product.filter((item) => {
    return item.title.toLowerCase().includes(productName.key.toLowerCase());
  });

  value = value.filter((item) => {
    if (handelProduct.handelExist) {
      return item.exist;
    } else {
      return true;
    }
  });
  console.log(value);
  document.querySelector("#show-tag").innerHTML = "";
  value.forEach((item) => {
    //use fun Creat product for build now tag
    document.querySelector("#show-tag").appendChild(CreatProductDOM(item));
  });
};

//--------------*** creat Product
const CreatProductDOM = (productX) => {
  const divProduct = document.createElement("div");
  const checkBoxProduct = document.createElement("input");
  const spanProductName = document.createElement("a");
  const butRemoveProduct = document.createElement("button");

  checkBoxProduct.setAttribute("type", "checkbox");
  divProduct.appendChild(checkBoxProduct);
  checkBoxProduct.checked = !productX.exist;
  divProduct.appendChild(checkBoxProduct);
  checkBoxProduct.addEventListener("click", () => {
    toggleProduct(productX.id);
    saveProductInLocal(product);
    searching(product, handelProduct);
  });

  spanProductName.textContent = productX.title;
  spanProductName.setAttribute("href", `./edit-product.html#${productX.id}`);
  divProduct.appendChild(spanProductName);

  butRemoveProduct.textContent = "حذف";
  divProduct.appendChild(butRemoveProduct);

  butRemoveProduct.addEventListener("click", () => {
    removeProduct(productX.id);
    saveProductInLocal(product);
    searching(product, handelProduct);
  });

  return divProduct;
};
