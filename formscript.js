

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const genderInputs = document.getElementsByName('gender');
const dobInput = document.getElementById('dob');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const countryInput = document.getElementById('country');
const skillsInputs = document.querySelectorAll('input[name="skills"]');
const termsInput = document.getElementById('terms');

// Validation functions
function validateName(name) {
  return name.trim() === '' ? 'Name is required' : (name.trim().length < 2 ? 'Name must be at least 2 characters' : '');
}

function validateEmail(email) {
  if(email.trim() === '') return 'Email is required';
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !pattern.test(email.trim()) ? 'Please enter a valid email' : '';
}

function validatePassword(password) {
  return password === '' ? 'Password is required' : (password.length < 6 ? 'Password must be at least 6 characters' : '');
}

function validateConfirmPassword(password, confirm) {
  return confirm === '' ? 'Confirm Password is required' : (password !== confirm ? 'Passwords do not match' : '');
}

function validateGender() {
  return Array.from(genderInputs).some(input => input.checked) ? '' : 'Please select a gender';
}

function validateDOB(dob) {
  return dob === '' ? 'Date of Birth is required' : '';
}

function validatePhone(phone) {
  if(phone === '') return 'Phone number is required';
  return !/^\d{10}$/.test(phone) ? 'Phone must be 10 digits' : '';
}

function validateAddress(address) {
  return address.trim() === '' ? 'Address is required' : '';
}

function validateCountry(country) {
  return country === '' ? 'Please select a country' : '';
}

function validateSkills() {
  return Array.from(skillsInputs).some(input => input.checked) ? '' : 'Select at least one skill';
}

function validateTerms() {
  return termsInput.checked ? '' : 'You must agree to the terms';
}

// Real-time validation
nameInput.addEventListener('input', () => document.getElementById('nameError').textContent = validateName(nameInput.value));
emailInput.addEventListener('input', () => document.getElementById('emailError').textContent = validateEmail(emailInput.value));
passwordInput.addEventListener('input', () => document.getElementById('passwordError').textContent = validatePassword(passwordInput.value));
confirmPasswordInput.addEventListener('input', () => document.getElementById('confirmPasswordError').textContent =
  validateConfirmPassword(passwordInput.value, confirmPasswordInput.value));
genderInputs.forEach(input => input.addEventListener('change', () => document.getElementById('genderError').textContent = validateGender()));
dobInput.addEventListener('input', () => document.getElementById('dobError').textContent = validateDOB(dobInput.value));
phoneInput.addEventListener('input', () => document.getElementById('phoneError').textContent = validatePhone(phoneInput.value));
addressInput.addEventListener('input', () => document.getElementById('addressError').textContent = validateAddress(addressInput.value));
countryInput.addEventListener('change', () => document.getElementById('countryError').textContent = validateCountry(countryInput.value));
skillsInputs.forEach(input => input.addEventListener('change', () => document.getElementById('skillsError').textContent = validateSkills()));
termsInput.addEventListener('change', () => document.getElementById('termsError').textContent = validateTerms());

// Form submission
document.getElementById('regForm').onsubmit = function(event) {
  event.preventDefault(); // Prevent redirect

  // Run all validations
  const errors = {
    name: validateName(nameInput.value),
    email: validateEmail(emailInput.value),
    password: validatePassword(passwordInput.value),
    confirmPassword: validateConfirmPassword(passwordInput.value, confirmPasswordInput.value),
    gender: validateGender(),
    dob: validateDOB(dobInput.value),
    phone: validatePhone(phoneInput.value),
    address: validateAddress(addressInput.value),
    country: validateCountry(countryInput.value),
    skills: validateSkills(),
    terms: validateTerms()
  };

  // Show errors
  for (const key in errors) {
    const span = document.getElementById(`${key}Error`);
    if(span) span.textContent = errors[key];
  }

  // Check if any errors exist
  const hasErrors = Object.values(errors).some(msg => msg !== '');
  const successMsg = document.getElementById('successMessage');
  if(hasErrors){
    successMsg.textContent = '';
    alert('Please fix all errors before submitting');
  } else {
    successMsg.textContent = 'REGISTERED SUCCESSFULLY!';
    // Here you can handle the actual submission with AJAX if needed
  }
};
