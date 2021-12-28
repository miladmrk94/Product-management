//-------------*** check empty or no
const getSaveProducts = () => {
  const getProductOnLocal = localStorage.getItem("localProduct");
  try {
    return getProductOnLocal != null ? JSON.parse(getProductOnLocal) : [];
  } catch (error) {
    return [];
  }
  // if (getProductOnLocal != null) {
  //   return JSON.parse(getProductOnLocal);
  // } else {
  //   return [];
  // }
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

//-------------*** sort
const sortProduct = (product, sortBy) => {
  if (sortBy === "byEdited") {
    return product.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      } else if (a.updated < b.updated) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return product.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else if (a.created < b.created) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return product;
  }
};

//-------------*** searching
const searching = (product, productName) => {
  product = sortProduct(product, productName.sortBy);
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
