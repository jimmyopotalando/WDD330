import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const title = document.querySelector(".title");

if (title) {
  title.textContent =
    `Top Products: ${category}`;
}

// Create data source
const dataSource = new ProductData();

// Get element to render products into
const element = document.querySelector(".product-list");

// Create product list instance
const listing = new ProductList(
  category,
  dataSource,
  element
);

// Display products
listing.init();