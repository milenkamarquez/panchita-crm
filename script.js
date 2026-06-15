// Chatbot responses
const chatbotResponses = {
    'hola': '¡Hola! Bienvenido a Panchita. ¿Te gustaría conocer nuestro menú, hacer una reserva o saber sobre nuestras ubicaciones?',
    'menú': 'Nuestro menú incluye: Ceviche, Lomo Saltado, Causa Limeña, Tiradito, Ají de Gallina y muchos más platos de la cocina peruana. ¿Hay alguno que te llame la atención?',
    'reserva': 'Para hacer una reserva, ve a la sección de "Reservas" y completa el formulario con tus datos. ¡También puedes llamarnos al +57 1 2345678!',
    'ubicaciones': 'Contamos con 4 ubicaciones: Bogotá, Chacarilla (Lima), Miraflores (Lima) y Vitacura (Chile). ¿Cuál te interesa?',
    'horario': 'Nuestro horario es de martes a domingo de 12:00 PM a 11:00 PM. Los lunes estamos cerrados (excepto Miraflores). ¿Necesitas otro dato?',
    'precio': 'Nuestros platos van desde $42,000 COP hasta $86,000 COP. Todas las preparaciones con ingredientes frescos y de calidad.',
    'alergia': '¡Importante! Por favor cuéntanos tus alergias en la reserva o llámanos directamente. Podemos adaptar nuestros platos.',
    'contacto': 'Puedes contactarnos en: 📧 info@panchita.com | 📱 +57 1 2345678 | 📱 WhatsApp: +573001234567',
    'promoción': '¡Tenemos ofertas especiales! Happy Hour (martes-viernes 4-6 PM con -20%), Menú Degustación ($95,000 COP) y descuentos para grupos.',
    'evento': '¿Tienes un evento especial? Ofrecemos menús personalizados para bodas, cumpleaños y eventos corporativos. ¡Contáctanos!',
    'default': 'Entiendo tu pregunta. ¿Puedo ayudarte con información sobre reservas, menú, ubicaciones, horarios, promociones o eventos?'
};

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    });
});

// Chatbot Functions
function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    window.style.display = window.style.display === 'none' ? 'flex' : 'none';
}

function closeChatbot() {
    document.getElementById('chatbotWindow').style.display = 'none';
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim().toLowerCase();
    
    if (message === '') return;

    const messagesDiv = document.getElementById('chatbotMessages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = input.value;
    messagesDiv.appendChild(userMsg);

    // Get bot response
    let response = chatbotResponses['default'];
    for (const key in chatbotResponses) {
        if (message.includes(key)) {
            response = chatbotResponses[key];
            break;
        }
    }

    // Add bot response with delay
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.textContent = response;
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);

    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Enter key to send chat message
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
        sendChatMessage();
    }
});

// Form Validation Functions
function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9+\s\-()]{9,}$/;
    return phoneRegex.test(phone);
}

function validateDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

function validateTime(time) {
    if (!time) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const hour = parseInt(hours);
    // Restaurante abre de 12:00 PM a 11:00 PM
    return hour >= 12 && hour < 23;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// Form Submission with Validation
function submitReservation(event) {
    event.preventDefault();

    clearErrors();
    let isValid = true;

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    // Validate name
    if (!validateName(name)) {
        document.getElementById('nameError').textContent = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Por favor ingresa un email válido';
        isValid = false;
    }

    // Validate phone
    if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = 'Por favor ingresa un teléfono válido';
        isValid = false;
    }

    // Validate location
    if (!location) {
        document.getElementById('locationError').textContent = 'Debes seleccionar una ubicación';
        isValid = false;
    }

    // Validate date
    if (!date || !validateDate(date)) {
        document.getElementById('dateError').textContent = 'Por favor selecciona una fecha futura válida';
        isValid = false;
    }

    // Validate time
    if (!time || !validateTime(time)) {
        document.getElementById('timeError').textContent = 'El horario debe estar entre 12:00 PM y 11:00 PM';
        isValid = false;
    }

    // Validate guests
    if (!guests) {
        document.getElementById('guestsError').textContent = 'Por favor selecciona el número de comensales';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // If all validations pass
    const locationNames = {
        'bogota': 'Bogotá',
        'chacarilla': 'Chacarilla - Lima',
        'miraflores': 'Miraflores - Lima',
        'chile': 'Vitacura - Chile'
    };

    const formattedDate = new Date(date).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('modalMessage').textContent = 
        `¡Hola ${name}! Tu reserva en Panchita ${locationNames[location]} ha sido confirmada para el ${formattedDate} a las ${time}. Se ha enviado un correo de confirmación a ${email}. ¡Te esperamos!`;

    document.getElementById('successModal').style.display = 'flex';
    document.getElementById('reservationForm').reset();

    // Simulate sending email (in real app, send to backend)
    console.log('Reserva guardada:', {
        name,
        email,
        phone,
        location,
        date,
        time,
        guests,
        timestamp: new Date()
    });

    // Scroll to modal
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Real-time form validation
    document.getElementById('name').addEventListener('blur', function() {
        if (!validateName(this.value)) {
            document.getElementById('nameError').textContent = 'El nombre debe tener al menos 3 caracteres';
        } else {
            document.getElementById('nameError').textContent = '';
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            document.getElementById('emailError').textContent = 'Por favor ingresa un email válido';
        } else {
            document.getElementById('emailError').textContent = '';
        }
    });

    document.getElementById('phone').addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            document.getElementById('phoneError').textContent = 'Por favor ingresa un teléfono válido';
        } else {
            document.getElementById('phoneError').textContent = '';
        }
    });

    document.getElementById('date').addEventListener('change', function() {
        if (!validateDate(this.value)) {
            document.getElementById('dateError').textContent = 'Por favor selecciona una fecha futura válida';
        } else {
            document.getElementById('dateError').textContent = '';
        }
    });

    document.getElementById('time').addEventListener('change', function() {
        if (!validateTime(this.value)) {
            document.getElementById('timeError').textContent = 'El horario debe estar entre 12:00 PM y 11:00 PM';
        } else {
            document.getElementById('timeError').textContent = '';
        }
    });
});

// Prevent form submission on Enter in form fields (except submit button)
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') {
        if (e.target.closest('form')) {
            e.preventDefault();
        }
    }
});
