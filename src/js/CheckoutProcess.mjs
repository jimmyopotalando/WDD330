
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Convert form data into a JSON object
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate 6% tax
    this.tax = this.itemTotal * 0.06;

    // Calculate shipping
    this.shipping = this.list.length > 0
      ? 10 + (this.list.length - 1) * 2
      : 0;

    // Calculate final order total
    this.orderTotal =
      this.itemTotal + this.tax + this.shipping;

    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(
      `${this.outputSelector} #tax`
    );

    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`
    );

    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map((item) => {
      return {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1
      };
    });
  }

  async checkout(form) {
    // Convert form data into an order object
    const order = formDataToJSON(form);

    // Add the remaining order information
    order.orderDate = new Date().toISOString();
    order.items = this.packageItems();
    order.orderTotal = this.orderTotal;
    order.shipping = this.shipping;
    order.tax = this.tax;

    // Send the order to the server
    return await this.externalServices.checkout(order);
  }
}
