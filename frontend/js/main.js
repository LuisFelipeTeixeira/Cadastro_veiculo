const apiBaseUrl = 'http://localhost:3001';

async function fetchVehicles() {
    const response = await fetch(`${apiBaseUrl}/listar-veiculos`);
    const vehicles = await response.json();
    const tableBody = document.querySelector('#vehicles-table tbody');
    tableBody.innerHTML = '';
    vehicles.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicle.id}</td>
            <td>${vehicle.modelo}</td>
            <td>${vehicle.marca}</td>
            <td>${vehicle.ano}</td>
            <td>${vehicle.cor}</td>
            <td>
                <button onclick="deleteVehicle(${vehicle.id})">Deletar</button>
                <button onclick="getVehicle(${vehicle.id})">Consultar</button>
                <button onclick="putVehicle(${vehicle.id})">Atualizar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function addVehicle(event) {
    event.preventDefault();
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;

    await fetch(`${apiBaseUrl}/adicionar-veiculo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelo, marca, ano, cor })
    });

    document.getElementById('vehicle-form').reset();
    fetchVehicles();
}

async function putVehicle(id) {
    await fetch(`${apiBaseUrl}/atualizar-veiculo/${id}`, { method: 'put' });
    fetchVehicles();
}

async function getVehicle(id) {
    await fetch(`${apiBaseUrl}/consultar-veiculo/${id}`, { method: 'get' });
    fetchVehicles();
}

async function deleteVehicle(id) {
    await fetch(`${apiBaseUrl}/deletar-veiculo/${id}`, { method: 'delete' });
    fetchVehicles();
}

document.getElementById('vehicle-form').addEventListener('submit', addVehicle);

fetchVehicles();