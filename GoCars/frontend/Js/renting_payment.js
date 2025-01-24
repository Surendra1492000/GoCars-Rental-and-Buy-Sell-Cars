// Pre-fill car details from previous page (this would typically come from a backend or URL parameters)
document.addEventListener('DOMContentLoaded', () => {
    // Example of pre-filled data
    const carModel = 'Car Model A'; // Replace with the actual car model
    const carPrice = 'Rs.2950/-'; // Replace with the actual car price

    document.getElementById('car-model').textContent = carModel;
    document.getElementById('car-price').textContent = carPrice;
});

// Handle payment form submission
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment Successful! Thank you for renting with us.');
});
