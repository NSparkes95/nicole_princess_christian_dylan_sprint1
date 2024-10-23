// Function to validate form fields
function validateForm(quantity, email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (quantity <= 0) {
        alert('Please enter a valid quantity (greater than zero).');
        return false;
    }
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true; // Validation passed
}

// Function to create an order object and store it in localStorage
function createOrder(selectedItem, quantity, customerName, customerEmail) {
    const order = {
        item: selectedItem,
        quantity: quantity,
        customer: {
            name: customerName,
            email: customerEmail,
        }
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    try {
        localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
        console.error('Error saving orders to localStorage', error);
        alert('There was an error saving your order. Please try again later.');
    }
}

// Function to calculate total bill (this is an example)
function calculateBill(quantity) {
    const pricePerItem = 10; // Example price
    return quantity * pricePerItem;
}

// Event listener for form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const itemSelect = document.getElementById('item-select');
    const quantityInput = document.getElementById('quantity');
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;

    const selectedItem = itemSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    // Validate form inputs
    if (!validateForm(quantity, customerEmail)) {
        return; // Exit if validation fails
    }

    // Create order and store in localStorage
    createOrder(selectedItem, quantity, customerName, customerEmail);

    // Calculate and display the bill
    const totalBill = calculateBill(quantity);
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.textContent = `Thank you, ${customerName}! Your order for ${quantity} x ${selectedItem} has been placed. Total Bill: $${totalBill}.`;
    confirmationMessage.classList.remove('hidden');

    // Clear form fields
    itemSelect.selectedIndex = 0;
    quantityInput.value = '';
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-email').value = '';

    // Disable submit button to prevent multiple submissions
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Re-enable submit button after a delay
    setTimeout(() => {
        submitButton.disabled = false;
        confirmationMessage.classList.add('hidden'); // Hide message after a few seconds
    }, 5000);
});