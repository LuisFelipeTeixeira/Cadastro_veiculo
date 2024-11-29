const apiBaseUrl = 'http://localhost:3001';

// Função para buscar veículos e exibi-los na tabela
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
                    <button onclick="viewVehicleDetails(${vehicle.id})">Visualizar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar veículos:', error);
    }
}

// Função para visualizar detalhes do veículo
async function viewVehicleDetails(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/consultar-veiculo/${id}`);
        if (!response.ok) throw new Error('Erro ao consultar veículo');
        const vehicle = await response.json();

        const detailsDiv = document.getElementById('vehicle-details');
        const imageElement = document.getElementById('vehicle-image');

        detailsDiv.innerHTML = `
            <p><strong>ID:</strong> ${vehicle.id}</p>
            <p><strong>Modelo:</strong> ${vehicle.modelo}</p>
            <p><strong>Marca:</strong> ${vehicle.marca}</p>
            <p><strong>Ano:</strong> ${vehicle.ano}</p>
            <p><strong>Cor:</strong> ${vehicle.cor}</p>
        `;

        if (vehicle.imageUrl) {
            imageElement.src = vehicle.imageUrl;
            imageElement.style.display = 'block'; // Exibe a imagem se ela existir
        } else {
            imageElement.style.display = 'none'; // Esconde a imagem se não existir
        }

        // Exibe o cartão com os detalhes
        document.getElementById('vehicle-details-card').style.display = 'block';
    } catch (error) {
        console.error('Erro ao visualizar detalhes:', error);
    }
}

// Função para abrir o modal de adicionar imagem
async function openAddImageModal(id) {
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';

    imageInput.onchange = async () => {
        const file = imageInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${apiBaseUrl}/adicionar-imagem/${id}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Erro ao adicionar imagem');
            alert('Imagem adicionada com sucesso!');
            fetchVehicles(); // Recarrega os veículos para exibir a imagem adicionada
        } catch (error) {
            console.error('Erro ao adicionar imagem:', error);
        }
    };

    imageInput.click();
}

// Função para adicionar um veículo
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

// Função para abrir o modal de atualização do veículo
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

// Função para fechar o modal de atualização
function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}

// Função para atualizar um veículo
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

// Função para deletar um veículo
async function deleteVehicle(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/deletar-veiculo/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao deletar veículo');
        fetchVehicles();
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
    }
}

// Função para exibir a mensagem de sucesso
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

// Função para fechar a notificação
function closeNotification() {
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.style.display = 'none';
}

// Evento de exibição da mensagem de sucesso após a carga da página
document.addEventListener('DOMContentLoaded', displaySuccessMessage);

// Adiciona o evento de submit no formulário de veículos
document.getElementById('vehicle-form').addEventListener('submit', addVehicle);

// Chama a função para carregar os veículos ao carregar a página
fetchVehicles();
