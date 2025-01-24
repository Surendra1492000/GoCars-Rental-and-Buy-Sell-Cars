// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
// const btnPopup = document.querySelector('.btnLogin-popup');
// const iconClose = document.querySelector('.icon-close');

// registerLink.addEventListener('click', ()=> {
//     wrapper.classList.add('active');
//     wrapper.classList.remove('active-popup');
// });

// loginLink.addEventListener('click', ()=> {
//     wrapper.classList.remove('active');
//     wrapper.classList.remove('active-popup');
// });

// btnPopup.addEventListener('click', ()=> {
//     wrapper.classList.add('active-popup');
// });

// iconClose.addEventListener('click', ()=> {
//     wrapper.classList.remove('active-popup');
// });


const wrapper = document.querySelector('.wrapper');
const loginForm = document.querySelector('.form-box.login');
const registerForm = document.querySelector('.form-box.register');
// const userbtn = document.querySelector('.user-id-btn');
const iconClose = document.querySelector('.icon-close');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const forgotPasswordLink = document.querySelector('.remember-forgot a');
const backToLoginLink = document.querySelector('.back-to-login');
const userIdBtn = document.querySelector('.user-id-btn');
const userDropdown = document.querySelector('.user-dropdown');

// const userIdBtn = document.querySelector('.user-id-btn');
const userIdText = document.querySelector('.user-id');
let isLoggedIn = false;

// Handle User ID Button Click
userIdBtn.addEventListener('click', () => {
    if (!isLoggedIn) {
        // If the user is not logged in, open the login form
        wrapper.classList.add('active-popup');
    } else {
        // If the user is logged in, toggle the dropdown (optional)
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    }
});

// Simulate Login Process (e.g., after form submission)
function loginUser(username) {
    isLoggedIn = true; // Update login state
    userIdText.textContent = username; // Update the User ID display
    wrapper.classList.remove('active-popup'); // Close the login form
}

// Example: Mock login form submission
document.querySelector('.form-box.login form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission
    const username = "User123"; // Replace with real username after validation
    loginUser(username); // Simulate login
});

// Toggle the dropdown when the user ID button is clicked
userIdBtn.addEventListener('click', () => {
    userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!userIdBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = 'none';
    }
});

// // Show the popup with login form
// userbtn.addEventListener('click', () => {
//     wrapper.classList.add('active-popup');
//     loginForm.classList.add('active');
//     registerForm.classList.remove('active');
// });

// Close the popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
});

// Switch to registration form
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

// Switch to login form
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Show the forgot password form
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    wrapper.classList.add('active-forgot'); // Show forgot-password form
    wrapper.classList.remove('active'); // Hide login/register forms
});

// Go back to the login form
backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    wrapper.classList.remove('active-forgot'); // Hide forgot-password form
    loginForm.classList.add('active'); // Show login form
});