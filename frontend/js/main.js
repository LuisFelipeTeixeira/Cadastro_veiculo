const apiBaseUrl = 'http://localhost:3001';


async function fetchVehicles() {
    try {
        const response = await fetch(`${apiBaseUrl}/listar-veiculos`);
        if (!response.ok) throw new Error('Erro ao buscar veículos');
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
                    
                    <button onclick="openUpdateModal(${vehicle.id})">Atualizar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar veículos:', error);
    }
}

// <button onclick="getVehicle(${vehicle.id})">Consultar</button>



async function addVehicle(event) {
    event.preventDefault();
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;

    try {
        const response = await fetch(`${apiBaseUrl}/adicionar-veiculo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ modelo, marca, ano, cor })
        });

        if (!response.ok) throw new Error('Erro ao adicionar veículo');

        document.getElementById('vehicle-form').reset();
        fetchVehicles();

        sessionStorage.setItem('showSuccessMessage', 'true');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao adicionar veículo:', error);
    }
}

async function openUpdateModal(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/consultar-veiculo/${id}`);
        if (!response.ok) throw new Error('Erro ao consultar veículo');
        const vehicle = await response.json();

        document.getElementById('update-id').value = vehicle.id;
        document.getElementById('update-modelo').value = vehicle.modelo;
        document.getElementById('update-marca').value = vehicle.marca;
        document.getElementById('update-ano').value = vehicle.ano;
        document.getElementById('update-cor').value = vehicle.cor;

        document.getElementById('update-modal').style.display = 'block';
    } catch (error) {
        console.error('Erro ao abrir modal de atualização:', error);
    }
}

function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}


async function putVehicle(id) {
    const modelo = document.getElementById('update-modelo').value;
    const marca = document.getElementById('update-marca').value;
    const ano = document.getElementById('update-ano').value;
    const cor = document.getElementById('update-cor').value;

    try {
        const response = await fetch(`${apiBaseUrl}/atualizar-veiculo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ modelo, marca, ano, cor })
        });

        if (!response.ok) throw new Error('Erro ao atualizar veículo');

        fetchVehicles();
        closeUpdateModal();
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
    }
}

async function getVehicle(id) {
    try {
        await fetch(`${apiBaseUrl}/consultar-veiculo/${id}`, { method: 'GET' });
        fetchVehicles();
    } catch (error) {
        console.error('Erro ao consultar veículo:', error);
    }
}

async function deleteVehicle(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/deletar-veiculo/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao deletar veículo');
        fetchVehicles();
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
    }
}


function displaySuccessMessage() {
    const showMessage = sessionStorage.getItem('showSuccessMessage');
    
    if (showMessage === 'true') {
        const notificationContainer = document.getElementById('notification-container');
        const notificationMessage = document.getElementById('notification-message');
        notificationMessage.textContent = 'Veículo adicionado com sucesso!';
        notificationContainer.style.display = 'block';

        sessionStorage.removeItem('showSuccessMessage');
    }
}

function closeNotification() {
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', displaySuccessMessage);
document.getElementById('vehicle-form').addEventListener('submit', addVehicle);
fetchVehicles();
