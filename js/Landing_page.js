function openModal(formType) {
    const modal = document.getElementById('modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    modal.style.display = 'flex';

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Validación del formulario de inicio de sesión
function validateLoginForm() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Validar formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Por favor, ingresa un correo válido.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar longitud mínima de la contraseña (6 caracteres)
    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        errorMessage.style.display = "block";
        return false;
    }

    return true; // Si la validación es exitosa
}

// Validación del formulario de registro
function validateRegisterForm() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const documentType = document.getElementById('document-type').value;
    const documentNumber = document.getElementById('document-number').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const birthdate = document.getElementById('birthdate').value;
    const errorMessage = document.getElementById('register-error-message');

    // Validar correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Por favor, ingresa un correo válido.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar contraseña
    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        errorMessage.style.display = "block";
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar documento
    if (!documentType || documentNumber.length < 5) {
        errorMessage.textContent = "Por favor, ingresa un tipo y número de documento válidos.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar nombre y apellido
    if (!firstName || !lastName) {
        errorMessage.textContent = "Por favor, ingresa tu nombre y apellido.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar teléfono
    if (phone.length < 7) {
        errorMessage.textContent = "Por favor, ingresa un número de teléfono válido.";
        errorMessage.style.display = "block";
        return false;
    }

    // Validar fecha de nacimiento
    if (!birthdate) {
        errorMessage.textContent = "Por favor, selecciona una fecha de nacimiento válida.";
        errorMessage.style.display = "block";
        return false;
    }

    return true; // Si todo está correcto
}

// Cerrar el modal si se hace clic fuera de la ventana modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}