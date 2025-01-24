// Pre-fill car details from previous page
document.addEventListener('DOMContentLoaded', () => {
    // Example of pre-filled data
    const carModel = 'Car Model B'; // Replace with the actual car model
    const carPrice = 'Rs.25,000/-'; // Replace with the actual car price

    document.getElementById('car_model').textContent = carModel;
    document.getElementById('price').textContent = carPrice;
});

// Handle payment form submission
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Purchase Successful! Thank you for buying with us.');
});
