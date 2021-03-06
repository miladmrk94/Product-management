let product = getSaveProducts();

//localStorage.clear();

const handelProduct = {
  key: "",
  handelExist: false,
  sortBy: "byEdited",
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

    const timestamp = moment().valueOf();
    product.push({
      id: id,
      title: e.target.elements.textInput.value,
      price: e.target.elements.textInputPrice.value,
      exist: true,
      created: timestamp,
      updated: timestamp,
    });
  } else {
    alert("لطفا عنوان محصول را وارد کنید");
  }
  saveProductInLocal(product);
  e.target.elements.textInput.value = "";
  e.target.elements.textInputPrice.value = "";
  searching(product, handelProduct);
});

document.querySelector("#check-box").addEventListener("change", (e) => {
  console.log();
  handelProduct.handelExist = e.target.checked;
  searching(product, handelProduct);
});

//-------------*** live change
window.addEventListener("storage", (e) => {
  if (e.key === "localProduct") {
    product = JSON.parse(e.newValue);
    searching(product, handelProduct);
  }
});

document.querySelector("#sort").addEventListener("change", (e) => {
  handelProduct.sortBy = e.target.value;
  searching(product, handelProduct);
});

const pro = [
  {
    title: "book1",
    price: 200,
  },
  {
    title: "book2",
    price: 300,
  },
  {
    title: "book3",
    price: 500,
  },
];

getPro = () => {
  setTimeout(() => {
    const fetch = pro.map((item) => {
      return `product:${item.title} price:${item.price}`;
    });
    console.log(fetch);
  }, 2000);
};

getPro();
