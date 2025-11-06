// Ejemplo: Funcionalidad para el formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
    this.reset();
});

// Simulación de datos de sensores (puedes reemplazar con APIs reales)
function updateSensorData() {
    const humidity = Math.floor(Math.random() * 30) + 50;  // Simula humedad 50-80%
    document.querySelector('.data-value').textContent = `${humidity}%`;
    document.querySelector('.progress').style.width = `${humidity}%`;
}

setInterval(updateSensorData, 3000);  // Actualiza cada 3 segundos

// Datos de ejemplo (pueden venir de una base de datos o API)
let ventas = [
    { id: 1, producto: "puerta madera", cantidad: 15, precio: 1500, fecha: "2023-10-05" },
    { id: 2, producto: "contraplacada", cantidad: 15, precio: 700, fecha: "2023-10-06" }
];

// Función para renderizar la tabla
function renderizarTabla() {
    const tbody = document.querySelector('#tabla-ventas tbody');
    tbody.innerHTML = '';

    ventas.forEach(venta => {
        const total = venta.cantidad * venta.precio;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.producto}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.precio.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td>${venta.fecha}</td>
            <td>
                <button class="editar" data-id="${venta.id}">✏️</button>
                <button class="eliminar" data-id="${venta.id}">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Añadir eventos a los botones
    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            ventas = ventas.filter(venta => venta.id !== id);
            renderizarTabla();
        });
    });
}

// Botón para añadir venta (simulación)
document.getElementById('agregar-venta').addEventListener('click', () => {
    const nuevoId = ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1;
    const nuevaVenta = {
        id: nuevoId,
        producto: prompt("Nombre del producto:"),
        cantidad: parseInt(prompt("Cantidad:")),
        precio: parseFloat(prompt("Precio unitario:")),
        fecha: new Date().toISOString().split('T')[0]  // Fecha actual
    };
    
    ventas.push(nuevaVenta);
    renderizarTabla();
});

// Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', renderizarTabla);