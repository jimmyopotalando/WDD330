import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(
      this.productId
    );

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener(
        "click",
        this.addProductToCart.bind(this)
      );
  }

  addProductToCart() {
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector(".product-detail").innerHTML = `
      <img src="${product.Image}" alt="${product.Name}">
      <h3>${product.Brand.Name}</h3>
      <h2>${product.Name}</h2>
      <p>$${product.FinalPrice}</p>
      <p>${product.DescriptionHtmlSimple}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }
}