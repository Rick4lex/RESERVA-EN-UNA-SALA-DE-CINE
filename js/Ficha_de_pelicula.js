function showRooms() {
    const datePicker = document.getElementById('date-picker').value;
    const roomsContainer = document.getElementById('rooms-container');

    if (datePicker) {
        roomsContainer.style.display = 'block';
    } else {
        roomsContainer.style.display = 'none';
    }
}

// Mostrar modal de asientos cuando se selecciona una sala
function showSeats() {
    const seatsOverlay = document.getElementById('seats-overlay');
    const seatsContainer = document.getElementById('seats-container');

    // Limpiar asientos previos
    seatsContainer.innerHTML = '';

    // Crear 25 asientos dinámicamente
    for (let i = 0; i < 25; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        
        // Simular asientos ocupados aleatoriamente
        if (Math.random() > 0.7) {
            seat.classList.add('occupied');
        }

        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
            }
        });

        seatsContainer.appendChild(seat);
    }

    seatsOverlay.style.display = 'flex';
}

// Cerrar el modal de selección de asientos
function closeSeats() {
    const seatsOverlay = document.getElementById('seats-overlay');
    seatsOverlay.style.display = 'none';
}