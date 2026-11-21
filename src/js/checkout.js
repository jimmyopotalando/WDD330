
import CheckoutProcess from './CheckoutProcess.mjs';

// Create the checkout process
const checkout = new CheckoutProcess('so-cart', '.checkout');

// Load the cart and display the subtotal
checkout.init();

// Get the ZIP code input field
const zipInput = document.querySelector(
  '#checkout-form [name=\'zip\']'
);

// Calculate totals when the ZIP code is entered
zipInput.addEventListener('change', () => {
  if (zipInput.value.trim() !== '') {
    checkout.calculateOrderTotal();
  }
});

// Handle checkout form submission
const form = document.querySelector('#checkout-form');
const checkoutButton = form.querySelector('button[type=\'submit\']');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  checkoutButton.disabled = true;

  try {
    checkout.calculateOrderTotal();

    await checkout.checkout(form);

    // Checkout response received successfully.
  } catch (error) {
    // Handle checkout errors without exposing details to the user.
  } finally {
    checkoutButton.disabled = false;
  }
});

