// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Example: Validate user credentials (you can replace this with real authentication logic)
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mock validation (Replace with server-side validation for production)
    if (email === 'test@example.com' && password === 'password123') {
        alert('Login successful!');
        window.location.href = 'booking.html'; // Redirect to cab booking page
    } else {
        alert('Invalid email or password. Please try again.');
    }
});


// Handle signup form submission
document.getElementById('signup-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Signup successful! Please login.');
    window.location.href = 'login.html';
});
// Handle booking form submission
document.getElementById('booking-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Display confirmation message
    alert(`Cab booked successfully!\n\nDetails:\nPickup: ${pickup}\nDrop-off: ${dropoff}\nDate: ${date}\nTime: ${time}`);

    // Optionally, redirect to another page or reset the form
    window.location.href = 'index.html';
});
