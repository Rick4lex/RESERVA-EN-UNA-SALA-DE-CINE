function openModal(formType) {
    const modal = document.getElementById('modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    // const stepsIndicator = document.getElementById('steps-indicator');

    modal.style.display = 'flex';

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        if (stepsIndicator) stepsIndicator.style.display = 'none';
    } else if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        if (stepsIndicator) stepsIndicator.style.display = 'flex';
        goToStep(1);
    }
}

// Cambiar entre pasos del formulario de registro
function goToStep(step) {
    // Seleccionar todos los elementos que representan pasos
    const steps = document.querySelectorAll('.step'); 
    const indicators = document.querySelectorAll('.step-indicator');

    // Ocultar todos los pasos y desactivar indicadores
    steps.forEach((stepElement, index) => {
        if (index + 1 === step) {
            // Mostrar el paso actual
            stepElement.style.display = 'block';
        } else {
            // Ocultar los demás pasos
            stepElement.style.display = 'none';
        }
    });

    // Actualizar el estado de los indicadores
    indicators.forEach((indicator, index) => {
        if (index + 1 === step) {
            indicator.classList.add('active'); // Activar el indicador correspondiente
        } else {
            indicator.classList.remove('active'); // Desactivar los demás
        }
    });
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Reiniciar al paso 1 si está en el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm.style.display === 'block') {
        goToStep(1);
    }
}

// Validar el formulario de inicio de sesión
async function validateLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Validar formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Por favor, ingresa un correo válido.";
        errorMessage.style.display = "block";
        return;
    }

    // Validar longitud mínima de la contraseña (6 caracteres)
    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        errorMessage.style.display = "block";
        return;
    }

     // Llamar a Supabase para iniciar sesión
     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

     if (error) {
         errorMessage.textContent = 'Error al iniciar sesión: ' + error.message;
         errorMessage.style.display = 'block';
     } else {
         localStorage.setItem('user', JSON.stringify(data.user));
         alert('Inicio de sesión exitoso.');
         window.location.href = 'Landing_page.html';
     }
     
 }

// Validar el formulario de registro
async function validateRegisterForm(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const errorMessage = document.getElementById('register-error-message');

    // Validar correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Por favor, ingresa un correo válido.";
        errorMessage.style.display = "block";
        return;
    }

    // Validar contraseña
    if (password.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        errorMessage.style.display = "block";
        return;
    }


    // Crear usuario en Supabase
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        errorMessage.textContent = 'Error al registrarse: ' + error.message;
        errorMessage.style.display = 'block';
    } else {
        const { data, error: dbError } = await supabase.from('Usuarios').insert([
            { correo: email, nombre: firstName, apellido: lastName, telefono: phone },
        ]);

        if (dbError) {
            errorMessage.textContent = 'Error en la base de datos: ' + dbError.message;
            errorMessage.style.display = 'block';
        } else {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'Landing_page.html';
        }
    }
}

// Verificar si el usuario está logueado al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const header = document.getElementById('header');

    if (session && session.user) {
        // Usuario está logueado: cambiar contenido del header
        header.innerHTML = `
            <span>Bienvenido, ${session.user.email}</span>
            <button onclick="logout()">Cerrar sesión</button>
        `;
    } else {
        // Usuario no logueado: mostrar opciones de login/registro
        header.innerHTML = `
            <button onclick="openModal('login')">Iniciar sesión</button>
            <button onclick="openModal('register')">Registrarse</button>
        `;
    }
});

// Función para cerrar sesión
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error cerrando sesión:', error.message);
    } else {
        localStorage.removeItem('user');
        window.location.reload(); // Recargar la página para actualizar el header
    }
}

function setItemWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl, // ttl en milisegundos
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Verificar si el tiempo ha expirado
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key); // Eliminar si ha expirado
        return null;
    }
    return item.value;
}

// Guardar y recuperar con expiración de 1 hora
setItemWithExpiry('supabaseToken', data.session.access_token, 60 * 60 * 1000);
const token = getItemWithExpiry('token');

setItemWithExpiry('userData', data.user, 60 * 60 * 1000)

// Función para verificar el estado de autenticación
function checkAuthStatus() {
    const token = getItemWithExpiry('supabaseToken');

    if (token) {
        console.log('Usuario autenticado');
        // Puedes redirigir o mostrar contenido específico aquí
    } else {
        console.log('Token expirado o no existe. Redirigiendo a login...');
        window.location.href = 'Landing_page.html'; // Redirigir si no está autenticado
    }
}

// Llamar a la verificación de autenticación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});


// Añadir event listeners a los formularios
document.getElementById('login-form').addEventListener('submit', validateLoginForm);
document.getElementById('register-form').addEventListener('submit', validateRegisterForm);

// Cerrar el modal al hacer clic fuera
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});