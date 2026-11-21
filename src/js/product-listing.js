import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam } from './utils.mjs';

const category = getParam('category');
const title = document.querySelector('.title');

if (title) {
  const formattedCategory = category
  .split('-')
  .map(
    word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
  )
  .join(' ');

title.textContent =
  `Top Products: ${formattedCategory}`;
}

// Create data source
const dataSource = new ExternalServices(category);

// Get element to render products into
const element = document.querySelector('.product-list');

// Create product list instance
const listing = new ProductList(
  category,
  dataSource,
  element
);

// Display products
listing.init();