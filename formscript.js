
  function validateName(name) {
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  }

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.trim())) {
      return 'Please enter a valid email';
    }
    return '';
  }

  function validatePassword(password) {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  }

  function validateGender() {
    const genders = document.querySelectorAll('input[name="gender"]:checked');
    if (genders.length === 0) {
      return 'Please select a gender';
    }
    return '';
  }

  function validateDob(dob) {
    if (!dob) {
      return 'Please select your date of birth';
    }
    return '';
  }

  function validatePhone(phone) {
    const pattern = /^[0-9]{10}$/;
    if (!pattern.test(phone.trim())) {
      return 'Enter a valid 10-digit phone number';
    }
    return '';
  }

  function validateAddress(address) {
    if (address.trim().length < 5) {
      return 'Address must be at least 5 characters';
    }
    return '';
  }

  function validateCountry(country) {
    if (!country) {
      return 'Please select a country';
    }
    return '';
  }

  function validateSkills() {
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if (skills.length === 0) {
      return 'Please select at least one skill';
    }
    return '';
  }

  function validateProfilePic(file) {
    if (!file) {
      return 'Please upload a profile picture';
    }
    return '';
  }

  // Inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const dobInput = document.getElementById('dob');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const countryInput = document.getElementById('country');
  const profilePicInput = document.getElementById('profilePic');

  // Live validation
  profilePicInput.addEventListener('input', () => {
    document.getElementById('profilePicError').textContent =
      validateProfilePic(profilePicInput.value);
  });

  phoneInput.addEventListener('input', () => {
    document.getElementById('phoneError').textContent =
      validatePhone(phoneInput.value);
  });

  addressInput.addEventListener('input', () => {
    document.getElementById('addressError').textContent =
      validateAddress(addressInput.value);
  });

  countryInput.addEventListener('input', () => {
    document.getElementById('countryError').textContent =
      validateCountry(countryInput.value);
  });

  nameInput.addEventListener('input', () => {
    document.getElementById('nameError').textContent =
      validateName(nameInput.value);
  });

  emailInput.addEventListener('input', () => {
    document.getElementById('emailError').textContent =
      validateEmail(emailInput.value);
  });

  passwordInput.addEventListener('input', () => {
    document.getElementById('passwordError').textContent =
      validatePassword(passwordInput.value);
  });

  confirmPasswordInput.addEventListener('input', () => {
    document.getElementById('confirmPasswordError').textContent =
      validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
  });

  dobInput.addEventListener('input', () => {
    document.getElementById('dobError').textContent =
      validateDob(dobInput.value);
  });

  // On form submit
  document.getElementById('regForm').onsubmit = function (event) {
    event.preventDefault();

    let hasError = false;

    // Run all validations
    document.getElementById('nameError').textContent = validateName(nameInput.value);
    document.getElementById('emailError').textContent = validateEmail(emailInput.value);
    document.getElementById('passwordError').textContent = validatePassword(passwordInput.value);
    document.getElementById('confirmPasswordError').textContent = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    document.getElementById('genderError').textContent = validateGender();
    document.getElementById('dobError').textContent = validateDob(dobInput.value);
    document.getElementById('phoneError').textContent = validatePhone(phoneInput.value);
    document.getElementById('addressError').textContent = validateAddress(addressInput.value);
    document.getElementById('countryError').textContent = validateCountry(countryInput.value);
    document.getElementById('skillsError').textContent = validateSkills();
    document.getElementById('profilePicError').textContent = validateProfilePic(profilePicInput.value);

    // Check if any error exists
    const errors = document.querySelectorAll('.error');
    errors.forEach(err => {
      if (err.textContent !== '') {
        hasError = true;
      }
    });

    if (hasError) {
      alert('Please fill all fields correctly before submitting');
      return; // stop submission
    }

    alert("REGISTERED SUCCESSFULLY");
    this.submit();
  };

