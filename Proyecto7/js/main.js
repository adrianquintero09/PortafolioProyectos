const container = document.getElementById('container-perfiles');

// Lista para almacenar los IDs de usuarios favoritos
let favorites = JSON.parse(localStorage.getItem('favoritos_usuarios')) || [];

async function obtenerUsuarios() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=100');
        const data = await response.json();
        renderizarUsuarios(data.results);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

function renderizarUsuarios(usuarios) {
    container.innerHTML = '';

    usuarios.forEach((usuario) => {
        const userId = usuario.login.uuid;
        const nombreCompleto = `${usuario.name.first} ${usuario.name.last}`;
        const email = usuario.email;
        const ubicacion = `${usuario.location.city}, ${usuario.location.country}`;
        const avatar = usuario.picture.large;
        const esFavorito = favorites.includes(userId);

        const cardElement = document.createElement('div');
        cardElement.classList.add('card-perfil');

    cardElement.innerHTML = `
    <button class="btn-favorito ${esFavorito ? 'active' : ''}" onclick="toggleFavorito('${userId}', this)" title="Marcar favorito">
        ★
    </button>
    <div class="profile">
        <img id="avatar" src="${avatar}" alt="${nombreCompleto}">
        <h2 id="nombre">${nombreCompleto}</h2>
        <p id="email">${email}</p>
        
        <!-- Ubicación alineada horizontalmente -->
        <div class="location-wrapper">
            <p id="ubicacion">${ubicacion}</p>
        </div>

        <!-- Botones inferiores alineados lado a lado -->
        <div class="actions-wrapper">
            <button class="view-profile">
                <a href="./perfil.html">View Profile</a>
            </button>
            <button class="message" title="Enviar correo">
                <img src="./img/mail_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Mensaje">
            </button>
        </div>
    </div>
`;
        container.appendChild(cardElement);
    });
}

function toggleFavorito(id, btnElement) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        btnElement.classList.remove('active');
    } else {
        favorites.push(id);
        btnElement.classList.add('active');
    }
    localStorage.setItem('favoritos_usuarios', JSON.stringify(favorites));
}

obtenerUsuarios();