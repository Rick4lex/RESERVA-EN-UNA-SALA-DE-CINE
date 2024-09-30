function showRooms() {
    const roomsContainer = document.getElementById("rooms-container");
    const selectedDate = document.getElementById("date-dropdown").value;

    // Limpiar el contenido de las salas anteriores
    roomsContainer.innerHTML = "";

    if (selectedDate === "2023-10-01") {
        roomsContainer.innerHTML = `
            <h3>Salas disponibles para el 1 de Octubre, 2023</h3>
            <ul>
                <li>Sala 1 - 18:00</li>
                <li>Sala 2 - 20:00</li>
                <li>Sala 3 - 22:00</li>
            </ul>
        `;
    } else if (selectedDate === "2023-10-02") {
        roomsContainer.innerHTML = `
            <h3>Salas disponibles para el 2 de Octubre, 2023</h3>
            <ul>
                <li>Sala 1 - 17:00</li>
                <li>Sala 2 - 19:00</li>
                <li>Sala 3 - 21:00</li>
            </ul>
        `;
    } else if (selectedDate === "2023-10-03") {
        roomsContainer.innerHTML = `
            <h3>Salas disponibles para el 3 de Octubre, 2023</h3>
            <ul>
                <li>Sala 1 - 16:00</li>
                <li>Sala 2 - 18:00</li>
                <li>Sala 3 - 20:00</li>
            </ul>
        `;
    } else {
        roomsContainer.innerHTML = "<p>Selecciona una fecha para ver las salas disponibles.</p>";
    }
}