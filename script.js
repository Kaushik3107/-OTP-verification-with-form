const registrationStep1 = document.querySelector(".registration-step1"),
    registrationStep2 = document.querySelector(".registration-step2"),
    email = document.getElementById("email"),
    verifyEmail = document.getElementById("verifyEmail"),
    sendOtpButton = document.getElementById("sendOtpButton"),
    verifyOtpButton = document.getElementById("verifyOtpButton"),
    submitButton = document.getElementById("submitButton"),
    inputs = document.querySelectorAll(".otp-group input");

let OTP = "";

// Function to generate OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

window.addEventListener("load", () => {
    emailjs.init("t2tRv0IPhsUFoY8IV");
    registrationStep1.style.display = "block";
    registrationStep2.style.display = "none";
    submitButton.classList.add("disable");
    verifyOtpButton.classList.add("disable");
});

// Validation functions
const validateFullName = (name) => /^[a-zA-Z\s]{6,}$/.test(name);
const validateMobileNumber = (number) => /^[789]\d{9}$/.test(number);
const validateUsername = (username) => /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{10,}$/.test(username);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(password);

// Real-time validation for Full Name
document.getElementById("fullName").addEventListener("input", (e) => {
    const fullName = e.target.value.trim();
    const fullNameError = document.getElementById("fullNameError");

    if (fullName === "" || !validateFullName(fullName)) {
        fullNameError.textContent = "Full Name should contain only letters and spaces with a minimum of 6 characters.";
    } else {
        fullNameError.textContent = "";
    }
});

// Real-time validation for Mobile Number
document.getElementById("mobileNumber").addEventListener("input", (e) => {
    const mobileNumber = e.target.value.trim();
    const mobileNumberError = document.getElementById("mobileNumberError");

    if (mobileNumber === "" || !validateMobileNumber(mobileNumber)) {
        mobileNumberError.textContent = "Mobile Number should be a 10-digit number starting with 7, 8, or 9.";
    } else {
        mobileNumberError.textContent = "";
    }
});

// Real-time validation for Username
document.getElementById("username").addEventListener("input", (e) => {
    const username = e.target.value.trim();
    const usernameError = document.getElementById("usernameError");

    if (username === "" || !validateUsername(username)) {
        usernameError.textContent = "Username should be at least 10 characters long and can include letters, numbers, and optional symbols.";
    } else {
        usernameError.textContent = "";
    }
});

// Real-time validation for Email
document.getElementById("email").addEventListener("input", (e) => {
    const emailValue = e.target.value.trim();
    const emailError = document.getElementById("emailError");

    if (emailValue === "" || !validateEmail(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
    } else {
        emailError.textContent = "";
    }
});

// Real-time validation for Password (optional, based on your form structure)
document.getElementById("password").addEventListener("input", (e) => {
    const password = e.target.value.trim();
    const passwordError = document.getElementById("passwordError");

    if (password === "" || !validatePassword(password)) {
        passwordError.textContent = "Password should be at least 10 characters long, including letters, capital letters, numbers, and symbols.";
    } else {
        passwordError.textContent = "";
    }
});

sendOtpButton.addEventListener("click", () => {
    const fullName = document.getElementById("fullName").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const username = document.getElementById("username").value.trim();
    const emailValue = email.value.trim();

    // Check all fields before sending OTP
    if (!validateFullName(fullName)) {
        document.getElementById("fullNameError").textContent = "Full Name should contain only letters and spaces with a minimum of 6 characters.";
        return;
    }

    if (!validateMobileNumber(mobileNumber)) {
        document.getElementById("mobileNumberError").textContent = "Mobile Number should be a 10-digit number starting with 7, 8, or 9.";
        return;
    }

    if (!validateUsername(username)) {
        document.getElementById("usernameError").textContent = "Username should be at least 10 characters long and can include letters, numbers, and optional symbols.";
        return;
    }

    if (!validateEmail(emailValue)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        return;
    }

    OTP = generateOTP();
    let templateParameter = {
        from_name: "Kaushik Team",
        OTP: OTP,
        message: "Please use this otp",
        reply_to: emailValue,
    };

    emailjs.send("service_hx14ejl", "template_mkptwcf", templateParameter).then((res) => {
        console.log("OTP sent successfully", res);
        registrationStep1.style.display = "none";
        registrationStep2.style.display = "block";
        verifyEmail.textContent = emailValue; // Display the email address in step 2
    }, (err) => {
        console.error("Error sending OTP", err);
    });
});

inputs.forEach((input, index) => {
    input.addEventListener("keyup", function (e) {
        if (this.value.length >= 1) {
            e.target.value = e.target.value.substr(0, 1);
        }

        const nextInput = inputs[index + 1];
        if (nextInput) {
            nextInput.focus();
        }

        if (Array.from(inputs).every(input => input.value !== "")) {
            verifyOtpButton.classList.remove("disable");
        } else {
            verifyOtpButton.classList.add("disable");
        }
    });
});

verifyOtpButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        values += input.value;
    });

    if (OTP == values) {
        registrationStep1.style.display = "block";
        registrationStep2.style.display = "none";
        submitButton.classList.remove("disable");
    } else {
        verifyOtpButton.classList.add("error-shake");

        setTimeout(() => {
            verifyOtpButton.classList.remove("error-shake");
        }, 1000);
    }
});

document.getElementById("registrationForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const username = document.getElementById("username").value.trim();
    const emailValue = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim(); // Ensure you have a password field in your HTML

    // Validate all fields before submitting the form
    if (!validateFullName(fullName)) {
        document.getElementById("fullNameError").textContent = "Full Name should contain only letters and spaces with a minimum of 6 characters.";
        return;
    }

    if (!validateMobileNumber(mobileNumber)) {
        document.getElementById("mobileNumberError").textContent = "Mobile Number should be a 10-digit number starting with 7, 8, or 9.";
        return;
    }

    if (!validateUsername(username)) {
        document.getElementById("usernameError").textContent = "Username should be at least 10 characters long and can include letters, numbers, and optional symbols.";
        return;
    }

    if (!validateEmail(emailValue)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        return;
    }

    if (!validatePassword(password)) {
        document.getElementById("passwordError").textContent = "Password should be at least 10 characters long, including letters, capital letters, numbers, and symbols.";
        return;
    }

    alert("Registration successful!");
});
