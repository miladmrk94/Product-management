let product = getSaveProducts();

//localStorage.clear();

const handelProduct = {
  key: "",
  handelExist: false,
};

searching(product, handelProduct);

document.querySelector("#search-input").addEventListener("input", (e) => {
  handelProduct.key = e.target.value;
  searching(product, handelProduct);
});

document.querySelector("#form-tag").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.elements.textInput.value) {
    const id = uuidv4();
    product.push({
      id: id,
      title: e.target.elements.textInput.value,
      price: "",
      exist: true,
    });
  } else {
    alert("لطفا عنوان محصول را وارد کنید");
  }
  saveProductInLocal(product);
  e.target.elements.textInput.value = "";
  searching(product, handelProduct);
});

document.querySelector("#check-box").addEventListener("change", (e) => {
  console.log();
  handelProduct.handelExist = e.target.checked;
  searching(product, handelProduct);
});

document.querySelector("#select-tag").addEventListener("change", (e) => {
  console.log(e.target.value);
});

//-------------*** live change
window.addEventListener("storage", (e) => {
  if (e.key === "localProduct") {
    product = JSON.parse(e.newValue);
    searching(product, handelProduct);
  }
});