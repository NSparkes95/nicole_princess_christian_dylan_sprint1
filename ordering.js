// Function to validate form fields
function validateForm(quantity, email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (quantity <= 0) {
        console.log('Invalid quantity:', quantity);
        alert('Please enter a valid quantity (greater than zero).');
        return false;
    }
    if (!emailPattern.test(email)) {
        console.log('Invalid email:', email);
        alert('Please enter a valid email address.');
        return false;
    }
    console.log('Validation passed:', { quantity, email });
    return true; // Validation passed
}

// Function to create an order object and store it in localStorage
function createOrder(selectedItem, sides, dessert, quantity, customerName, customerEmail) {
    const order = {
        item: selectedItem,
        sides: sides,
        dessert: dessert,
        quantity: quantity,
        customer: {
            name: customerName,
            email: customerEmail,
        }
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    console.log('Order created:', order);
    try {
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('Orders saved to localStorage:', orders);
    } catch (error) {
        console.error('Error saving orders to localStorage', error);
        alert('There was an error saving your order. Please try again later.');
    }
}

// Function to calculate total bill based on selected item prices
function calculateBill(quantity, selectedItem, sides, dessert) {
    const prices = {
        "Big Gary Southern Chicken": 9.99,
        "Veggie Delight Burger": 8.99,
        "Canadian Double Stack": 6.99,
        "Signature Combo": 12.99,
        "Power House HotDogs": 10.99,
        "Retro Salad": 5.99,
        "Fries": 0,
        "Sweet Potato Fries": 1,
        "Grilled Chicken": 3,
        "Poutines": 0,
        "Onion Rings": 0,
        "Salads": 1,
        "Chocolate Glazed Donut": 3,
        "Butter Croissant": 2,
        "Ice-Cream Fudge Cake": 2.50,
        "Cinnamon Buns": 1.50,
    };

    const itemPrice = prices[selectedItem] || 0;
    const sidesPrice = prices[sides] || 0;
    const dessertPrice = prices[dessert] || 0;

    return ((itemPrice + sidesPrice + dessertPrice) * quantity).toFixed(2); // Return total bill rounded to 2 decimal places
}

// Event listener for form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const mainSelect = document.getElementById('main-select');
    const sidesSelect = document.getElementById('sides-select');
    const dessertSelect = document.getElementById('dessert-select');
    const quantityInput = document.getElementById('quantity');
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;

    const selectedItem = mainSelect.value;
    const sides = sidesSelect.value;
    const dessert = dessertSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    console.log('Form submitted:', { selectedItem, sides, dessert, quantity, customerName, customerEmail });

    // Validate form inputs
    if (!validateForm(quantity, customerEmail)) {
        return; // Exit if validation fails
    }

    // Create order and store in localStorage
    createOrder(selectedItem, sides, dessert, quantity, customerName, customerEmail);

    // Calculate and display the bill
    const totalBill = calculateBill(quantity, selectedItem, sides, dessert);
    console.log('Total bill calculated:', totalBill);
    
    const confirmationMessage = document.getElementById('confirmation-message');
    
    // Set the message text
    confirmationMessage.textContent = `Thank you, ${customerName}! Your order for ${quantity} x ${selectedItem} with ${sides} and ${dessert} has been placed. Total Bill: $${totalBill}.`;
    
    // Show the confirmation message
    confirmationMessage.classList.remove('hidden');
    confirmationMessage.classList.add('visible');

    // Log confirmation message display
    console.log('Confirmation message displayed:', confirmationMessage.textContent);

    // Clear form fields
    mainSelect.selectedIndex = 0;
    sidesSelect.selectedIndex = 0;
    dessertSelect.selectedIndex = 0;
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
        confirmationMessage.classList.remove('visible'); // Remove visible class
    }, 5000);
});
